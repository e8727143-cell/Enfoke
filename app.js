(function () {
  'use strict';

  const { useState, useEffect, useCallback, useRef, createElement, Fragment } = React;

  const supabaseUrl = 'https://diksvhkjuexnyoqlrbjz.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpa3N2aGtqdWV4bnlvcWxyYmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MzkwNTcsImV4cCI6MjA3ODExNTA1N30.J8uqb2ihW8RBpFocB44ieOt5e1sSltOPRs1QY7Ivk8k';
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  // ========== ICON COMPONENTS ==========
  const createSvgIcon = (paths, props = {}) => ({ className }) =>
    createElement('svg', {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24", height: "24", viewBox: "0 0 24 24", fill: "none",
      stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round",
      strokeLinejoin: "round", className, ...props
    }, ...paths);

  const TrashIcon = createSvgIcon([
    createElement('path', { key: 1, d: "M3 6h18" }),
    createElement('path', { key: 2, d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }),
    createElement('line', { key: 3, x1: "10", y1: "11", x2: "10", y2: "17" }),
    createElement('line', { key: 4, x1: "14", y1: "11", x2: "14", y2: "17" })
  ]);
  const PlusIcon = createSvgIcon([
    createElement('line', { key: 1, x1: "12", y1: "5", x2: "12", y2: "19" }),
    createElement('line', { key: 2, x1: "5", y1: "12", x2: "19", y2: "12" })
  ]);
  const SparklesIcon = createSvgIcon([
    createElement('path', { key: 1, d: "m12 3-1.9 5.8-5.8 1.9 5.8 1.9L12 18l1.9-5.8 5.8-1.9-5.8-1.9L12 3z" }),
    createElement('path', { key: 2, d: "M5 3v4" }), createElement('path', { key: 3, d: "M19 17v4" }),
    createElement('path', { key: 4, d: "M3 5h4" }), createElement('path', { key: 5, d: "M17 19h4" })
  ]);
  const XIcon = createSvgIcon([
    createElement('line', { key: 1, x1: "18", y1: "6", x2: "6", y2: "18" }),
    createElement('line', { key: 2, x1: "6", y1: "6", x2: "18", y2: "18" })
  ]);
  const CheckIcon = createSvgIcon([
    createElement('polyline', { key: 1, points: "20 6 9 17 4 12" })
  ], { strokeWidth: "3" });
  const ClockIcon = createSvgIcon([
    createElement('circle', { key: 1, cx: "12", cy: "12", r: "10" }),
    createElement('polyline', { key: 2, points: "12 6 12 12 16 14" })
  ]);
  const InstallIcon = createSvgIcon([
      createElement('path', { key: 1, d: "M12 17V3" }),
      createElement('path', { key: 2, d: "m6 11 6 6 6-6" }),
      createElement('path', { key: 3, d: "M19 21H5" })
  ]);
  const RunningIcon = ({ className }) => createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", className },
      createElement('g', { 'data-name': "21_running" },
          createElement('path', { fill: "#f2463e", d: "m294.19 188.14-93.13 39.78a17.73 17.73 0 0 0-9.49 22.9l58.39 146.72c14.84-13.73 32.53-22.39 22-89.49-8.3-52.91 10.63-78.34 20.29-89.5a29.7 29.7 0 0 1 15.9-17.33 2.42 2.42 0 0 0 1.24-3.15z" }),
          createElement('path', { fill: "#f3b5af", d: "m397.12 45.75-89.59 131.17-17.11 7.75s3.3 9.32-10.79 18.44-2.72 47.79 19.06 45.75 42.67-7 53.26 14.68l20.32-40.32 104.18-117.8z" })
      )
  );
  const BrainIcon = ({ className }) => createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 72 72", className },
      createElement('path', { fill: "#ffa7c0", d: "M52.482 29.62c-1.251 1.808-.075 3.386 1.104 5.186c1.223 1.868.563 4.303-1.262 5.916a1.353 1.353 0 0 0-.367 1.95c1.242 2.624.357 5.163-2.12 6.738a2.974 2.974 0 0 0-1.117 1.377a4.917 4.917 0 0 1-5.273 3.447a1.902 1.902 0 0 0-1.392.702c-1.422 1.967-3.278 2.355-5.31.918a1.115 1.115 0 0 0-1.553.008c-1.96 1.417-3.89 1.007-5.323-.942a1.925 1.925 0 0 0-1.408-.694a4.72 4.72 0 0 1-5.15-3.371a2.973 2.973 0 0 0-1.12-1.404c-2.651-1.652-3.51-4.269-2.082-7.063c.404-.79.174-1.099-.371-1.576a4.98 4.98 0 0 1-.162-7.77a1.32 1.32 0 0 0 .373-1.753c-1.134-2.796-.305-5.051 2.242-6.69a3.162 3.162 0 0 0 1.147-1.532a4.591 4.591 0 0 1 4.98-3.201a1.446 1.446 0 0 0 1.664-.79a3.38 3.38 0 0 1 5.09-.991a1.227 1.227 0 0 0 1.765.012c1.877-1.348 3.824-.89 5.212.99a2.048 2.048 0 0 0 1.505.73a4.864 4.864 0 0 1 5.183 3.558a3.24 3.24 0 0 0 1.283 1.416a5.234 5.234 0 0 1 2.462 4.828z"}),
      createElement('path', { fill: "none", stroke: "#000", strokeMiterlimit: "10", strokeWidth: "2", d: "M36 18.461v37.084" })
  );

  // ========== UI COMPONENTS ==========
  const LoadingSpinner = () => createElement('svg', { className: "animate-spin h-10 w-10 text-cyan-400", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
      createElement('circle', { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
      createElement('path', { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
  );

  const CelebrationAnimation = ({ show }) => {
    if (!show) return null;
    return createElement('div', { className: `fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] transition-opacity duration-300 ${show ? 'opacity-100 animate-fade-in' : 'opacity-0'}` },
      createElement('div', { className: "absolute inset-0 overflow-hidden pointer-events-none" }), // Confetti elements would go here
      createElement('div', { className: "flex flex-col items-center justify-center transform transition-transform duration-300 scale-100 animate-scale-in" },
        createElement('h2', { className: "text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 mt-4 drop-shadow-lg", style: { textShadow: '0 2px 4px rgba(0,0,0,0.5)' } }, '¡Felicidades!')
      )
    );
  };
  
  const TimeSelector = ({ isOpen, onClose, onTimeSelect, initialTime }) => {
      const [selectedHour, setSelectedHour] = useState('09');
      const [selectedMinute, setSelectedMinute] = useState('00');
      const hourScrollerRef = useRef(null);
      const minuteScrollerRef = useRef(null);

      const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
      const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

      useEffect(() => {
          if (initialTime) {
              const [h, m] = initialTime.split(':');
              setSelectedHour(h);
              setSelectedMinute(String(Math.round(parseInt(m, 10) / 5) * 5).padStart(2, '0'));
          } else {
              setSelectedHour('09');
              setSelectedMinute('00');
          }
      }, [initialTime, isOpen]);
      
      useEffect(() => {
          if (isOpen && hourScrollerRef.current && minuteScrollerRef.current) {
              const itemHeight = 48; // h-12
              hourScrollerRef.current.scrollTop = hours.indexOf(selectedHour) * itemHeight;
              minuteScrollerRef.current.scrollTop = minutes.indexOf(selectedMinute) * itemHeight;
          }
      }, [isOpen, selectedHour, selectedMinute]);

      if (!isOpen) return null;

      const handleScroll = (e, type) => {
          const itemHeight = 48;
          const index = Math.round(e.currentTarget.scrollTop / itemHeight);
          if (type === 'hour') setSelectedHour(hours[index]);
          else setSelectedMinute(minutes[index]);
      };

      return createElement('div', { className: "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4 animate-fade-in", onClick: onClose },
          createElement('div', { className: "bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col border border-slate-700 animate-scale-in", onClick: e => e.stopPropagation() },
              createElement('header', { className: "flex items-center justify-between p-4 border-b border-slate-700" },
                  createElement('h2', { className: "text-xl font-semibold text-slate-100" }, 'Seleccionar Hora'),
                  createElement('button', { onClick: onClose, className: "p-2 rounded-full text-slate-400 hover:bg-slate-700" }, createElement(XIcon, { className: 'w-6 h-6' }))
              ),
              createElement('div', { className: "relative flex justify-center items-center h-48 my-4 text-2xl text-slate-100" },
                  createElement('div', { className: "absolute inset-x-4 h-12 top-1/2 -translate-y-1/2 bg-teal-500/10 rounded-lg border border-teal-500/30" }),
                  createElement('div', { ref: hourScrollerRef, onScroll: e => handleScroll(e, 'hour'), className: "time-scroller w-1/2 h-full overflow-y-scroll scrollbar-hide" },
                      createElement('div', { className: 'h-[72px]' }),
                      ...hours.map(h => createElement('div', { key: h, className: `flex items-center justify-center h-12 transition-all ${selectedHour === h ? 'text-teal-300 font-bold text-3xl' : 'text-slate-500'}` }, h)),
                      createElement('div', { className: 'h-[72px]' })
                  ),
                  createElement('div', { className: 'text-4xl text-slate-500' }, ':'),
                  createElement('div', { ref: minuteScrollerRef, onScroll: e => handleScroll(e, 'minute'), className: "time-scroller w-1/2 h-full overflow-y-scroll scrollbar-hide" },
                      createElement('div', { className: 'h-[72px]' }),
                      ...minutes.map(m => createElement('div', { key: m, className: `flex items-center justify-center h-12 transition-all ${selectedMinute === m ? 'text-teal-300 font-bold text-3xl' : 'text-slate-500'}` }, m)),
                      createElement('div', { className: 'h-[72px]' })
                  )
              ),
              createElement('div', { className: "p-4 border-t border-slate-700" },
                  createElement('button', { onClick: () => onTimeSelect(`${selectedHour}:${selectedMinute}`), className: "w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-500" }, 'Confirmar')
              )
          )
      );
  };
  
  const TaskItem = ({ task, onToggle, onDelete, onSetImportance, onSetTime }) => {
    const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState(false);
    const importanceClasses = { normal: 'bg-transparent', important: 'bg-yellow-500', urgent: 'bg-red-500' };
    const importanceSequence = ['normal', 'important', 'urgent'];

    const handleImportanceClick = () => {
      const nextIndex = (importanceSequence.indexOf(task.importance || 'normal') + 1) % 3;
      onSetImportance(task.id, importanceSequence[nextIndex]);
    };
    
    return createElement(Fragment, null,
        createElement('div', { className: "flex items-center gap-2" },
            createElement('button', { onClick: handleImportanceClick, className: `w-1.5 h-16 rounded-full transition-all duration-300 ${importanceClasses[task.importance || 'normal']}` }),
            createElement('div', { className: "flex-grow flex flex-col" },
                !task.completed && task.importance !== 'normal' && createElement('span', { className: `text-xs font-bold uppercase mb-1 ml-4 self-start ${task.importance === 'urgent' ? 'text-red-400/80' : 'text-yellow-400/80'}` }, task.importance),
                createElement('div', { className: `relative flex items-center p-4 bg-white/10 rounded-xl group transition-all overflow-hidden ${task.completed ? 'bg-green-500/10 task-item-completed' : ''}` },
                    createElement('button', { onClick: () => onToggle(task.id), className: `flex-shrink-0 h-7 w-7 border-2 rounded-full flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-400' : 'border-cyan-400'}` },
                        task.completed && createElement(CheckIcon, { className: 'h-4 w-4 text-white' })
                    ),
                    createElement('div', { className: 'ml-4 flex-grow min-w-0' },
                        createElement('span', { className: `text-lg text-slate-100 block truncate ${task.completed ? 'line-through text-slate-400' : ''}` }, task.text),
                        task.time && createElement('span', { className: 'text-sm text-cyan-400/80 font-semibold' }, task.time)
                    ),
                    createElement('div', { className: "flex items-center gap-2 opacity-0 group-hover:opacity-100" },
                        createElement('button', { onClick: () => setIsTimeSelectorOpen(true), className: 'text-slate-500 hover:text-cyan-400' }, createElement(ClockIcon, { className: 'h-5 w-5' })),
                        createElement('button', { onClick: () => onDelete(task.id), className: 'text-slate-500 hover:text-red-400' }, createElement(TrashIcon, { className: 'h-6 w-6' }))
                    )
                )
            )
        ),
        createElement(TimeSelector, { isOpen: isTimeSelectorOpen, onClose: () => setIsTimeSelectorOpen(false), onTimeSelect: (time) => { onSetTime(task.id, time); setIsTimeSelectorOpen(false); }, initialTime: task.time })
    );
  };
  
  const SuggestedTasksModal = ({ isOpen, onClose, onConfirm, suggestions }) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [importance, setImportance] = useState('normal');
    const [time, setTime] = useState('');
    const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState(false);
    const importanceStyles = { normal: 'border-slate-600', important: 'border-yellow-500', urgent: 'border-red-500' };

    useEffect(() => { if (!isOpen) { setSelectedTask(null); setImportance('normal'); setTime(''); } }, [isOpen]);

    if (!isOpen) return null;

    const mainContent = !selectedTask
      ? createElement('div', { className: "p-4 overflow-y-auto space-y-3" },
          suggestions.map(text => createElement('button', { key: text, onClick: () => setSelectedTask(text), className: "w-full flex items-center gap-4 text-left p-4 bg-slate-700/50 rounded-lg hover:bg-teal-500/30 text-slate-100" },
            text === 'Salir a correr' && createElement(RunningIcon, { className: 'h-6 w-6 text-cyan-400' }),
            createElement('span', { className: 'text-lg' }, text)
          ))
        )
      : createElement('div', { className: "p-6 overflow-y-auto flex flex-col gap-6" },
          createElement('p', { className: "text-lg text-center text-slate-300 bg-slate-700/50 p-3 rounded-lg" }, selectedTask),
          createElement('div', null,
            createElement('label', { className: 'block text-sm text-slate-400 mb-2' }, 'Importancia'),
            createElement('div', { className: 'grid grid-cols-3 gap-3' },
              ['normal', 'important', 'urgent'].map(level => createElement('button', { key: level, onClick: () => setImportance(level), className: `p-3 rounded-lg border-2 ${importance === level ? importanceStyles[level] + ' bg-white/10' : 'border-transparent bg-slate-700/50'}` }, level.charAt(0).toUpperCase() + level.slice(1)))
            )
          ),
          createElement('div', null,
            createElement('label', { className: 'block text-sm text-slate-400 mb-2' }, 'Hora (Opcional)'),
            createElement('button', { onClick: () => setIsTimeSelectorOpen(true), className: 'w-full bg-slate-900/80 rounded-md px-3 py-2 text-lg border border-slate-700 flex justify-between items-center' },
              createElement('span', { className: time ? 'text-white' : 'text-slate-500' }, time || 'Definir hora'),
              createElement(ClockIcon, { className: 'w-5 h-5 text-slate-400' })
            )
          ),
          createElement('div', { className: "flex items-center gap-3 pt-4 border-t border-slate-700" },
            createElement('button', { onClick: () => setSelectedTask(null), className: "w-full py-3 bg-slate-700 rounded-lg" }, 'Atrás'),
            createElement('button', { onClick: () => onConfirm({ text: selectedTask, importance, time: time || null }), className: "w-full py-3 bg-teal-600 text-white rounded-lg" }, 'Añadir Tarea')
          )
        );

    return createElement('div', { className: "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4", onClick: onClose },
      createElement('div', { className: "bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col", onClick: e => e.stopPropagation() },
        createElement('header', { className: 'flex items-center justify-between p-4 border-b border-slate-700' },
          createElement('h2', { className: 'text-xl font-semibold text-slate-100' }, selectedTask ? 'Configurar Tarea' : 'Elige una Tarea'),
          createElement('button', { onClick: onClose, className: 'p-2 rounded-full text-slate-400 hover:bg-slate-700' }, createElement(XIcon, { className: 'w-6 h-6' }))
        ),
        mainContent,
        createElement(TimeSelector, { isOpen: isTimeSelectorOpen, onClose: () => setIsTimeSelectorOpen(false), onTimeSelect: (t) => { setTime(t); setIsTimeSelectorOpen(false); }, initialTime: time })
      )
    );
  };
  
  // ========== APP COMPONENT ==========
  const App = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [isFocusTimerOpen, setIsFocusTimerOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [installPrompt, setInstallPrompt] = useState(null);

    const predefinedTasks = [
      'Leer un capítulo de un libro', 'Hacer 15 minutos de ejercicio',
      'Meditar por 5 minutos', 'Organizar el escritorio', 'Salir a correr',
      'Llamar a un amigo o familiar', 'Beber un vaso de agua', 'Planificar el día de mañana'
    ];

    useEffect(() => {
      const handleInstallPrompt = e => { e.preventDefault(); setInstallPrompt(e); };
      window.addEventListener('beforeinstallprompt', handleInstallPrompt);
      return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    }, []);

    useEffect(() => {
      const fetchTasks = async () => {
        setLoading(true); setFetchError(null);
        const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: true });
        if (error) setFetchError(`No se pudieron cargar las tareas. Causa: ${error.message}`);
        else setTasks(data || []);
        setLoading(false);
      };
      fetchTasks();
    }, []);

    const handleAddTask = useCallback(async ({ text, importance, time }) => {
      if (text.trim() && !tasks.some(t => t.text === text.trim())) {
        const { data, error } = await supabase.from('tasks').insert([{ text: text.trim(), importance, time, completed: false }]).select();
        if (!error && data) setTasks(prev => [...prev, data[0]]);
      }
      setIsModalOpen(false);
    }, [tasks]);

    const handleToggleTask = useCallback(async id => {
      const task = tasks.find(t => t.id === id);
      if (!task) return;
      if (!task.completed) { setShowCelebration(true); setTimeout(() => setShowCelebration(false), 3000); }
      const { data, error } = await supabase.from('tasks').update({ completed: !task.completed }).eq('id', id).select();
      if (!error && data) setTasks(prev => prev.map(t => (t.id === id ? data[0] : t)));
    }, [tasks]);

    const handleDeleteTask = useCallback(async id => {
      const { error } = await supabase.from('tasks').delete().eq('id', id);
      if (!error) setTasks(prev => prev.filter(t => t.id !== id));
    }, []);

    const handleSetImportance = useCallback(async (id, importance) => {
      const { data, error } = await supabase.from('tasks').update({ importance }).eq('id', id).select();
      if (!error && data) setTasks(prev => prev.map(t => (t.id === id ? data[0] : t)));
    }, []);
    
    const handleSetTime = useCallback(async (id, time) => {
      const { data, error } = await supabase.from('tasks').update({ time: time || null }).eq('id', id).select();
      if (!error && data) setTasks(prev => prev.map(t => (t.id === id ? data[0] : t)));
    }, []);

    const handleInstallClick = async () => {
        if (!installPrompt) return;
        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        if (outcome === 'accepted') setInstallPrompt(null);
    };

    let mainContent;
    if (loading) mainContent = createElement('div', { className: "min-h-[20rem] flex flex-col items-center justify-center p-8" }, createElement(LoadingSpinner), createElement('p', { className: 'mt-4 text-slate-300' }, 'Conectando...'));
    else if (fetchError) mainContent = createElement('div', { className: "min-h-[20rem] flex flex-col items-center justify-center text-center p-8 text-red-400" }, createElement('h2', { className: "text-xl font-semibold text-red-300 mb-2" }, '¡Ups! Algo salió mal'), createElement('p', { className: 'text-sm' }, fetchError));
    else if (tasks.length > 0) mainContent = createElement('div', { className: "p-4 space-y-4" }, tasks.map(task => createElement(TaskItem, { key: task.id, task, onToggle: handleToggleTask, onDelete: handleDeleteTask, onSetImportance: handleSetImportance, onSetTime: handleSetTime })));
    else mainContent = createElement('div', { className: "min-h-[20rem] flex flex-col items-center justify-center text-center p-8 text-slate-400" }, createElement(SparklesIcon, { className: 'w-16 h-16 mb-4 opacity-30' }), createElement('h2', { className: "text-xl font-semibold text-slate-300" }, '¡Todo despejado!'), createElement('p', null, 'Pulsa "Añadir Tarea" para empezar.'));

    return createElement('div', { className: "min-h-screen w-full bg-slate-900 text-white flex flex-col" },
      createElement('header', { className: 'relative w-full py-3 px-6 text-center bg-gradient-to-r from-blue-900 to-cyan-800 shadow-lg header-shimmer' },
        createElement('h1', { className: 'text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300' }, 'Enfoke')
      ),
      createElement('main', { className: 'w-full max-w-2xl mx-auto flex flex-col h-full flex-grow px-4 sm:px-6 pt-6' },
        installPrompt && createElement('div', { className: 'mb-4' },
          createElement('button', { onClick: handleInstallClick, className: 'w-full flex items-center justify-center gap-3 py-3 text-lg bg-teal-600/80 border-2 border-teal-500 rounded-full' }, createElement(InstallIcon, { className: 'w-6 h-6' }), createElement('span', null, 'Instalar App'))
        ),
        createElement('div', { className: 'mb-4' },
          createElement('button', { onClick: () => setIsModalOpen(true), className: 'cta-button-glow w-full flex items-center justify-center gap-2 py-4 text-lg bg-slate-800/50 border-2 border-slate-700 rounded-full text-slate-300 hover:border-teal-500' }, createElement(PlusIcon, { className: 'w-6 h-6' }), createElement('span', null, 'Añadir Tarea'))
        ),
        createElement('div', { className: 'bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-6' }, mainContent)
      ),
      createElement(SuggestedTasksModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onConfirm: handleAddTask, suggestions: predefinedTasks }),
      createElement(CelebrationAnimation, { show: showCelebration }),
      // FocusTimer no está implementado en esta versión para mantener la simplicidad. Se puede añadir más tarde.
      createElement('button', { className: 'fixed bottom-6 left-1/2 -translate-x-1/2 w-20 h-20 bg-slate-800 border-2 border-cyan-400/50 rounded-full shadow-lg flex items-center justify-center' }, createElement(BrainIcon, { className: 'w-11 h-11 text-cyan-300' }))
    );
  };
  
  // ========== RENDER APP ==========
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(createElement(App));
  } else {
    console.error('Root element #root not found in the document.');
  }

})();