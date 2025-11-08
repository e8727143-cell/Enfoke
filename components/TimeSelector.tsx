import React, { useState, useEffect, useRef } from 'react';
import { XIcon } from './Icons';

interface TimeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeSelect: (time: string) => void;
  initialTime?: string;
}

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

export const TimeSelector: React.FC<TimeSelectorProps> = ({ isOpen, onClose, onTimeSelect, initialTime }) => {
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('00');

  const hourScrollerRef = useRef<HTMLDivElement>(null);
  const minuteScrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialTime) {
      const [h, m] = initialTime.split(':');
      setSelectedHour(h);
      const roundedMinute = String(Math.round(parseInt(m, 10) / 5) * 5).padStart(2, '0');
      setSelectedMinute(roundedMinute);
    } else {
      setSelectedHour('09');
      setSelectedMinute('00');
    }
  }, [initialTime, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const scrollToValue = (ref: React.RefObject<HTMLDivElement>, value: string, itemHeight: number, options: string[]) => {
        if (ref.current) {
          const index = options.indexOf(value);
          if (index > -1) {
            setTimeout(() => {
              if(ref.current) ref.current.scrollTop = index * itemHeight;
            }, 50);
          }
        }
      };
      
      const itemHeight = 48; // h-12 in Tailwind
      scrollToValue(hourScrollerRef, selectedHour, itemHeight, hours);
      scrollToValue(minuteScrollerRef, selectedMinute, itemHeight, minutes);
    }
  }, [isOpen, selectedHour, selectedMinute]);


  const handleConfirm = () => {
    onTimeSelect(`${selectedHour}:${selectedMinute}`);
  };
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>, type: 'hour' | 'minute') => {
      const target = e.currentTarget;
      const itemHeight = 48; // h-12
      const index = Math.round(target.scrollTop / itemHeight);
      
      if (type === 'hour') {
          if (hours[index] && hours[index] !== selectedHour) {
            setSelectedHour(hours[index]);
          }
      } else {
          if (minutes[index] && minutes[index] !== selectedMinute) {
            setSelectedMinute(minutes[index]);
          }
      }
  };


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="
          bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col
          border border-slate-700 animate-scale-in
        "
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-slate-100">Seleccionar Hora</h2>
          <button onClick={onClose} aria-label="Cerrar" className="p-2 rounded-full text-slate-400 hover:bg-slate-700 transition-colors">
            <XIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="relative flex justify-center items-center h-48 my-4 text-2xl text-slate-100 overflow-hidden">
            <div className="absolute inset-x-4 h-12 top-1/2 -translate-y-1/2 bg-teal-500/10 rounded-lg border border-teal-500/30 pointer-events-none"></div>

            <div 
              ref={hourScrollerRef} 
              onScroll={(e) => handleScroll(e, 'hour')}
              className="time-scroller w-1/2 h-full overflow-y-scroll scrollbar-hide"
            >
              <div className="h-[72px]" />
              {hours.map(hour => (
                <div key={hour} className={`flex items-center justify-center h-12 transition-all duration-150 ${selectedHour === hour ? 'text-teal-300 font-bold text-3xl' : 'text-slate-500'}`}>
                  {hour}
                </div>
              ))}
              <div className="h-[72px]" />
            </div>
            
            <div className="text-4xl font-thin text-slate-500 -mt-1 select-none">:</div>

            <div 
              ref={minuteScrollerRef}
              onScroll={(e) => handleScroll(e, 'minute')}
              className="time-scroller w-1/2 h-full overflow-y-scroll scrollbar-hide"
            >
              <div className="h-[72px]" />
              {minutes.map(minute => (
                <div key={minute} className={`flex items-center justify-center h-12 transition-all duration-150 ${selectedMinute === minute ? 'text-teal-300 font-bold text-3xl' : 'text-slate-500'}`}>
                  {minute}
                </div>
              ))}
              <div className="h-[72px]" />
            </div>
        </div>

        <div className="p-4 border-t border-slate-700">
          <button onClick={handleConfirm} className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-500 transition-colors shadow-lg shadow-teal-900/50 active:scale-95">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};