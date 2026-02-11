const CACHE_NAME = 'tally-v1';
const DB_NAME = 'TallyDB';
const DB_VERSION = 1;
const STORE_NAME = 'appState';

let db;

self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(['/', '/index.html', '/manifest.json'])),
      initDB()
    ])
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

function saveState(state) {
  if (!db) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ id: 'appState', data: state, timestamp: Date.now() });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function getState() {
  if (!db) return Promise.resolve(null);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get('appState');
    request.onsuccess = () => resolve(request.result ? request.result.data : null);
    request.onerror = () => reject(request.error);
  });
}

function saveLastNotified(counterId) {
  if (!db) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ id: `lastNotified_${counterId}`, timestamp: Date.now() });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function getLastNotified(counterId) {
  if (!db) return Promise.resolve(0);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(`lastNotified_${counterId}`);
    request.onsuccess = () => resolve(request.result ? request.result.timestamp : 0);
    request.onerror = () => reject(request.error);
  });
}

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'UPDATE_STATE') {
    saveState(event.data.state);
  }
  if (event.data && event.data.type === 'SYNC_STATE') {
    getState().then(state => {
      if (state && event.ports && event.ports[0]) {
        event.ports[0].postMessage({ state });
      }
    });
  }
});

async function checkReminders() {
  const stateData = await getState();
  if (!stateData) return;
  
  let state;
  try {
    state = JSON.parse(stateData);
  } catch (e) {
    return;
  }
  
  if (!state || !state.counters) return;
  
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const currentDay = now.toDateString();
  
  for (const counter of state.counters) {
    if (!counter.reminder) continue;
    
    const lastNotified = await getLastNotified(counter.id);
    const lastNotifiedDay = new Date(lastNotified).toDateString();
    
    if (counter.reminder.type === 'daily') {
      const [hours, minutes] = counter.reminder.time.split(':').map(Number);
      const reminderTime = hours * 60 + minutes;
      
      if (Math.abs(currentTime - reminderTime) < 1 && currentDay !== lastNotifiedDay) {
        self.registration.showNotification('Tally Reminder', {
          body: `Time to update ${counter.name}`,
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          tag: `reminder-${counter.id}`,
          requireInteraction: false,
          vibrate: [200, 100, 200]
        });
        await saveLastNotified(counter.id);
      }
    } else if (counter.reminder.type === 'interval') {
      const lastUpdate = counter.lastUpdated || counter.createdAt;
      const elapsedMinutes = (Date.now() - lastUpdate) / 1000 / 60;
      
      let intervalMinutes = counter.reminder.interval;
      if (counter.reminder.unit === 'hours') {
        intervalMinutes *= 60;
      }
      
      const timeSinceLastNotification = (Date.now() - lastNotified) / 1000 / 60;
      
      if (elapsedMinutes >= intervalMinutes && timeSinceLastNotification >= intervalMinutes) {
        self.registration.showNotification('Tally Reminder', {
          body: `Time to update ${counter.name}`,
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          tag: `reminder-${counter.id}`,
          requireInteraction: false,
          vibrate: [200, 100, 200]
        });
        await saveLastNotified(counter.id);
      }
    }
  }
}

setInterval(() => {
  checkReminders();
}, 60000);

checkReminders();

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});