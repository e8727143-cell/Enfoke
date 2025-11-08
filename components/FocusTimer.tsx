import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FocusTreeIcon, XIcon } from './Icons';

interface FocusTimerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MIN_DURATION = 60; // 1 minuto
const MAX_DURATION = 4 * 3600; // 4 horas
const DRAG_SENSITIVITY = 2; // Píxeles de arrastre por cada minuto

interface Sound {
    name: string;
    emoji: string;
    file: string;
}

const supabaseUrl = 'https://diksvhkjuexnyoqlrbjz.supabase.co';
const audioBucket = 'audio_assets';
const completionSoundUrl = `${supabaseUrl}/storage/v1/object/public/${audioBucket}/end_timer.mp3`;


const relaxingSounds: Sound[] = [
  { name: 'Lluvia suave', emoji: '☔', file: `${supabaseUrl}/storage/v1/object/public/${audioBucket}/light-rain.mp3` },
  { name: 'Café tranquilo', emoji: '☕', file: `${supabaseUrl}/storage/v1/object/public/${audioBucket}/cafe-ambience.mp3` },
  { name: 'Bosque', emoji: '🌲', file: `${supabaseUrl}/storage/v1/object/public/${audioBucket}/forest.mp3` },
  { name: 'Olas del mar', emoji: '🌊', file: `${supabaseUrl}/storage/v1/object/public/${audioBucket}/waves.mp3` },
  { name: 'Fuego crepitando', emoji: '🔥', file: `${supabaseUrl}/storage/v1/object/public/${audioBucket}/fireplace.mp3` },
  { name: 'Noche con grillos', emoji: '🌌', file: `${supabaseUrl}/storage/v1/object/public/${audioBucket}/night-ambience.mp3` },
  { name: 'Agua en movimiento', emoji: '💧', file: `${supabaseUrl}/storage/v1/object/public/${audioBucket}/calm-river.mp3` },
  { name: 'Viento', emoji: '🍃', file: `${supabaseUrl}/storage/v1/object/public/${audioBucket}/wind.mp3` },
  { name: 'Lofi chill beats', emoji: '🎶', file: `${supabaseUrl}/storage/v1/object/public/${audioBucket}/lofi-chill.mp3` }
];

