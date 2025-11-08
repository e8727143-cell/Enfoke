import React, { useState, useEffect } from 'react';
import { XIcon, RunningIcon, ClockIcon } from './Icons.tsx';
import { Task } from '../types.ts';
import { TimeSelector } from './TimeSelector.tsx';

interface SuggestedTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (taskDetails: { text: string; importance: Task['importance']; time: Task['time'] }) => void;
  suggestions: string[];
}

const TaskSuggestionItem: React.FC<{ text: string; onClick: () => void }> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="
      w-full flex items-center gap-4 text-left p-4 bg-slate-700/50 rounded-lg 
      hover:bg-teal-500/30 transition-all duration-200 text-slate-100
      focus:outline-none focus:ring-2 focus:ring-teal-400
    "
  >
    {text === 'Salir a correr' && <RunningIcon className="h-6 w-6 text-cyan-400 flex-shrink-0" />}
    <span className="text-lg">{text}</span>
  </button>
);

const importanceStyles = {
    normal: 'border-slate-600 text-slate-300',
    important: 'border-yellow-500 text-yellow-300',
    urgent: 'border-red-500 text-red-300'
}

export const SuggestedTasksModal: React.FC<SuggestedTasksModalProps> = ({ isOpen, onClose, onConfirm, suggestions }) => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [importance, setImportance] = useState<Task['importance']>('normal');
  const [time, setTime] = useState('');
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Retrasa el reseteo para permitir la animación de salida
      setTimeout(() => {
        setSelectedTask(null);
        setImportance('normal');
        setTime('');
      }, 300);
    }
  }, [isOpen]);

  const handleTimeSelect = (selectedTime: string) => {
    setTime(selectedTime);
    setIsTimeSelectorOpen(false);
  };

  const handleConfirmClick = () => {
    if (selectedTask) {
      onConfirm({
        text: selectedTask,
        importance,
        time: time || undefined,
      });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="
            bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col
            border border-slate-700 transition-all duration-300
          "
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
            <h2 className="text-xl font-semibold text-slate-100 truncate pr-4">
              {selectedTask ? `Configurar Tarea` : 'Elige una Tarea'}
            </h2>
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="p-2 rounded-full text-slate-400 hover:bg-slate-700 transition-colors"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </header>

          {!selectedTask ? (
            <div className="p-4 overflow-y-auto space-y-3">
              {suggestions.map((text) => (
                <TaskSuggestionItem
                  key={text}
                  text={text}
                  onClick={() => setSelectedTask(text)}
                />
              ))}
            </div>
          ) : (
            <div className="p-6 overflow-y-auto flex flex-col gap-6">
              <p className="text-lg text-center text-slate-300 bg-slate-700/50 p-3 rounded-lg">{selectedTask}</p>
              
              <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Importancia</label>
                  <div className="grid grid-cols-3 gap-3">
                      {(['normal', 'important', 'urgent'] as const).map((level) => (
                          <button key={level} onClick={() => setImportance(level)} className={`p-3 rounded-lg border-2 font-semibold transition-all ${importance === level ? importanceStyles[level] + ' bg-white/10' : 'border-transparent bg-slate-700/50 text-slate-400 hover:bg-slate-700'}`}>
                              {level.charAt(0).toUpperCase() + level.slice(1)}
                          </button>
                      ))}
                  </div>
              </div>

              <div>
                   <label className="block text-sm font-medium text-slate-400 mb-2">Hora (Opcional)</label>
                   <button
                      onClick={() => setIsTimeSelectorOpen(true)}
                      className="w-full bg-slate-900/80 text-white rounded-md px-3 py-2 text-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center justify-between"
                  >
                      <span className={time ? 'text-white' : 'text-slate-500'}>{time || 'Definir hora'}</span>
                      <ClockIcon className="w-5 h-5 text-slate-400" />
                  </button>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
                  <button onClick={() => setSelectedTask(null)} className="w-full py-3 bg-slate-700 text-slate-300 rounded-lg font-semibold hover:bg-slate-600 transition-colors">Atrás</button>
                  <button onClick={handleConfirmClick} className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-500 transition-colors shadow-lg shadow-teal-900/50">Añadir Tarea</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <TimeSelector
        isOpen={isTimeSelectorOpen}
        onClose={() => setIsTimeSelectorOpen(false)}
        onTimeSelect={handleTimeSelect}
        initialTime={time}
      />
    </>
  );
};