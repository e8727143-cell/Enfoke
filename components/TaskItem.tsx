import React, { useState } from 'react';
import { Task } from '../types';
import { TrashIcon, RunningIcon, CheckIcon, ClockIcon } from './Icons';
import { TimeSelector } from './TimeSelector';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSetImportance: (id: number, importance: 'normal' | 'important' | 'urgent') => void;
  onSetTime: (id: number, time: string | undefined) => void;
}

const importanceClasses = {
  normal: 'bg-transparent',
  important: 'bg-yellow-500',
  urgent: 'bg-red-500',
};

const importanceSequence: ('normal' | 'important' | 'urgent')[] = ['normal', 'important', 'urgent'];

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onSetImportance, onSetTime }) => {
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState(false);
  
  const glowClass = task.completed ? 'task-item-completed' : '';

  const handleImportanceClick = () => {
    const currentIndex = importanceSequence.indexOf(task.importance || 'normal');
    const nextIndex = (currentIndex + 1) % importanceSequence.length;
    onSetImportance(task.id, importanceSequence[nextIndex]);
  };
  
  const handleTimeSelect = (time: string) => {
    onSetTime(task.id, time);
    setIsTimeSelectorOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={handleImportanceClick}
          className={`w-1.5 h-16 rounded-full transition-all duration-300 ${importanceClasses[task.importance || 'normal']}`}
          aria-label={`Cambiar importancia. Actual: ${task.importance || 'normal'}`}
        />
        <div className="flex-grow flex flex-col">
          {!task.completed && task.importance !== 'normal' && (
            <span className={`text-xs font-bold uppercase tracking-wider mb-1 ml-4 self-start ${task.importance === 'urgent' ? 'text-red-400/80' : 'text-yellow-400/80'}`}>
              {task.importance === 'urgent' ? 'Urgente' : 'Importante'}
            </span>
          )}
          <div 
            className={`
              relative flex items-center p-4 bg-white/10 rounded-xl shadow-lg backdrop-blur-sm group 
              transition-all duration-300 hover:bg-white/20 overflow-hidden
              ${task.completed ? 'bg-green-500/10' : ''}
              ${glowClass}
            `}
          >
            <button
              onClick={() => onToggle(task.id)}
              className={`
                flex-shrink-0 h-7 w-7 border-2 rounded-full cursor-pointer
                flex items-center justify-center transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900/50 
                ${task.completed 
                  ? 'bg-green-500 border-green-400' 
                  : 'border-cyan-400 hover:border-cyan-300'}
              `}
              aria-pressed={task.completed}
              aria-label={task.completed ? `Marcar como pendiente: ${task.text}` : `Completar tarea: ${task.text}`}
            >
              {task.completed && <CheckIcon className="h-4 w-4 text-white" />}
            </button>

            <div className="ml-4 flex items-center gap-3 min-w-0 flex-grow">
              {task.text === 'Salir a correr' && <RunningIcon className={`h-6 w-6 flex-shrink-0 transition-opacity duration-300 ${task.completed ? 'opacity-60' : ''}`} />}
              <div className="flex-grow min-w-0">
                  <span
                      className={`
                      text-lg text-slate-100 transition-all duration-300 block truncate
                      ${task.completed ? 'line-through text-slate-400' : ''}
                      `}
                  >
                      {task.text}
                  </span>
                  {task.time && (
                      <span className="text-sm text-cyan-400/80 font-semibold">{task.time}</span>
                  )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => setIsTimeSelectorOpen(true)}
                className="text-slate-500 hover:text-cyan-400 transition-colors"
                aria-label="Añadir o editar hora"
              >
                <ClockIcon className="h-5 w-5" />
              </button>

              <button
                onClick={() => onDelete(task.id)}
                className="text-slate-500 hover:text-red-400 transition-colors"
                aria-label={`Eliminar tarea: ${task.text}`}
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <TimeSelector 
        isOpen={isTimeSelectorOpen}
        onClose={() => setIsTimeSelectorOpen(false)}
        onTimeSelect={handleTimeSelect}
        initialTime={task.time ?? undefined}
      />
    </>
  );
};
