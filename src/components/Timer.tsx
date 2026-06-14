import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Clock, Plus, Minus } from 'lucide-react';
import { soundEffects } from './SoundEffects';

interface TimerProps {
  initialMinutes?: number;
}

export const Timer: React.FC<TimerProps> = ({ initialMinutes = 75 }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            soundEffects.playFanfare();
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          // Play tick-tock sounds safely on every second if checked.
          if (soundEnabled) {
            soundEffects.playTick(prev % 2 === 0);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, soundEnabled]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    soundEffects.playMagic();
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(initialMinutes * 60);
    soundEffects.playMagic();
  };

  const adjustTime = (minutes: number) => {
    setSecondsLeft((prev) => {
      const newVal = prev + minutes * 60;
      return newVal < 0 ? 0 : newVal;
    });
    soundEffects.playMagic();
  };

  const formatTime = () => {
    const hrs = Math.floor(secondsLeft / 3600);
    const mins = Math.floor((secondsLeft % 3600) / 60);
    const secs = secondsLeft % 60;

    const pad = (num: number) => String(num).padStart(2, '0');
    return `${hrs > 0 ? hrs + ':' : ''}${pad(mins)}:${pad(secs)}`;
  };

  // Calculate percentage for circular progress or clean visual representation
  const originalSeconds = initialMinutes * 60;
  const progressPercent = Math.min(100, (secondsLeft / originalSeconds) * 100);

  return (
    <div id="chrono-timer-card" className="bg-white border-[6px] border-[#3B82F6] rounded-[40px] p-6 shadow-2xl relative max-w-md mx-auto overflow-hidden">
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="text-[#3B82F6] w-6 h-6 animate-pulse" />
          <h3 className="font-sans font-black text-[#5C4033] uppercase tracking-wider text-sm">
            Reloj del Taller de Gepeto
          </h3>
        </div>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 rounded-full transition-colors ${soundEnabled ? 'bg-yellow-100 text-[#5C4033]' : 'bg-stone-200 text-stone-500'}`}
          title={soundEnabled ? 'Silenciar tic-tac' : 'Activar tic-tac'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      {/* Timer display */}
      <div className="flex flex-col items-center justify-center py-5 bg-[#FFF9E6] border-4 border-[#3B82F6] rounded-[30px] mb-5">
        <span className="font-mono text-5xl font-black tracking-widest text-[#5C4033] select-none drop-shadow-sm">
          {formatTime()}
        </span>
        <p className="text-xs font-sans text-stone-605 font-bold mt-1.5 uppercase">
          {secondsLeft === 0 ? '¡TIEMPO AGOTADO!' : 'Tiempo para salvar a Pinocho'}
        </p>

        {/* Progress bar inside */}
        <div className="w-4/5 bg-stone-200 h-3 rounded-full mt-3.5 overflow-hidden border-2 border-stone-300">
          <div
            className={`h-full transition-all duration-1000 ${
              progressPercent < 20 ? 'bg-[#EF4444] animate-pulse' : progressPercent < 50 ? 'bg-[#FBBF24]' : 'bg-[#10B981]'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Admin adjust controls (only if needed by teacher) */}
      <div className="flex items-center justify-center gap-1.5 mb-4">
        <button
          onClick={() => adjustTime(-5)}
          className="px-2 py-1 bg-yellow-105 hover:bg-yellow-200 text-yellow-900 border-2 border-yellow-300 rounded-lg text-xs font-sans flex items-center gap-1 font-black"
        >
          <Minus className="w-3 h-3" /> 5m
        </button>
        <button
          onClick={() => adjustTime(-1)}
          className="px-2 py-1 bg-yellow-105 hover:bg-yellow-200 text-yellow-900 border-2 border-yellow-300 rounded-lg text-xs font-sans flex items-center gap-1 font-black"
        >
          <Minus className="w-3 h-3" /> 1m
        </button>
        <span className="text-xs text-stone-400 font-black px-2 uppercase font-sans">Ajustar</span>
        <button
          onClick={() => adjustTime(1)}
          className="px-2 py-1 bg-yellow-105 hover:bg-yellow-200 text-yellow-900 border-2 border-yellow-300 rounded-lg text-xs font-sans flex items-center gap-1 font-black"
        >
          <Plus className="w-3 h-3" /> 1m
        </button>
        <button
          onClick={() => adjustTime(5)}
          className="px-2 py-1 bg-yellow-105 hover:bg-yellow-200 text-yellow-900 border-2 border-yellow-300 rounded-lg text-xs font-sans flex items-center gap-1 font-black"
        >
          <Plus className="w-3 h-3" /> 5m
        </button>
      </div>

      {/* Main Controls */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={resetTimer}
          className="p-3 bg-red-100 hover:bg-red-200 text-[#EF4444] rounded-full border-2 border-[#EF4444] transition-all"
          title="Reiniciar reloj"
        >
          <RotateCcw className="w-5 h-5 flex-shrink-0" />
        </button>

        <button
          onClick={toggleTimer}
          className={`flex items-center gap-2 px-8 py-3 rounded-full text-white font-black text-sm uppercase transition-all duration-150 ${
            isActive
              ? 'bg-[#EF4444] hover:bg-red-650 shadow-[0_5px_0_#DC2626] active:translate-y-1 active:shadow-none'
              : 'bg-[#10B981] hover:bg-green-650 shadow-[0_5px_0_#059669] active:translate-y-1 active:shadow-none'
          }`}
        >
          {isActive ? (
            <>
              <Pause className="w-5 h-5 fill-white" />
              <span>PAUSAR TIEMPO</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-white" />
              <span>COMENZAR RETO</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
