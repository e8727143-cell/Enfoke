import React, { useState, useCallback, useEffect } from 'react';
import { Task } from './types.ts';
import { TaskItem } from './components/TaskItem.tsx';
import { PlusIcon, BrainIcon, SparklesIcon, InstallIcon } from './components/Icons.tsx';
import { SuggestedTasksModal } from './components/SuggestedTasksModal.tsx';
import { CelebrationAnimation } from './components/CelebrationAnimation.tsx';
import { FocusTimer } from './components/FocusTimer.tsx';
import { supabase } from './lib/supabase.ts';

const predefinedTasks = [
    'Leer un capítulo de un libro',
    'Hacer 15 minutos de ejercicio',
    'Meditar por 5 minutos',
    'Organizar el escritorio',
    'Salir a correr',
    'Llamar a un amigo o familiar',
    'Beber un vaso de agua',
    'Planificar el día de mañana'
];

const LoadingSpinner = () => (
    <svg className="animate-spin h-10 w-10 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isFocusTimerOpen, setIsFocusTimerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handleInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setFetchError(null);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching tasks:', error.message);
        setFetchError(`No se pudieron cargar las tareas. Causa: ${error.message}`);
      } else {
        setTasks(data || []);
      }
      setLoading(false);
    };

    fetchTasks();
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      return;
    }
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    setInstallPrompt(null);
  };

  const handleAddTask = useCallback(async (taskDetails: { text: string; importance: Task['importance']; time: Task['time'] }) => {
    const { text, importance, time } = taskDetails;
    const trimmedText = text.trim();
    
    if (trimmedText) {
      if (tasks.some(task => task.text === trimmedText)) {
          setIsModalOpen(false);
          return;
      }
      
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ text: trimmedText, importance, time: time || null, completed: false }])
        .select();

      if (error) {
        console.error('Error adding task:', error.message);
      } else if(data) {
        setTasks(prevTasks => [...prevTasks, data[0]]);
      }
      setIsModalOpen(false);
    }
  }, [tasks]);

  const handleToggleTask = useCallback(async (id: number) => {
    const taskToToggle = tasks.find(task => task.id === id);
    if (!taskToToggle) return;

    if (!taskToToggle.completed) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }

    const { data, error } = await supabase
      .from('tasks')
      .update({ completed: !taskToToggle.completed })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error toggling task:', error.message);
    } else if (data) {
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === id ? data[0] : task))
      );
    }
  }, [tasks]);

  const handleDeleteTask = useCallback(async (id: number) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting task:', error.message);
    } else {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }
  }, []);

  const handleSetImportance = useCallback(async (id: number, importance: 'normal' | 'important' | 'urgent') => {
    const { data, error } = await supabase
      .from('tasks')
      .update({ importance })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error setting importance:', error.message);
    } else if (data) {
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === id ? data[0] : task))
      );
    }
  }, []);
  
  const handleSetTime = useCallback(async (id: number, time: string | undefined) => {
    const { data, error } = await supabase
      .from('tasks')
      .update({ time: time || null })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error setting time:', error.message);
    } else if (data) {
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === id ? data[0] : task))
      );
    }
  }, []);


  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex flex-col">
       <header className="relative w-full py-3 px-6 text-center bg-gradient-to-r from-blue-900 to-cyan-800 shadow-lg overflow-hidden header-shimmer">
         <div className="flex items-center justify-center gap-3 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 drop-shadow-md">
               Enfoke
            </h1>
         </div>
      </header>
      
      <main className="w-full max-w-2xl mx-auto flex flex-col h-full flex-grow px-4 sm:px-6 pt-6">
        
        {installPrompt && (
          <div className="mb-4">
            <button
              onClick={handleInstallClick}
              aria-label="Instalar la aplicación"
              className="w-full flex items-center justify-center gap-3 py-3 text-lg bg-teal-600/80 border-2 border-teal-500 rounded-full text-white hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 active:scale-95 shadow-lg shadow-teal-900/50"
            >
              <InstallIcon className="w-6 h-6" />
              <span>Instalar App</span>
            </button>
          </div>
        )}

        <div className="mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            aria-label="Añadir una nueva tarea"
            className="
              cta-button-glow
              w-full flex items-center justify-center gap-2 py-4 text-lg bg-slate-800/50 border-2 border-slate-700 
              rounded-full text-slate-300
              hover:border-teal-500 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
              transition-all duration-300 active:scale-95
            "
          >
            <PlusIcon className="w-6 h-6" />
            <span>Añadir Tarea</span>
          </button>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-6">
            {loading ? (
                <div className="min-h-[20rem] flex flex-col items-center justify-center text-center p-8 text-slate-400">
                    <LoadingSpinner />
                    <p className="mt-4 text-slate-300">Conectando con la base de datos...</p>
                </div>
            ) : fetchError ? (
                <div className="min-h-[20rem] flex flex-col items-center justify-center text-center p-8 text-red-400">
                     <h2 className="text-xl font-semibold text-red-300 mb-2">¡Ups! Algo salió mal</h2>
                     <p className="text-sm max-w-md">{fetchError}</p>
                     <p className="text-xs mt-4 text-slate-500">Asegúrate de que la tabla `tasks` existe y las políticas RLS están bien configuradas en Supabase.</p>
                </div>
            ) : tasks.length > 0 ? (
                <div className="p-4 space-y-4">
                    {tasks.map(task => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onToggle={handleToggleTask}
                          onDelete={handleDeleteTask}
                          onSetImportance={handleSetImportance}
                          onSetTime={handleSetTime}
                        />
                    ))}
                </div>
            ) : (
                <div className="min-h-[20rem] flex flex-col items-center justify-center text-center p-8 text-slate-400">
                    <SparklesIcon className="w-16 h-16 mb-4 opacity-30" />
                    <h2 className="text-xl font-semibold text-slate-300">¡Todo despejado!</h2>
                    <p>Pulsa "Añadir Tarea" para elegir tu primer desafío.</p>
                </div>
            )}
        </div>
      </main>

      <SuggestedTasksModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddTask}
        suggestions={predefinedTasks}
      />
      
      <CelebrationAnimation show={showCelebration} />
      
      <FocusTimer isOpen={isFocusTimerOpen} onClose={() => setIsFocusTimerOpen(false)} />

      <button
        onClick={() => setIsFocusTimerOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-20 h-20 bg-slate-800 border-2 border-cyan-400/50 rounded-full shadow-lg shadow-cyan-500/30 flex items-center justify-center transition-all duration-300 active:scale-90 hover:scale-105 hover:border-cyan-400 group"
        aria-label="Abrir temporizador de enfoque"
      >
        <BrainIcon className="w-11 h-11 text-cyan-300 transition-transform group-hover:scale-110" />
      </button>
    </div>
  );
}