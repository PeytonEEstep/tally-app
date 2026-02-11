import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, History, Download, X, ChevronLeft, ChevronRight, Folder, Edit2, Check, Bell, Target, Trash2, Lock, Unlock, FolderInput, ArrowUpDown, Search, Settings, Sun, Moon, Palette, Mail, Save } from 'lucide-react';

const COLORS = [
  { name: 'Slate', gradient: 'from-slate-500 to-slate-600', solid: 'bg-slate-500', text: 'text-slate-400', light: 'bg-slate-500/10', border: 'border-slate-500/30' },
  { name: 'Sky', gradient: 'from-sky-500 to-blue-600', solid: 'bg-sky-500', text: 'text-sky-400', light: 'bg-sky-500/10', border: 'border-sky-500/30' },
  { name: 'Emerald', gradient: 'from-emerald-500 to-green-600', solid: 'bg-emerald-500', text: 'text-emerald-400', light: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { name: 'Violet', gradient: 'from-violet-500 to-purple-600', solid: 'bg-violet-500', text: 'text-violet-400', light: 'bg-violet-500/10', border: 'border-violet-500/30' },
  { name: 'Rose', gradient: 'from-rose-500 to-pink-600', solid: 'bg-rose-500', text: 'text-rose-400', light: 'bg-rose-500/10', border: 'border-rose-500/30' },
  { name: 'Amber', gradient: 'from-amber-500 to-orange-600', solid: 'bg-amber-500', text: 'text-amber-400', light: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { name: 'Cyan', gradient: 'from-cyan-500 to-teal-600', solid: 'bg-cyan-500', text: 'text-cyan-400', light: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  { name: 'Fuchsia', gradient: 'from-fuchsia-500 to-pink-600', solid: 'bg-fuchsia-500', text: 'text-fuchsia-400', light: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/30' },
];

const THEMES = {
  dark: {
    name: 'Dark',
    bg: 'from-slate-950 via-slate-900 to-slate-950',
    card: 'bg-slate-900/80',
    cardSolid: 'bg-slate-900',
    border: 'border-slate-800',
    text: 'text-white',
    textSecondary: 'text-slate-400',
    textTertiary: 'text-slate-500',
    hover: 'hover:bg-slate-800',
    input: 'bg-slate-800',
    empty: 'bg-slate-800/50'
  },
  light: {
    name: 'Light',
    bg: 'from-slate-50 via-white to-slate-50',
    card: 'bg-white/90',
    cardSolid: 'bg-white',
    border: 'border-slate-200',
    text: 'text-slate-900',
    textSecondary: 'text-slate-600',
    textTertiary: 'text-slate-400',
    hover: 'hover:bg-slate-50',
    input: 'bg-slate-50',
    empty: 'bg-slate-100'
  },
  ocean: {
    name: 'Ocean',
    bg: 'from-blue-950 via-cyan-950 to-blue-950',
    card: 'bg-cyan-900/80',
    cardSolid: 'bg-cyan-900',
    border: 'border-cyan-800',
    text: 'text-white',
    textSecondary: 'text-cyan-300',
    textTertiary: 'text-cyan-500',
    hover: 'hover:bg-cyan-800',
    input: 'bg-cyan-800',
    empty: 'bg-cyan-800/50'
  },
  sunset: {
    name: 'Sunset',
    bg: 'from-orange-950 via-pink-950 to-purple-950',
    card: 'bg-pink-900/80',
    cardSolid: 'bg-pink-900',
    border: 'border-pink-800',
    text: 'text-white',
    textSecondary: 'text-pink-300',
    textTertiary: 'text-pink-500',
    hover: 'hover:bg-pink-800',
    input: 'bg-pink-800',
    empty: 'bg-pink-800/50'
  },
  forest: {
    name: 'Forest',
    bg: 'from-emerald-950 via-green-950 to-emerald-950',
    card: 'bg-emerald-900/80',
    cardSolid: 'bg-emerald-900',
    border: 'border-emerald-800',
    text: 'text-white',
    textSecondary: 'text-emerald-300',
    textTertiary: 'text-emerald-500',
    hover: 'hover:bg-emerald-800',
    input: 'bg-emerald-800',
    empty: 'bg-emerald-800/50'
  }
};

export default function TallyCounter() {
  const [folders, setFolders] = useState([]);
  const [counters, setCounters] = useState([]);
  const [activeCounter, setActiveCounter] = useState(null);
  const [currentView, setCurrentView] = useState('counters');
  const [currentFolder, setCurrentFolder] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showCreateCounter, setShowCreateCounter] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showMoveCounter, setShowMoveCounter] = useState(null);
  const [showExportSelection, setShowExportSelection] = useState(false);
  const [showEmailExport, setShowEmailExport] = useState(false);
  const [exportEmail, setExportEmail] = useState('');
  const [selectedForExport, setSelectedForExport] = useState([]);
  const [counterSort, setCounterSort] = useState('mostRecent');
  const [folderSort, setFolderSort] = useState('dateCreated');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [leftHandedMode, setLeftHandedMode] = useState(false);
  
  const [counterForm, setCounterForm] = useState({
    name: '',
    color: 1,
    folderId: null,
    reminderEnabled: false,
    reminderType: 'daily',
    reminderTime: '09:00',
    reminderInterval: 30,
    reminderIntervalUnit: 'minutes',
    goalEnabled: false,
    goalTarget: '',
    goalDeadline: '21:00',
    locked: false
  });

  const [folderForm, setFolderForm] = useState({
    name: '',
    color: 1
  });

  const currentTheme = THEMES[theme];

  const resetCounterForm = () => {
    setCounterForm({
      name: '',
      color: 1,
      folderId: currentFolder,
      reminderEnabled: false,
      reminderType: 'daily',
      reminderTime: '09:00',
      reminderInterval: 30,
      reminderIntervalUnit: 'minutes',
      goalEnabled: false,
      goalTarget: '',
      goalDeadline: '21:00',
      locked: false
    });
  };

  const resetFolderForm = () => {
    setFolderForm({
      name: '',
      color: 1
    });
  };

  const addClick = (increment, counterId = null) => {
    const targetId = counterId || activeCounter;
    const counter = counters.find(c => c.id === targetId);
    if (counter?.locked && counterId) return;
    
    setCounters(prev => prev.map(counter => {
      if (counter.id === targetId) {
        const newCount = counter.count + increment;
        if (newCount < 0) return counter;
        
        return {
          ...counter,
          count: newCount,
          lastUpdated: Date.now(),
          clicks: [...counter.clicks, {
            timestamp: new Date().toISOString(),
            value: increment
          }]
        };
      }
      return counter;
    }));
  };

  const resetCounter = () => {
    setCounters(prev => prev.map(counter => 
      counter.id === activeCounter ? { ...counter, count: 0, clicks: [] } : counter
    ));
  };

  const createCounter = () => {
    if (counterForm.name.trim()) {
      const newCounter = {
        id: Date.now(),
        name: counterForm.name,
        count: 0,
        clicks: [],
        color: counterForm.color,
        folderId: counterForm.folderId,
        locked: counterForm.locked,
        createdAt: Date.now(),
        lastUpdated: Date.now(),
        reminder: counterForm.reminderEnabled ? {
          type: counterForm.reminderType,
          time: counterForm.reminderTime,
          interval: counterForm.reminderInterval,
          unit: counterForm.reminderIntervalUnit
        } : null,
        goal: counterForm.goalEnabled ? {
          target: parseInt(counterForm.goalTarget) || 0,
          deadline: counterForm.goalDeadline
        } : null
      };
      setCounters([...counters, newCounter]);
      setShowCreateCounter(false);
      resetCounterForm();
    }
  };

  const createFolder = () => {
    if (folderForm.name.trim()) {
      setFolders([...folders, {
        id: Date.now(),
        name: folderForm.name,
        color: folderForm.color,
        createdAt: Date.now()
      }]);
      setShowCreateFolder(false);
      resetFolderForm();
    }
  };

  const deleteCounter = (id, e) => {
    e?.stopPropagation();
    setCounters(prev => prev.filter(c => c.id !== id));
    if (activeCounter === id) setActiveCounter(null);
  };

  const deleteFolder = (id) => {
    setCounters(prev => prev.map(c => 
      c.folderId === id ? { ...c, folderId: null } : c
    ));
    setFolders(prev => prev.filter(f => f.id !== id));
    if (currentFolder === id) setCurrentFolder(null);
  };

  const deleteAllData = () => {
    setCounters([]);
    setFolders([]);
    setActiveCounter(null);
    setCurrentFolder(null);
    setShowDeleteConfirm(false);
  };

  const toggleCounterLock = (id, e) => {
    e?.stopPropagation();
    setCounters(prev => prev.map(c => 
      c.id === id ? { ...c, locked: !c.locked } : c
    ));
  };

  const moveCounter = (counterId, folderId) => {
    setCounters(prev => prev.map(c => 
      c.id === counterId ? { ...c, folderId } : c
    ));
    setShowMoveCounter(null);
  };

  const getSortedCounters = () => {
    let sorted = [...counters];
    if (currentFolder !== null) {
      sorted = sorted.filter(c => c.folderId === currentFolder);
    }
    
    switch(counterSort) {
      case 'alphabetical':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'color':
        return sorted.sort((a, b) => a.color - b.color);
      case 'dateCreated':
        return sorted.sort((a, b) => b.createdAt - a.createdAt);
      case 'mostRecent':
      default:
        return sorted.sort((a, b) => (b.lastUpdated || b.createdAt) - (a.lastUpdated || a.createdAt));
    }
  };

  const getSortedFolders = () => {
    let sorted = [...folders];
    
    switch(folderSort) {
      case 'alphabetical':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'color':
        return sorted.sort((a, b) => a.color - b.color);
      case 'dateCreated':
      default:
        return sorted.sort((a, b) => b.createdAt - a.createdAt);
    }
  };

  const getAllLogs = () => {
    const logs = [];
    counters.forEach(counter => {
      counter.clicks.forEach(click => {
        logs.push({
          counterName: counter.name,
          counterColor: counter.color,
          timestamp: click.timestamp,
          value: click.value
        });
      });
    });
    return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const generateCSV = (selectedCounters) => {
    const csvData = [];
    
    selectedCounters.forEach(counter => {
      csvData.push([`Counter: ${counter.name}`]);
      csvData.push(['Timestamp', 'Action', 'Count After']);
      
      let runningCount = 0;
      counter.clicks.forEach(click => {
        runningCount += click.value;
        csvData.push([
          new Date(click.timestamp).toLocaleString(),
          click.value > 0 ? `+${click.value}` : click.value,
          runningCount
        ]);
      });
      csvData.push([]);
    });
    
    return csvData.map(row => row.join(',')).join('\n');
  };

  const exportToFile = () => {
    const selectedCounters = counters.filter(c => selectedForExport.includes(c.id));
    const csv = generateCSV(selectedCounters);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `counters_export_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportSelection(false);
    setSelectedForExport([]);
  };

  const exportToEmail = () => {
    const selectedCounters = counters.filter(c => selectedForExport.includes(c.id));
    const csv = generateCSV(selectedCounters);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const subject = encodeURIComponent('Tally Counter Export');
    const body = encodeURIComponent(`Here is your counter data export.\n\nCounters included:\n${selectedCounters.map(c => `- ${c.name} (${c.count})`).join('\n')}\n\nNote: Please attach the downloaded CSV file to this email.`);
    window.location.href = `mailto:${exportEmail}?subject=${subject}&body=${body}`;
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `counters_export_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    setShowEmailExport(false);
    setShowExportSelection(false);
    setSelectedForExport([]);
    setExportEmail('');
  };

  const getHistoryData = () => {
    const counter = counters.find(c => c.id === activeCounter);
    if (!counter) return [];
    
    const dailyData = {};
    counter.clicks.forEach(click => {
      const date = new Date(click.timestamp).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = { increments: 0, decrements: 0, total: 0 };
      }
      if (click.value > 0) {
        dailyData[date].increments += click.value;
      } else {
        dailyData[date].decrements += Math.abs(click.value);
      }
      dailyData[date].total += click.value;
    });

    return Object.entries(dailyData).map(([date, data]) => ({
      date,
      ...data
    })).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const activeCounterData = counters.find(c => c.id === activeCounter);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} flex items-center justify-center p-4`}>
      <div className="w-full max-w-md h-[700px] relative">
        
        {/* Create Counter Modal */}
        {showCreateCounter && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-3xl">
            <div className={`${currentTheme.cardSolid} rounded-2xl p-6 w-full max-h-full overflow-y-auto border ${currentTheme.border} shadow-2xl`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${currentTheme.text}`}>Create Counter</h2>
                <button
                  onClick={() => {
                    setShowCreateCounter(false);
                    resetCounterForm();
                  }}
                  className={`p-2 rounded-lg ${currentTheme.hover} transition-colors`}
                >
                  <X className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`text-sm font-medium ${currentTheme.textSecondary} mb-2 block`}>Name</label>
                  <input
                    type="text"
                    value={counterForm.name}
                    onChange={(e) => setCounterForm({...counterForm, name: e.target.value})}
                    placeholder="Water intake, Push-ups..."
                    className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.input} border ${currentTheme.border} ${currentTheme.text} placeholder-${currentTheme.textTertiary} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    autoFocus
                  />
                </div>

                <div>
                  <label className={`text-sm font-medium ${currentTheme.textSecondary} mb-2 block`}>Color</label>
                  <div className="grid grid-cols-8 gap-2">
                    {COLORS.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCounterForm({...counterForm, color: idx})}
                        className={`aspect-square rounded-lg bg-gradient-to-br ${c.gradient} transition-all hover:scale-110 ${counterForm.color === idx ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : ''}`}
                      />
                    ))}
                  </div>
                </div>

                {folders.length > 0 && (
                  <div>
                    <label className={`text-sm font-medium ${currentTheme.textSecondary} mb-2 block`}>Folder</label>
                    <select
                      value={counterForm.folderId || ''}
                      onChange={(e) => setCounterForm({...counterForm, folderId: e.target.value ? parseInt(e.target.value) : null})}
                      className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.input} border ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    >
                      <option value="">None</option>
                      {folders.map(folder => (
                        <option key={folder.id} value={folder.id}>{folder.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className={`flex items-center justify-between p-3 rounded-lg ${currentTheme.empty} border ${currentTheme.border}`}>
                  <div className="flex items-center gap-3">
                    <Lock className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                    <div>
                      <div className={`text-sm font-medium ${currentTheme.text}`}>Lock Counter</div>
                      <div className={`text-xs ${currentTheme.textTertiary}`}>Prevent taps on home</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCounterForm({...counterForm, locked: !counterForm.locked})}
                    className={`relative w-11 h-6 rounded-full transition-colors ${counterForm.locked ? 'bg-blue-500' : currentTheme.input}`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${counterForm.locked ? 'translate-x-5' : ''} shadow-sm`}></div>
                  </button>
                </div>

                <div className={`${currentTheme.empty} rounded-lg p-4 border ${currentTheme.border}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-blue-400" />
                      <label className={`text-sm font-medium ${currentTheme.text}`}>Reminders</label>
                    </div>
                    <button
                      onClick={() => setCounterForm({...counterForm, reminderEnabled: !counterForm.reminderEnabled})}
                      className={`relative w-11 h-6 rounded-full transition-colors ${counterForm.reminderEnabled ? 'bg-blue-500' : currentTheme.input}`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${counterForm.reminderEnabled ? 'translate-x-5' : ''} shadow-sm`}></div>
                    </button>
                  </div>
                  
                  {counterForm.reminderEnabled && (
                    <div className={`space-y-3 pt-3 border-t ${currentTheme.border}`}>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setCounterForm({...counterForm, reminderType: 'daily'})}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${counterForm.reminderType === 'daily' ? 'bg-blue-500 text-white' : `${currentTheme.empty} ${currentTheme.textSecondary} ${currentTheme.hover}`}`}
                        >
                          Daily
                        </button>
                        <button
                          onClick={() => setCounterForm({...counterForm, reminderType: 'interval'})}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${counterForm.reminderType === 'interval' ? 'bg-blue-500 text-white' : `${currentTheme.empty} ${currentTheme.textSecondary} ${currentTheme.hover}`}`}
                        >
                          Interval
                        </button>
                      </div>
                      
                      {counterForm.reminderType === 'daily' ? (
                        <div>
                          <label className={`text-xs ${currentTheme.textSecondary} mb-1.5 block`}>Time</label>
                          <input
                            type="time"
                            value={counterForm.reminderTime}
                            onChange={(e) => setCounterForm({...counterForm, reminderTime: e.target.value})}
                            className={`w-full px-3 py-2 rounded-lg ${currentTheme.input} border ${currentTheme.border} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          />
                        </div>
                      ) : (
                        <div>
                          <label className={`text-xs ${currentTheme.textSecondary} mb-1.5 block`}>Repeat every</label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={counterForm.reminderInterval}
                              onChange={(e) => setCounterForm({...counterForm, reminderInterval: parseInt(e.target.value) || 1})}
                              min="1"
                              className={`flex-1 px-3 py-2 rounded-lg ${currentTheme.input} border ${currentTheme.border} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            />
                            <select
                              value={counterForm.reminderIntervalUnit}
                              onChange={(e) => setCounterForm({...counterForm, reminderIntervalUnit: e.target.value})}
                              className={`px-3 py-2 rounded-lg ${currentTheme.input} border ${currentTheme.border} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            >
                              <option value="minutes">Min</option>
                              <option value="hours">Hrs</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className={`${currentTheme.empty} rounded-lg p-4 border ${currentTheme.border}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-emerald-400" />
                      <label className={`text-sm font-medium ${currentTheme.text}`}>Daily Goal</label>
                    </div>
                    <button
                      onClick={() => setCounterForm({...counterForm, goalEnabled: !counterForm.goalEnabled})}
                      className={`relative w-11 h-6 rounded-full transition-colors ${counterForm.goalEnabled ? 'bg-emerald-500' : currentTheme.input}`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${counterForm.goalEnabled ? 'translate-x-5' : ''} shadow-sm`}></div>
                    </button>
                  </div>
                  
                  {counterForm.goalEnabled && (
                    <div className={`space-y-3 pt-3 border-t ${currentTheme.border}`}>
                      <div>
                        <label className={`text-xs ${currentTheme.textSecondary} mb-1.5 block`}>Target</label>
                        <input
                          type="number"
                          value={counterForm.goalTarget}
                          onChange={(e) => setCounterForm({...counterForm, goalTarget: e.target.value})}
                          placeholder="8"
                          className={`w-full px-3 py-2 rounded-lg ${currentTheme.input} border ${currentTheme.border} ${currentTheme.text} text-sm placeholder-${currentTheme.textTertiary} focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                        />
                      </div>
                      <div>
                        <label className={`text-xs ${currentTheme.textSecondary} mb-1.5 block`}>By time</label>
                        <input
                          type="time"
                          value={counterForm.goalDeadline}
                          onChange={(e) => setCounterForm({...counterForm, goalDeadline: e.target.value})}
                          className={`w-full px-3 py-2 rounded-lg ${currentTheme.input} border ${currentTheme.border} ${currentTheme.text} text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={createCounter}
                disabled={!counterForm.name.trim()}
                className="w-full mt-6 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
              >
                Create Counter
              </button>
            </div>
          </div>
        )}

        {/* Create Folder Modal */}
        {showCreateFolder && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-3xl">
            <div className={`${currentTheme.cardSolid} rounded-2xl p-6 w-full border ${currentTheme.border} shadow-2xl`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${currentTheme.text}`}>Create Folder</h2>
                <button
                  onClick={() => {
                    setShowCreateFolder(false);
                    resetFolderForm();
                  }}
                  className={`p-2 rounded-lg ${currentTheme.hover} transition-colors`}
                >
                  <X className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`text-sm font-medium ${currentTheme.textSecondary} mb-2 block`}>Name</label>
                  <input
                    type="text"
                    value={folderForm.name}
                    onChange={(e) => setFolderForm({...folderForm, name: e.target.value})}
                    placeholder="Work, Personal, Health..."
                    className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.input} border ${currentTheme.border} ${currentTheme.text} placeholder-${currentTheme.textTertiary} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    autoFocus
                  />
                </div>

                <div>
                  <label className={`text-sm font-medium ${currentTheme.textSecondary} mb-2 block`}>Color</label>
                  <div className="grid grid-cols-8 gap-2">
                    {COLORS.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFolderForm({...folderForm, color: idx})}
                        className={`aspect-square rounded-lg bg-gradient-to-br ${c.gradient} transition-all hover:scale-110 ${folderForm.color === idx ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={createFolder}
                disabled={!folderForm.name.trim()}
                className="w-full mt-6 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
              >
                Create Folder
              </button>
            </div>
          </div>
        )}

        {/* Move Counter Modal */}
        {showMoveCounter !== null && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-3xl">
            <div className={`${currentTheme.cardSolid} rounded-2xl p-6 w-full border ${currentTheme.border} shadow-2xl max-h-[80%] overflow-y-auto`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${currentTheme.text}`}>Move to Folder</h2>
                <button
                  onClick={() => setShowMoveCounter(null)}
                  className={`p-2 rounded-lg ${currentTheme.hover} transition-colors`}
                >
                  <X className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                </button>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => moveCounter(showMoveCounter, null)}
                  className={`w-full px-4 py-3 rounded-lg ${currentTheme.input} ${currentTheme.hover} border ${currentTheme.border} text-left ${currentTheme.text} transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${currentTheme.empty} flex items-center justify-center`}>
                      <Folder className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                    </div>
                    <span className="font-medium">No Folder</span>
                  </div>
                </button>
                
                {folders.map(folder => {
                  const color = COLORS[folder.color];
                  return (
                    <button
                      key={folder.id}
                      onClick={() => moveCounter(showMoveCounter, folder.id)}
                      className={`w-full px-4 py-3 rounded-lg ${currentTheme.input} ${currentTheme.hover} border ${currentTheme.border} text-left ${currentTheme.text} transition-colors`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color.gradient} flex items-center justify-center shadow-lg`}>
                          <Folder className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium">{folder.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Export Selection Modal */}
        {showExportSelection && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-3xl">
            <div className={`${currentTheme.cardSolid} rounded-2xl p-6 w-full max-h-[80%] overflow-y-auto border ${currentTheme.border} shadow-2xl`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${currentTheme.text}`}>Select Counters</h2>
                <button
                  onClick={() => {
                    setShowExportSelection(false);
                    setSelectedForExport([]);
                  }}
                  className={`p-2 rounded-lg ${currentTheme.hover} transition-colors`}
                >
                  <X className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                </button>
              </div>

              <div className="space-y-2 mb-6">
                {counters.map(counter => {
                  const color = COLORS[counter.color];
                  const isSelected = selectedForExport.includes(counter.id);
                  return (
                    <button
                      key={counter.id}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedForExport(selectedForExport.filter(id => id !== counter.id));
                        } else {
                          setSelectedForExport([...selectedForExport, counter.id]);
                        }
                      }}
                      className={`w-full px-4 py-3 rounded-lg border transition-all text-left ${isSelected ? 'bg-blue-500/20 border-blue-500' : `${currentTheme.input} ${currentTheme.border} ${currentTheme.hover}`}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-blue-500 border-blue-500' : `border-${currentTheme.textTertiary}`}`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <div>
                            <span className={`font-medium ${currentTheme.text}`}>{counter.name}</span>
                            <div className={`text-xs ${currentTheme.textTertiary} mt-0.5`}>{counter.clicks.length} entries</div>
                          </div>
                        </div>
                        <span className={`text-lg font-semibold ${color.text}`}>{counter.count}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2">
                <button
                  onClick={exportToFile}
                  disabled={selectedForExport.length === 0}
                  className="w-full px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save to Files
                </button>
                <button
                  onClick={() => setShowEmailExport(true)}
                  disabled={selectedForExport.length === 0}
                  className={`w-full px-6 py-3 rounded-lg ${currentTheme.input} ${currentTheme.hover} ${currentTheme.text} font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed border ${currentTheme.border} flex items-center justify-center gap-2`}
                >
                  <Mail className="w-4 h-4" />
                  Send via Email
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Email Export Modal */}
        {showEmailExport && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-3xl">
            <div className={`${currentTheme.cardSolid} rounded-2xl p-6 w-full border ${currentTheme.border} shadow-2xl`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${currentTheme.text}`}>Send via Email</h2>
                <button
                  onClick={() => {
                    setShowEmailExport(false);
                    setExportEmail('');
                  }}
                  className={`p-2 rounded-lg ${currentTheme.hover} transition-colors`}
                >
                  <X className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                </button>
              </div>

              <div className="mb-6">
                <label className={`text-sm font-medium ${currentTheme.textSecondary} mb-2 block`}>Email Address</label>
                <input
                  type="email"
                  value={exportEmail}
                  onChange={(e) => setExportEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-2.5 rounded-lg ${currentTheme.input} border ${currentTheme.border} ${currentTheme.text} placeholder-${currentTheme.textTertiary} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  autoFocus
                />
              </div>

              <button
                onClick={exportToEmail}
                disabled={!exportEmail.trim()}
                className="w-full px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
              >
                Send Email
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-3xl">
            <div className={`${currentTheme.cardSolid} rounded-2xl p-6 w-full border ${currentTheme.border} shadow-2xl`}>
              <div className="mb-6">
                <h2 className={`text-xl font-semibold ${currentTheme.text} mb-2`}>Delete All Data?</h2>
                <p className={`text-sm ${currentTheme.textSecondary}`}>This will permanently delete all counters, folders, and history. This action cannot be undone.</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className={`flex-1 px-6 py-3 rounded-lg ${currentTheme.input} ${currentTheme.hover} ${currentTheme.text} font-medium transition-all border ${currentTheme.border}`}
                >
                  Cancel
                </button>
                <button
                  onClick={deleteAllData}
                  className="flex-1 px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-all"
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main App */}
        {activeCounter === null && !showHistory && (
          <div className={`h-full flex flex-col ${currentTheme.card} backdrop-blur-xl rounded-2xl overflow-hidden border ${currentTheme.border} shadow-2xl`}>
            {/* Header with Tabs */}
            <div className={`${currentTheme.cardSolid} border-b ${currentTheme.border}`}>
              <div className="flex items-center justify-between px-5 py-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Tally</h1>
                {(currentView === 'counters' || currentView === 'folders') && (
                  <div className="flex items-center gap-2">
                    {currentView === 'counters' && (
                      <div className="relative">
                        <button
                          onClick={() => setShowSortMenu(!showSortMenu)}
                          className={`p-2 rounded-lg ${currentTheme.hover} transition-colors`}
                        >
                          <ArrowUpDown className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                        </button>
                        {showSortMenu && (
                          <div className={`absolute right-0 top-12 ${currentTheme.input} rounded-lg border ${currentTheme.border} shadow-xl overflow-hidden min-w-[140px] z-10`}>
                            <button
                              onClick={() => {
                                setCounterSort('mostRecent');
                                setShowSortMenu(false);
                              }}
                              className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${counterSort === 'mostRecent' ? 'bg-blue-500 text-white' : `${currentTheme.textSecondary} ${currentTheme.hover}`}`}
                            >
                              Most Recent
                            </button>
                            <button
                              onClick={() => {
                                setCounterSort('dateCreated');
                                setShowSortMenu(false);
                              }}
                              className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${counterSort === 'dateCreated' ? 'bg-blue-500 text-white' : `${currentTheme.textSecondary} ${currentTheme.hover}`}`}
                            >
                              Date Created
                            </button>
                            <button
                              onClick={() => {
                                setCounterSort('alphabetical');
                                setShowSortMenu(false);
                              }}
                              className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${counterSort === 'alphabetical' ? 'bg-blue-500 text-white' : `${currentTheme.textSecondary} ${currentTheme.hover}`}`}
                            >
                              Alphabetical
                            </button>
                            <button
                              onClick={() => {
                                setCounterSort('color');
                                setShowSortMenu(false);
                              }}
                              className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${counterSort === 'color' ? 'bg-blue-500 text-white' : `${currentTheme.textSecondary} ${currentTheme.hover}`}`}
                            >
                              Color
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    {currentView === 'folders' && (
                      <div className="relative">
                        <button
                          onClick={() => setShowSortMenu(!showSortMenu)}
                          className={`p-2 rounded-lg ${currentTheme.hover} transition-colors`}
                        >
                          <ArrowUpDown className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                        </button>
                        {showSortMenu && (
                          <div className={`absolute right-0 top-12 ${currentTheme.input} rounded-lg border ${currentTheme.border} shadow-xl overflow-hidden min-w-[140px] z-10`}>
                            <button
                              onClick={() => {
                                setFolderSort('dateCreated');
                                setShowSortMenu(false);
                              }}
                              className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${folderSort === 'dateCreated' ? 'bg-blue-500 text-white' : `${currentTheme.textSecondary} ${currentTheme.hover}`}`}
                            >
                              Date Created
                            </button>
                            <button
                              onClick={() => {
                                setFolderSort('alphabetical');
                                setShowSortMenu(false);
                              }}
                              className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${folderSort === 'alphabetical' ? 'bg-blue-500 text-white' : `${currentTheme.textSecondary} ${currentTheme.hover}`}`}
                            >
                              Alphabetical
                            </button>
                            <button
                              onClick={() => {
                                setFolderSort('color');
                                setShowSortMenu(false);
                              }}
                              className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${folderSort === 'color' ? 'bg-blue-500 text-white' : `${currentTheme.textSecondary} ${currentTheme.hover}`}`}
                            >
                              Color
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    <button
                      onClick={() => currentView === 'counters' ? setShowCreateCounter(true) : setShowCreateFolder(true)}
                      className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
                    >
                      <Plus className="w-5 h-5 text-white" />
                    </button>
                  </div>
                )}
                {currentView === 'export' && (
                  <button
                    onClick={() => setShowExportSelection(true)}
                    className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                )}
              </div>
              
              <div className={`flex border-t ${currentTheme.border}`}>
                <button
                  onClick={() => {
                    setCurrentView('counters');
                    setShowSortMenu(false);
                  }}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${currentView === 'counters' ? `${currentTheme.text} border-b-2 border-blue-500 ${currentTheme.empty}` : `${currentTheme.textSecondary} hover:${currentTheme.textSecondary}`}`}
                >
                  Counters
                </button>
                <button
                  onClick={() => {
                    setCurrentView('folders');
                    setShowSortMenu(false);
                  }}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${currentView === 'folders' ? `${currentTheme.text} border-b-2 border-blue-500 ${currentTheme.empty}` : `${currentTheme.textSecondary} hover:${currentTheme.textSecondary}`}`}
                >
                  Folders
                </button>
                <button
                  onClick={() => {
                    setCurrentView('log');
                    setShowSortMenu(false);
                  }}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${currentView === 'log' ? `${currentTheme.text} border-b-2 border-blue-500 ${currentTheme.empty}` : `${currentTheme.textSecondary} hover:${currentTheme.textSecondary}`}`}
                >
                  Log
                </button>
                <button
                  onClick={() => {
                    setCurrentView('export');
                    setShowSortMenu(false);
                  }}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${currentView === 'export' ? `${currentTheme.text} border-b-2 border-blue-500 ${currentTheme.empty}` : `${currentTheme.textSecondary} hover:${currentTheme.textSecondary}`}`}
                >
                  Export
                </button>
                <button
                  onClick={() => {
                    setCurrentView('settings');
                    setShowSortMenu(false);
                  }}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${currentView === 'settings' ? `${currentTheme.text} border-b-2 border-blue-500 ${currentTheme.empty}` : `${currentTheme.textSecondary} hover:${currentTheme.textSecondary}`}`}
                >
                  Settings
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              {/* Counters Tab */}
              {currentView === 'counters' && (
                <div>
                  {getSortedCounters().length === 0 ? (
                    <div className={`flex flex-col items-center justify-center h-96 ${currentTheme.textTertiary}`}>
                      <div className={`w-20 h-20 rounded-2xl ${currentTheme.empty} flex items-center justify-center mb-4`}>
                        <Plus className={`w-10 h-10 ${currentTheme.textTertiary}`} />
                      </div>
                      <div className={`text-lg font-semibold ${currentTheme.textSecondary}`}>No counters yet</div>
                      <div className={`text-sm mt-1 ${currentTheme.textTertiary}`}>Tap + to create your first counter</div>
                    </div>
                  ) : (
                    getSortedCounters().map(counter => {
                      const color = COLORS[counter.color];
                      const goalProgress = counter.goal ? Math.min(100, (counter.count / counter.goal.target) * 100) : 0;
                      const goalReached = counter.goal && counter.count >= counter.goal.target;
                      
                      return (
                        <div
                          key={counter.id}
                          className={`px-5 py-4 border-b ${currentTheme.border} ${currentTheme.hover} transition-colors group`}
                        >
                          <div className="flex items-center justify-between">
                            <div 
                              className="flex-1 cursor-pointer"
                              onClick={() => setActiveCounter(counter.id)}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className={`text-base font-semibold ${currentTheme.text}`}>{counter.name}</h3>
                                {counter.locked && <Lock className={`w-3.5 h-3.5 ${currentTheme.textTertiary}`} />}
                                {counter.reminder && <Bell className={`w-3.5 h-3.5 ${currentTheme.textTertiary}`} />}
                                {counter.goal && <Target className={`w-3.5 h-3.5 ${currentTheme.textTertiary}`} />}
                              </div>
                              <div className="flex items-baseline gap-2">
                                <span className={`text-3xl font-bold ${color.text}`}>{counter.count}</span>
                                {counter.goal && (
                                  <span className={`text-sm ${currentTheme.textTertiary}`}>
                                    / {counter.goal.target}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className={`flex items-center gap-1.5 ${leftHandedMode ? 'flex-row-reverse' : ''}`}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowMoveCounter(counter.id);
                                }}
                                className={`p-2 rounded-lg ${currentTheme.hover} transition-colors opacity-0 group-hover:opacity-100`}
                              >
                                <FolderInput className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                              </button>
                              <button
                                onClick={(e) => toggleCounterLock(counter.id, e)}
                                className={`p-2 rounded-lg ${currentTheme.hover} transition-colors opacity-0 group-hover:opacity-100`}
                              >
                                {counter.locked ? (
                                  <Lock className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                                ) : (
                                  <Unlock className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                                )}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addClick(-1, counter.id);
                                }}
                                disabled={counter.locked}
                                className={`w-9 h-9 rounded-lg transition-colors flex items-center justify-center ${counter.locked ? `${currentTheme.input} cursor-not-allowed opacity-50` : `${currentTheme.input} ${currentTheme.hover}`}`}
                              >
                                <Minus className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addClick(1, counter.id);
                                }}
                                disabled={counter.locked}
                                className={`w-9 h-9 rounded-lg transition-colors flex items-center justify-center ${counter.locked ? `${color.light} cursor-not-allowed opacity-50` : `${color.solid} hover:opacity-90`}`}
                              >
                                <Plus className="w-4 h-4 text-white" />
                              </button>
                              <button
                                onClick={(e) => deleteCounter(counter.id, e)}
                                className="p-2 rounded-lg hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 className={`w-4 h-4 ${currentTheme.textTertiary} hover:text-red-400`} />
                              </button>
                            </div>
                          </div>
                          
                          {counter.goal && (
                            <div className={`mt-3 h-1.5 ${currentTheme.empty} rounded-full overflow-hidden`}>
                              <div 
                                className={`h-full ${goalReached ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : `bg-gradient-to-r ${color.gradient}`} transition-all duration-300`}
                                style={{width: `${goalProgress}%`}}
                              ></div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* Folders Tab */}
              {currentView === 'folders' && (
                <div>
                  {getSortedFolders().length === 0 ? (
                    <div className={`flex flex-col items-center justify-center h-96 ${currentTheme.textTertiary}`}>
                      <div className={`w-20 h-20 rounded-2xl ${currentTheme.empty} flex items-center justify-center mb-4`}>
                        <Folder className={`w-10 h-10 ${currentTheme.textTertiary}`} />
                      </div>
                      <div className={`text-lg font-semibold ${currentTheme.textSecondary}`}>No folders yet</div>
                      <div className={`text-sm mt-1 ${currentTheme.textTertiary}`}>Tap + to create your first folder</div>
                    </div>
                  ) : (
                    getSortedFolders().map(folder => {
                      const folderCounters = counters.filter(c => c.folderId === folder.id);
                      const color = COLORS[folder.color];
                      return (
                        <div
                          key={folder.id}
                          onClick={() => {
                            setCurrentFolder(folder.id);
                            setCurrentView('counters');
                          }}
                          className={`px-5 py-4 border-b ${currentTheme.border} ${currentTheme.hover} transition-colors cursor-pointer group`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color.gradient} flex items-center justify-center shadow-lg`}>
                                <Folder className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className={`text-base font-semibold ${currentTheme.text}`}>{folder.name}</h3>
                                <p className={`text-sm ${currentTheme.textTertiary} mt-0.5`}>{folderCounters.length} counter{folderCounters.length !== 1 ? 's' : ''}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteFolder(folder.id);
                                }}
                                className="p-2 rounded-lg hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 className={`w-4 h-4 ${currentTheme.textTertiary} hover:text-red-400`} />
                              </button>
                              <ChevronRight className={`w-5 h-5 ${currentTheme.textTertiary}`} />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* Log Tab */}
              {currentView === 'log' && (
                <div>
                  {getAllLogs().length === 0 ? (
                    <div className={`flex flex-col items-center justify-center h-96 ${currentTheme.textTertiary}`}>
                      <div className={`w-20 h-20 rounded-2xl ${currentTheme.empty} flex items-center justify-center mb-4`}>
                        <History className={`w-10 h-10 ${currentTheme.textTertiary}`} />
                      </div>
                      <div className={`text-lg font-semibold ${currentTheme.textSecondary}`}>No activity yet</div>
                      <div className={`text-sm mt-1 ${currentTheme.textTertiary}`}>Start counting to see your log</div>
                    </div>
                  ) : (
                    getAllLogs().map((log, idx) => {
                      const color = COLORS[log.counterColor];
                      const date = new Date(log.timestamp);
                      return (
                        <div
                          key={idx}
                          className={`px-5 py-3 border-b ${currentTheme.border} ${currentTheme.hover} transition-colors`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                                {log.value > 0 ? '+' : ''}{log.value}
                              </div>
                              <div>
                                <div className={`text-sm font-medium ${currentTheme.text}`}>{log.counterName}</div>
                                <div className={`text-xs ${currentTheme.textTertiary} mt-0.5`}>
                                  {date.toLocaleDateString()} · {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* Export Tab */}
              {currentView === 'export' && (
                <div className="p-6">
                  <div className={`${currentTheme.empty} rounded-xl p-8 border ${currentTheme.border} text-center`}>
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className={`text-xl font-semibold ${currentTheme.text} mb-2`}>Export Your Data</h3>
                    <p className={`${currentTheme.textSecondary} text-sm mb-6`}>Download your counter data as CSV files</p>
                    <button
                      onClick={() => setShowExportSelection(true)}
                      className="px-6 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
                    >
                      Select Counters
                    </button>
                  </div>
                  
                  {counters.length > 0 && (
                    <div className="mt-6">
                      <h4 className={`text-xs font-semibold ${currentTheme.textTertiary} uppercase tracking-wider mb-3`}>Available Counters</h4>
                      <div className="space-y-2">
                        {counters.map(counter => {
                          const color = COLORS[counter.color];
                          return (
                            <div key={counter.id} className={`flex items-center justify-between px-4 py-3 rounded-lg ${currentTheme.empty} border ${currentTheme.border}`}>
                              <span className={`font-medium ${currentTheme.text} text-sm`}>{counter.name}</span>
                              <span className={`text-xs ${currentTheme.textTertiary}`}>{counter.clicks.length} entries</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {currentView === 'settings' && (
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Appearance</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setTheme('dark')}
                        className={`w-full px-4 py-3 rounded-lg border transition-all text-left ${theme === 'dark' ? 'bg-blue-500/20 border-blue-500' : `${currentTheme.input} ${currentTheme.border} ${currentTheme.hover}`}`}
                      >
                        <div className="flex items-center gap-3">
                          <Moon className="w-5 h-5 text-slate-400" />
                          <div>
                            <div className={`font-medium ${currentTheme.text}`}>Dark</div>
                            <div className={`text-xs ${currentTheme.textTertiary}`}>Classic dark theme</div>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setTheme('light')}
                        className={`w-full px-4 py-3 rounded-lg border transition-all text-left ${theme === 'light' ? 'bg-blue-500/20 border-blue-500' : `${currentTheme.input} ${currentTheme.border} ${currentTheme.hover}`}`}
                      >
                        <div className="flex items-center gap-3">
                          <Sun className="w-5 h-5 text-amber-400" />
                          <div>
                            <div className={`font-medium ${currentTheme.text}`}>Light</div>
                            <div className={`text-xs ${currentTheme.textTertiary}`}>Clean light theme</div>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setTheme('ocean')}
                        className={`w-full px-4 py-3 rounded-lg border transition-all text-left ${theme === 'ocean' ? 'bg-blue-500/20 border-blue-500' : `${currentTheme.input} ${currentTheme.border} ${currentTheme.hover}`}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-400 to-cyan-400"></div>
                          <div>
                            <div className={`font-medium ${currentTheme.text}`}>Ocean</div>
                            <div className={`text-xs ${currentTheme.textTertiary}`}>Calm blue waters</div>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setTheme('sunset')}
                        className={`w-full px-4 py-3 rounded-lg border transition-all text-left ${theme === 'sunset' ? 'bg-blue-500/20 border-blue-500' : `${currentTheme.input} ${currentTheme.border} ${currentTheme.hover}`}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded bg-gradient-to-br from-orange-400 to-pink-400"></div>
                          <div>
                            <div className={`font-medium ${currentTheme.text}`}>Sunset</div>
                            <div className={`text-xs ${currentTheme.textTertiary}`}>Warm evening glow</div>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setTheme('forest')}
                        className={`w-full px-4 py-3 rounded-lg border transition-all text-left ${theme === 'forest' ? 'bg-blue-500/20 border-blue-500' : `${currentTheme.input} ${currentTheme.border} ${currentTheme.hover}`}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded bg-gradient-to-br from-emerald-400 to-green-400"></div>
                          <div>
                            <div className={`font-medium ${currentTheme.text}`}>Forest</div>
                            <div className={`text-xs ${currentTheme.textTertiary}`}>Natural green tones</div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Preferences</h3>
                    <div className={`flex items-center justify-between p-4 rounded-lg ${currentTheme.empty} border ${currentTheme.border}`}>
                      <div className="flex items-center gap-3">
                        <Palette className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                        <div>
                          <div className={`text-sm font-medium ${currentTheme.text}`}>Left-Handed Mode</div>
                          <div className={`text-xs ${currentTheme.textTertiary}`}>Move buttons to left side</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setLeftHandedMode(!leftHandedMode)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${leftHandedMode ? 'bg-blue-500' : currentTheme.input}`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${leftHandedMode ? 'translate-x-5' : ''} shadow-sm`}></div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Data</h3>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full px-4 py-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Trash2 className="w-5 h-5 text-red-400" />
                        <div>
                          <div className="font-medium text-red-400">Delete All Data</div>
                          <div className="text-xs text-red-400/70">Remove all counters and history</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Folder Navigation */}
            {currentFolder !== null && currentView === 'counters' && (
              <div className={`px-5 py-3 ${currentTheme.cardSolid} border-t ${currentTheme.border} flex items-center justify-between`}>
                <button
                  onClick={() => setCurrentFolder(null)}
                  className={`flex items-center gap-2 text-sm ${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>All counters</span>
                </button>
                <span className={`text-sm font-medium ${currentTheme.text}`}>
                  {folders.find(f => f.id === currentFolder)?.name}
                </span>
              </div>
            )}
          </div>
        )}
        
        {/* Counter Detail View */}
        {activeCounter !== null && !showHistory && activeCounterData && (
          <div className={`h-full flex flex-col ${currentTheme.card} backdrop-blur-xl rounded-2xl overflow-hidden border ${currentTheme.border} shadow-2xl`}>
            <div className={`${currentTheme.cardSolid} p-5 border-b ${currentTheme.border}`}>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setActiveCounter(null)}
                  className={`p-2 rounded-lg ${currentTheme.hover} transition-colors -ml-2`}
                >
                  <ChevronLeft className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                </button>
                <h1 className={`text-lg font-semibold ${currentTheme.text}`}>{activeCounterData.name}</h1>
                <button
                  onClick={() => setShowHistory(true)}
                  className={`p-2 rounded-lg ${currentTheme.hover} transition-colors -mr-2`}
                >
                  <History className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                </button>
              </div>
              {activeCounterData.goal && (
                <div className={`mt-4 pt-4 border-t ${currentTheme.border}`}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className={currentTheme.textTertiary}>Daily Goal</span>
                    <span className={`${currentTheme.text} font-medium`}>{activeCounterData.count} / {activeCounterData.goal.target}</span>
                  </div>
                  <div className={`h-2 ${currentTheme.empty} rounded-full overflow-hidden`}>
                    <div 
                      className={`h-full ${activeCounterData.count >= activeCounterData.goal.target ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : `bg-gradient-to-r ${COLORS[activeCounterData.color].gradient}`} transition-all duration-300`}
                      style={{width: `${Math.min(100, (activeCounterData.count / activeCounterData.goal.target) * 100)}%`}}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {!leftHandedMode ? (
              <>
                <div className="flex justify-center py-6">
                  <button
                    onClick={() => addClick(-1)}
                    className={`w-14 h-14 rounded-xl ${currentTheme.input} ${currentTheme.hover} border ${currentTheme.border} transition-all active:scale-95 flex items-center justify-center shadow-lg`}
                  >
                    <Minus className={`w-7 h-7 ${currentTheme.textSecondary}`} />
                  </button>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center gap-6">
                  <div className={`text-8xl font-bold ${COLORS[activeCounterData.color].text} tabular-nums`}>
                    {activeCounterData.count}
                  </div>
                  <button
                    onClick={resetCounter}
                    className={`px-5 py-2.5 rounded-lg ${currentTheme.input} ${currentTheme.hover} border ${currentTheme.border} transition-all flex items-center gap-2`}
                  >
                    <RotateCcw className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                    <span className={`${currentTheme.textSecondary} font-medium text-sm`}>Reset</span>
                  </button>
                </div>

                <div className="p-5">
                  <button
                    onClick={() => addClick(1)}
                    className={`w-full h-28 rounded-2xl bg-gradient-to-br ${COLORS[activeCounterData.color].gradient} hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center shadow-2xl`}
                  >
                    <Plus className="w-16 h-16 text-white" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center py-6">
                  <button
                    onClick={() => addClick(-1)}
                    className={`w-14 h-14 rounded-xl ${currentTheme.input} ${currentTheme.hover} border ${currentTheme.border} transition-all active:scale-95 flex items-center justify-center shadow-lg`}
                  >
                    <Minus className={`w-7 h-7 ${currentTheme.textSecondary}`} />
                  </button>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center gap-6">
                  <div className={`text-8xl font-bold ${COLORS[activeCounterData.color].text} tabular-nums`}>
                    {activeCounterData.count}
                  </div>
                  <button
                    onClick={resetCounter}
                    className={`px-5 py-2.5 rounded-lg ${currentTheme.input} ${currentTheme.hover} border ${currentTheme.border} transition-all flex items-center gap-2`}
                  >
                    <RotateCcw className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                    <span className={`${currentTheme.textSecondary} font-medium text-sm`}>Reset</span>
                  </button>
                </div>

                <div className="p-5">
                  <button
                    onClick={() => addClick(1)}
                    className={`w-full h-28 rounded-2xl bg-gradient-to-br ${COLORS[activeCounterData.color].gradient} hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center shadow-2xl`}
                  >
                    <Plus className="w-16 h-16 text-white" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* History View */}
        {showHistory && activeCounterData && (
          <div className={`h-full ${currentTheme.card} backdrop-blur-xl rounded-2xl flex flex-col overflow-hidden border ${currentTheme.border} shadow-2xl`}>
            <div className={`${currentTheme.cardSolid} p-5 border-b ${currentTheme.border}`}>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowHistory(false)}
                  className={`p-2 rounded-lg ${currentTheme.hover} transition-colors -ml-2`}
                >
                  <ChevronLeft className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                </button>
                <h2 className={`text-lg font-semibold ${currentTheme.text}`}>History</h2>
                <button
                  onClick={() => {
                    const counter = activeCounterData;
                    const historyData = getHistoryData();
                    const csv = [
                      ['Date', 'Increments', 'Decrements', 'Net Total'],
                      ...historyData.map(row => [row.date, row.increments, row.decrements, row.total])
                    ].map(row => row.join(',')).join('\n');

                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${counter.name}_history.csv`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className={`p-2 rounded-lg ${currentTheme.hover} transition-colors -mr-2`}
                >
                  <Download className={`w-5 h-5 ${currentTheme.textSecondary}`} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {getHistoryData().map((day, idx) => (
                <div key={idx} className={`${currentTheme.empty} rounded-xl p-4 border ${currentTheme.border}`}>
                  <div className={`${currentTheme.text} font-semibold mb-3 text-sm`}>{day.date}</div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                      <div className="text-emerald-400 font-bold text-lg">+{day.increments}</div>
                      <div className={`${currentTheme.textTertiary} text-xs mt-1`}>Increments</div>
                    </div>
                    <div className="bg-rose-500/10 rounded-lg p-3 border border-rose-500/20">
                      <div className="text-rose-400 font-bold text-lg">−{day.decrements}</div>
                      <div className={`${currentTheme.textTertiary} text-xs mt-1`}>Decrements</div>
                    </div>
                    <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                      <div className="text-white font-bold text-lg">{day.total}</div>
                      <div className={`${currentTheme.textTertiary} text-xs mt-1`}>Net Total</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {getHistoryData().length === 0 && (
                <div className={`text-center ${currentTheme.textTertiary} mt-20`}>
                  <div className={`w-20 h-20 rounded-2xl ${currentTheme.empty} flex items-center justify-center mx-auto mb-4`}>
                    <History className={`w-10 h-10 ${currentTheme.textTertiary}`} />
                  </div>
                  <div className={`text-lg font-semibold ${currentTheme.textSecondary}`}>No history yet</div>
                  <div className={`text-sm mt-1 ${currentTheme.textTertiary}`}>Start counting to see your history</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
