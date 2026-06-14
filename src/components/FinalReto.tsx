import React, { useState } from 'react';
import { soundEffects } from './SoundEffects';
import { Sparkles, Key, RotateCcw, ArrowRight, Award } from 'lucide-react';
import { GENERAL_RETO_FINAL } from './StationsData';

interface FinalRetoProps {
  onGoToPrint: () => void;
}

export const FinalReto: React.FC<FinalRetoProps> = ({ onGoToPrint }) => {
  const [selectedWords, setSelectedWords] = useState<string[]>(['', '', '', '']);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasTried, setHasTried] = useState(false);

  const wordOptions = ['SINCERIDAD', 'AMISTAD', 'BONDAD', 'ESFUERZO'];

  const handleSelectWord = (slotIdx: number, word: string) => {
    soundEffects.playMagic();
    const copy = [...selectedWords];
    copy[slotIdx] = word;
    setSelectedWords(copy);
    setHasTried(false);
  };

  const handleUnlockChest = () => {
    // Correct sequence is: SINCERIDAD, ESFUERZO, BONDAD, AMISTAD
    const isCorrect = 
      selectedWords[0] === 'SINCERIDAD' &&
      selectedWords[1] === 'ESFUERZO' &&
      selectedWords[2] === 'BONDAD' &&
      selectedWords[3] === 'AMISTAD';

    if (isCorrect) {
      soundEffects.playFanfare();
      soundEffects.playMagic();
      setIsUnlocked(true);
    } else {
      soundEffects.playError();
      setHasTried(true);
    }
  };

  const handleReset = () => {
    setSelectedWords(['', '', '', '']);
    setIsUnlocked(false);
    setHasTried(false);
    soundEffects.playMagic();
  };

  return (
    <div className="bg-white rounded-[40px] border-8 border-[#3B82F6] p-8 shadow-2xl overflow-hidden text-center max-w-4xl mx-auto font-sans text-[#5C4033]">
      
      {!isUnlocked ? (
        <div>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-16 h-16 bg-yellow-400 border-4 border-[#3B82F6] rounded-full flex items-center justify-center text-3xl shadow-lg animate-bounce mb-3">
              🗝️
            </div>
            
            <h2 className="font-sans font-black text-[#3B82F6] text-2xl uppercase tracking-wider">
              El Cofre Encantado del Hada Azul
            </h2>
            <p className="text-xs text-stone-605 max-w-lg mx-auto font-sans mt-2 font-bold">
              {GENERAL_RETO_FINAL.description}
            </p>
          </div>

          <div className="bg-[#FFF9E6] border-4 border-yellow-400 p-5 rounded-[24px] text-stone-850 text-xs font-black my-5 italic font-sans max-w-lg mx-auto leading-relaxed">
            "{GENERAL_RETO_FINAL.puzzleInstruction}"
          </div>

          {/* Slots representation */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-2xl mx-auto my-6 font-sans">
            {selectedWords.map((word, idx) => (
              <div key={idx} className="bg-stone-50 border-4 border-stone-200 p-4 rounded-[24px] flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-black text-stone-400 tracking-wider mb-2.5 uppercase block">
                  Ranura Llave {idx + 1}
                </span>

                <select
                  value={word}
                  onChange={(e) => handleSelectWord(idx, e.target.value)}
                  className="w-full bg-white border-2 border-stone-300 font-sans font-extrabold text-xs p-2 rounded-xl text-slate-800 focus:border-[#3B82F6] focus:outline-none"
                >
                  <option value="">-- Elige --</option>
                  {wordOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      🔑 {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {hasTried && !isUnlocked && (
            <div className="text-xs font-black uppercase text-red-900 bg-red-50 border-4 border-[#EF4444] p-3 rounded-2xl max-w-md mx-auto mb-5 font-sans flex items-center justify-center gap-1.5">
              ⚠️ Las llaves no están en el orden correcto de las virtudes. ¡Prueba otra combinación!
            </div>
          )}

          {/* Control Triggers */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-white hover:bg-yellow-50 border-4 border-[#EF4444] text-[#EF4444] rounded-xl text-xs font-black uppercase shadow-[0_4px_0_#DC2626] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Reiniciar
            </button>
            
            <button
              onClick={handleUnlockChest}
              className="flex items-center gap-1.5 px-8 py-3.5 bg-[#10B981] hover:bg-green-650 text-white font-black text-xs uppercase rounded-full shadow-[0_5px_0_#059669] active:translate-y-0.5 active:shadow-none transition-all"
            >
              <Sparkles className="w-4 h-4 fill-white animate-spin" />
              COMPROBAR COFRE
            </button>
          </div>
        </div>
      ) : (
        /* SUCCESS SCENE - Pinocchio transforms into real boy! Beautiful digital visualization */
        <div className="py-6 space-y-6">
          <div className="relative inline-block animate-pulse">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-blue-500 to-indigo-500 rounded-full blur opacity-75"></div>
            <div className="relative bg-white p-6 rounded-full border-4 border-amber-500 text-5xl">
              👦✨💖
            </div>
          </div>

          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold py-1 px-4 rounded-full uppercase tracking-widest font-sans">
              ¡TRANSFORMACIÓN COMPLETADA!
            </span>
            
            <h2 className="font-sans font-extrabold text-stone-900 text-2xl tracking-tight">
              ¡Pinocho se ha convertido en un niño de verdad!
            </h2>
            
            <p className="text-xs text-stone-650 leading-relaxed font-sans">
              {GENERAL_RETO_FINAL.fairyBlessing}
            </p>
          </div>

          {/* Magical Scroll with final motto */}
          <div className="relative py-8 px-6 border-8 border-double border-yellow-400 bg-gradient-to-br from-yellow-50 to-[#FFF9E6]/35 rounded-[30px] max-w-2xl mx-auto shadow-inner my-6">
            <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#3B82F6] text-white px-5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase font-sans">
              📜 COMPROMISO DE HONOR DE PINOCHO 📜
            </span>
            
            <p className="text-sm font-extrabold font-sans text-amber-950 leading-relaxed italic pt-4">
              {GENERAL_RETO_FINAL.magicPhrasePattern}
            </p>

            <p className="text-xs text-amber-800 mt-4 font-bold uppercase tracking-wider font-sans">
              "La sinceridad, el esfuerzo y la bondad ayudan a convertirse en una mejor persona."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-white hover:bg-yellow-50 border-4 border-stone-400 text-stone-605 rounded-xl text-xs font-black uppercase shadow-[0_4px_0_#A8A29E] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
            >
              Comenzar de nuevo
            </button>
            <button
              onClick={onGoToPrint}
              className="flex items-center gap-2 px-8 py-3.5 bg-[#3B82F6] hover:bg-blue-650 text-white font-black text-xs uppercase rounded-full shadow-[0_5px_0_#1D4ED8] active:translate-y-0.5 active:shadow-none transition-all"
            >
              <Award className="w-4 h-4 fill-white animate-bounce" />
              <span>IR A PERSONALIZAR E IMPRIMIR DIPLOMAS</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