export const FocusTimer: React.FC<FocusTimerProps> = ({ isOpen, onClose }) => {
  const [screen, setScreen] = useState<'setup' | 'running'>('setup');
  const [selectedDuration, setSelectedDuration] = useState(25 * 60);
  const [timeRemaining, setTimeRemaining] = useState(selectedDuration);
  const [selectedSound, setSelectedSound] = useState<Sound | null>(null);

  // Refs for Web Audio API for perfect looping
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioBufferCache = useRef<Map<string, AudioBuffer>>(new Map());

  // Ref for preview audio (uses standard HTMLAudioElement)
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ y: number; duration: number } | null>(null);

  // Ensure AudioContext is available and resumed (required by browsers)
  const unlockAudio = useCallback(() => {
    if (!audioContextRef.current) {
        // @ts-ignore - for legacy browser support
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const stopPreview = useCallback(() => {
    if (previewAudioRef.current && !previewAudioRef.current.paused) {
        previewAudioRef.current.pause();
        previewAudioRef.current.currentTime = 0;
    }
  }, []);

  // Web Audio API playback logic for the main focus session
  useEffect(() => {
    const stopSound = () => {
        if (audioSourceRef.current) {
            audioSourceRef.current.stop();
            audioSourceRef.current.disconnect();
            audioSourceRef.current = null;
        }
    };
    
    const playSound = async (sound: Sound) => {
        const audioContext = unlockAudio();
        if (!audioContext) return;

        stopSound(); // Stop any previous sound

        try {
            let audioBuffer = audioBufferCache.current.get(sound.file);
            if (!audioBuffer) {
                const response = await fetch(sound.file);
                const arrayBuffer = await response.arrayBuffer();
                audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                audioBufferCache.current.set(sound.file, audioBuffer); // Cache the decoded audio
            }

            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.loop = true;
            source.connect(audioContext.destination);
            source.start(0);
            audioSourceRef.current = source;
        } catch (error) {
            console.error("Error with Web Audio API:", error);
        }
    };

    if (screen === 'running' && isOpen && selectedSound) {
        playSound(selectedSound);
    } else {
        stopSound();
    }

    // Cleanup function to stop sound on effect change or component unmount
    return stopSound;
  }, [screen, isOpen, selectedSound, unlockAudio]);


  // Effect to reset state when the timer is opened/closed
  useEffect(() => {
    if (isOpen) {
      setScreen('setup');
      setTimeRemaining(selectedDuration);
    } else {
      stopPreview();
      // The main audio stop is handled by the Web Audio useEffect
    }
  }, [isOpen, selectedDuration, stopPreview]);
  

  const handleStart = () => {
    unlockAudio();
    stopPreview();
    setTimeRemaining(selectedDuration);
    setScreen('running');
  };

  const handleStop = () => {
    setScreen('setup');
  };
  
  const handleSoundSelect = (sound: Sound) => {
    unlockAudio();

    if (!previewAudioRef.current) {
        previewAudioRef.current = new Audio();
    }
    const previewAudio = previewAudioRef.current;

    stopPreview();
    
    if (selectedSound?.file === sound.file) {
      setSelectedSound(null);
    } else {
      setSelectedSound(sound);
      previewAudio.src = sound.file;
      previewAudio.play().catch(e => console.error("Error al reproducir vista previa:", e));
    }
  };


  useEffect(() => {
    let timerId: number | null = null;
    if (screen === 'running' && timeRemaining > 0) {
      timerId = window.setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (screen === 'running' && timeRemaining <= 0) {
      // Reproducir sonido de finalización y luego cerrar.
      const completionAudio = new Audio(completionSoundUrl);
      completionAudio.play().catch(e => console.error("Error playing completion sound:", e));
      onClose();
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [screen, timeRemaining, onClose]);

  const formatTime = (totalSeconds: number) => {
    if (totalSeconds < 3600) {
      const minutes = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getAriaValueText = (totalSeconds: number) => {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      let text = '';
      if (hours > 0) text += `${hours} hora${hours > 1 ? 's' : ''} `;
      if (minutes > 0) text += `${minutes} minuto${minutes > 1 ? 's' : ''}`;
      return text.trim() || '1 minuto';
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!dragStartRef.current) return;
    
    const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = dragStartRef.current.y - currentY;
    
    const timeChangeInSeconds = Math.round(deltaY / DRAG_SENSITIVITY) * 60;
    let newDuration = dragStartRef.current.duration + timeChangeInSeconds;

    newDuration = Math.max(MIN_DURATION, Math.min(MAX_DURATION, newDuration));
    
    setSelectedDuration(newDuration);
    setTimeRemaining(newDuration);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    dragStartRef.current = null;
    window.removeEventListener('mousemove', handleDragMove);
    window.removeEventListener('touchmove', handleDragMove);
    window.removeEventListener('mouseup', handleDragEnd);
    window.removeEventListener('touchend', handleDragEnd);
  }, [handleDragMove]);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const startY = 'touches' in e.nativeEvent ? e.nativeEvent.touches[0].clientY : e.nativeEvent.clientY;
    dragStartRef.current = { y: startY, duration: selectedDuration };

    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('touchmove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);
  }, [selectedDuration, handleDragMove, handleDragEnd]);


  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = timeRemaining > 0 ? ((selectedDuration - timeRemaining) / selectedDuration) * circumference : 0;
  const strokeDashoffset = circumference - progress;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-lg flex flex-col z-50 animate-fade-in">
      <header className="relative w-full p-4 bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 flex items-center justify-center shadow-lg flex-shrink-0">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-green-400">
          Sesión de Enfoque
        </h1>
        {screen === 'setup' && (
          <button
            onClick={onClose}
            className="absolute top-1/2 -translate-y-1/2 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-700/50 transition-colors"
            aria-label="Cerrar"
          >
            <XIcon className="w-6 h-6" />
          </button>
        )}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 overflow-y-auto">
        {screen === 'setup' ? (
          <div className="flex flex-col items-center gap-6 text-white animate-scale-in w-full max-w-xs">
            <div className="w-full">
              <label className="block text-sm font-medium text-slate-400 mb-3 text-center">Elige un sonido relajante (opcional)</label>
              <div className="grid grid-cols-3 gap-2">
                {relaxingSounds.map(sound => (
                  <button
                    key={sound.name}
                    onClick={() => handleSoundSelect(sound)}
                    aria-pressed={selectedSound?.file === sound.file}
                    className={`
                      aspect-square p-1 rounded-lg flex flex-col items-center justify-center 
                      text-center transition-all duration-200
                      ${
                        selectedSound?.file === sound.file
                          ? 'bg-teal-500/30 text-white ring-2 ring-teal-400'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                      }
                    `}
                  >
                    <span className="text-3xl" aria-hidden="true">{sound.emoji}</span>
                    <span className="text-[10px] mt-1 leading-tight">{sound.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div 
              className="text-8xl font-thin tracking-tighter my-2 cursor-ns-resize select-none transition-colors hover:text-teal-400"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              role="slider"
              aria-label="Ajustar duración de enfoque"
              aria-valuemin={MIN_DURATION}
              aria-valuemax={MAX_DURATION}
              aria-valuenow={selectedDuration}
              aria-valuetext={getAriaValueText(selectedDuration)}
            >
              {formatTime(timeRemaining)}
            </div>
            <p className="text-slate-400 text-sm -mt-2">Arrastra para ajustar el tiempo</p>

            <button
              onClick={handleStart}
              className="w-24 h-24 mt-4 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 transition-transform active:scale-90 hover:scale-105"
              aria-label="Iniciar temporizador"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        ) : ( // screen === 'running'
          <div className="flex flex-col items-center gap-4 text-white animate-fade-in">
              <div className="relative w-80 h-80">
                  <svg className="w-full h-full" viewBox="0 0 260 260">
                      <circle cx="130" cy="130" r={radius} stroke="#334155" strokeWidth="10" fill="transparent" />
                      <circle
                          cx="130"
                          cy="130"
                          r={radius}
                          stroke="#84cc16"
                          strokeWidth="12"
                          fill="transparent"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1s linear' }}
                      />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center p-12 drop-shadow-lg">
                      <FocusTreeIcon className="w-full h-full" />
                  </div>
              </div>
              <div className="text-7xl font-thin tracking-tighter">
                  {formatTime(timeRemaining)}
              </div>
              {selectedSound && (
                  <div className="text-slate-400 text-sm bg-slate-800/50 px-3 py-1 rounded-full">
                      Reproduciendo: {selectedSound.name} {selectedSound.emoji}
                  </div>
              )}
              <button
                onClick={handleStop}
                className="mt-4 px-8 py-3 bg-red-500 rounded-full flex items-center justify-center gap-2 text-white text-lg font-semibold shadow-lg shadow-red-500/30 transition-transform active:scale-90 hover:scale-105"
                aria-label="Detener temporizador"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12"/></svg>
                <span>Detener</span>
              </button>
          </div>
        )}
      </main>
    </div>
  );
};