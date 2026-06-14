import React, { useState, useEffect } from 'react';
import { Team, Station, TeamId } from '../types';
import { soundEffects } from './SoundEffects';
import { ArrowLeft, ArrowRight, Check, AlertCircle, Key, RefreshCw, Star, Info } from 'lucide-react';
import { STATIONS_DATA } from './StationsData';

interface StationsProps {
  activeStationIndex: number;
  selectedTeam: Team;
  onPrevStation: () => void;
  onNextStation: () => void;
  onKeyUnlocked: (stationId: 'station1' | 'station2' | 'station3' | 'station4', isUnlocked: boolean) => void;
}

export const Stations: React.FC<StationsProps> = ({
  activeStationIndex,
  selectedTeam,
  onPrevStation,
  onNextStation,
  onKeyUnlocked,
}) => {
  const station = STATIONS_DATA[activeStationIndex];
  
  // Game state resets for Station 1: Clocks & Patterns
  const [st1Clocks, setSt1Clocks] = useState({ clock1: '12:00', clock2: '12:00', clock3: '12:00' });
  const [st1PatternChoice, setSt1PatternChoice] = useState<string | null>(null);

  // Game state for Station 2: Math
  const [st2Sum1, setSt2Sum1] = useState('');
  const [st2Sum2, setSt2Sum2] = useState('');
  const [st2Sub1, setSt2Sub1] = useState('');
  const [st2Problem, setSt2Problem] = useState('');

  // Game state for Station 3: Grammar
  const [st3Gender, setSt3Gender] = useState<{ [key: string]: 'masc' | 'fem' | null }>({
    Gepeto: null,
    Hada: null,
    Grillo: null,
    Marioneta: null,
  });
  const [st3Plurals, setSt3Plurals] = useState({ relic: '', children: '', star: '' });
  const [st3Caps, setSt3Caps] = useState<{ [key: string]: boolean }>({
    gepeto: false,
    Pinocho: false,
    manzana: false,
    madrina: false,
    Pepito: false,
  });

  // Game state for Station 4: Whale & Coins
  const [st4Q1, setSt4Q1] = useState<string | null>(null);
  const [st4Q2, setSt4Q2] = useState<string | null>(null);
  const [st4Coins, setSt4Coins] = useState<number[]>([]); // list of added cents, e.g. 200 (for 2€), 100, 50, 20, 10
  const [st4Scramble, setSt4Scramble] = useState<string[]>([]);

  // Dilemma state
  const [selectedDilemaIndex, setSelectedDilemaIndex] = useState<number | null>(null);

  // General correctness check
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isStationFullyCompleted, setIsStationFullyCompleted] = useState<boolean>(false);

  // Restart settings when changing station
  useEffect(() => {
    setShowFeedback(false);
    setIsStationFullyCompleted(false);
    setSelectedDilemaIndex(null);
  }, [activeStationIndex]);

  // Check answers helper
  const handleValidateStationAnswers = () => {
    let allPuzzlesCorrect = false;

    if (activeStationIndex === 0) {
      // Station 1: Clocks (8:00, 12:30, 5:00) and Pattern (Doll 🤖)
      const clocksRight = st1Clocks.clock1 === '08:00' && st1Clocks.clock2 === '12:30' && st1Clocks.clock3 === '05:00';
      const patternRight = st1PatternChoice === 'doll';
      allPuzzlesCorrect = clocksRight && patternRight;
    } 
    else if (activeStationIndex === 1) {
      // Station 2: Math (43+25=68, 28+15=43, 76-32=44, 15-6=9)
      allPuzzlesCorrect = 
        st2Sum1.trim() === '68' && 
        st2Sum2.trim() === '43' && 
        st2Sub1.trim() === '44' && 
        st2Problem.trim() === '9';
    } 
    else if (activeStationIndex === 2) {
      // Station 3: Grammar
      const genderRight = 
        st3Gender.Gepeto === 'masc' && 
        st3Gender.Grillo === 'masc' && 
        st3Gender.Hada === 'fem' && 
        st3Gender.Marioneta === 'fem';
      
      const pluralsRight = 
        st3Plurals.relic.trim().toLowerCase() === 'relojes' &&
        st3Plurals.children.trim().toLowerCase() === 'niños' &&
        st3Plurals.star.trim().toLowerCase() === 'estrellas';

      // Nombres propios: gepeto (no cap), Pinocho (correct cap), manzana (no cap), madrina (no cap), Pepito (correct cap)
      // So caps state should have selected: gepeto=false, Pinocho=true, manzana=false, madrina=false, Pepito=true
      const capsRight = 
        !st3Caps.gepeto && 
        st3Caps.Pinocho && 
        !st3Caps.manzana && 
        !st3Caps.madrina && 
        st3Caps.Pepito;

      allPuzzlesCorrect = genderRight && pluralsRight && capsRight;
    } 
    else if (activeStationIndex === 3) {
      // Station 4: Whale (Q1=gepeto, Q2=fuego, coins=3.50€ i.e. 350 cents)
      const qRight = st4Q1 === 'gt' && st4Q2 === 'fg';
      const coinsSum = st4Coins.reduce((sum, c) => sum + c, 0);
      const coinsRight = coinsSum === 350; // 3.50€
      allPuzzlesCorrect = qRight && coinsRight;
    }

    // Must also answer dilema correctly or at least have selected the honest moral choice
    const dilemaRight = selectedDilemaIndex !== null && station.dilema.options[selectedDilemaIndex].isCorrect;

    if (allPuzzlesCorrect && dilemaRight) {
      soundEffects.playCorrect();
      setIsStationFullyCompleted(true);
      onKeyUnlocked(station.id as any, true);
    } else {
      soundEffects.playError();
      setIsStationFullyCompleted(false);
    }
    setShowFeedback(true);
  };

  const currentCoinsTotal = st4Coins.reduce((sum, c) => sum + c, 0) / 100;

  let borderTheme = 'border-[#FBBF24]';
  let headerBgTheme = 'bg-[#3B82F6]';
  let textTheme = 'text-[#3B82F6]';
  let lightBgTheme = 'bg-[#FFF9E6] border-[#FBBF24]';

  if (activeStationIndex === 1) {
    borderTheme = 'border-[#EF4444]';
    headerBgTheme = 'bg-[#3B82F6]';
    textTheme = 'text-[#EF4444]';
    lightBgTheme = 'bg-red-50/50 border-[#EF4444]';
  } else if (activeStationIndex === 2) {
    borderTheme = 'border-[#10B981]';
    headerBgTheme = 'bg-[#10B981]';
    textTheme = 'text-[#10B981]';
    lightBgTheme = 'bg-green-50/50 border-[#10B981]';
  } else if (activeStationIndex === 3) {
    borderTheme = 'border-[#6366F1]';
    headerBgTheme = 'bg-[#6366F1]';
    textTheme = 'text-[#6366F1]';
    lightBgTheme = 'bg-indigo-50/50 border-[#6366F1]';
  }

  return (
    <div className={`bg-white rounded-[40px] border-8 shadow-2xl overflow-hidden font-sans ${borderTheme} text-[#5C4033]`}>
      
      {/* Whimsical Header describing current station with dynamic themes */}
      <div className={`text-white p-6 relative ${headerBgTheme} border-b-8 border-yellow-400`}>
        <div className="absolute top-0 right-0 p-4 opacity-15 text-5xl">🪵</div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] bg-yellow-400 text-slate-900 px-3 py-1 rounded-full font-black uppercase tracking-widest font-sans">
              Estación Activa • {selectedTeam.name}
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mt-1.5 font-sans">
              {station.name}
            </h2>
          </div>
          <span className="text-xs bg-white/20 px-4 py-1.5 rounded-full font-extrabold uppercase font-sans">
            Reto {activeStationIndex + 1} de 4
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="p-6">
        
        {/* Story Intro Text Bubble */}
        <div className={`p-5 rounded-3xl mb-6 border-4 ${lightBgTheme}`}>
          <h3 className="font-sans font-black text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Info className="w-4 h-4" />
            La Conciencia de Pepito dice:
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed font-sans font-medium">
            {station.storyRelation}
          </p>
        </div>

        {/* ========================================================= */}
        {/* PUZZLE CONTENT RENDERING POINT FOR THE 4 DYNAMIC STATIONS */}
        {/* ========================================================= */}
        <div className="border-4 border-stone-200 rounded-[30px] p-5 bg-stone-50 mb-6 font-sans">
          <h4 className="font-black text-stone-900 text-xs tracking-wide uppercase mb-4 pb-2 border-b-2 border-stone-200 flex items-center gap-1.5">
            🧩 Desafío Escolar en Pantalla
          </h4>

          {/* STATION 1 PUZZLES */}
          {activeStationIndex === 0 && (
            <div className="space-y-6">
              {/* Part A Clocks */}
              <div>
                <p className="text-xs font-extrabold text-stone-800 mb-2">
                  1. Ajusta la hora de los juguetes en los tres relojes digitales de Gepeto:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Clock unit 1 */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200 text-center flex flex-col items-center">
                    <span className="text-[10px] font-bold text-stone-400 uppercase">Hora de Despertar</span>
                    <span className="text-xs text-amber-700 font-extrabold mt-1">Sugerido: 8:00 (Ocho en punto)</span>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <select
                        value={st1Clocks.clock1}
                        onChange={(e) => setSt1Clocks({ ...st1Clocks, clock1: e.target.value })}
                        className="bg-stone-50 border border-stone-300 rounded p-1 text-sm font-bold font-mono"
                      >
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="08:00">08:00</option>
                        <option value="05:00">05:00</option>
                        <option value="05:30">05:30</option>
                      </select>
                    </div>
                  </div>

                  {/* Clock unit 2 */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200 text-center flex flex-col items-center">
                    <span className="text-[10px] font-bold text-stone-400 uppercase">Hora del Almuerzo</span>
                    <span className="text-xs text-amber-700 font-extrabold mt-1">Sugerido: 12:30 (Doce y media)</span>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <select
                        value={st1Clocks.clock2}
                        onChange={(e) => setSt1Clocks({ ...st1Clocks, clock2: e.target.value })}
                        className="bg-stone-50 border border-stone-300 rounded p-1 text-sm font-bold font-mono"
                      >
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="08:00">08:00</option>
                        <option value="05:00">05:00</option>
                        <option value="05:30">05:30</option>
                      </select>
                    </div>
                  </div>

                  {/* Clock unit 3 */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200 text-center flex flex-col items-center">
                    <span className="text-[10px] font-bold text-stone-400 uppercase">Hora de volver a casa</span>
                    <span className="text-xs text-amber-700 font-extrabold mt-1">Sugerido: 5:00 (Cinco en punto)</span>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <select
                        value={st1Clocks.clock3}
                        onChange={(e) => setSt1Clocks({ ...st1Clocks, clock3: e.target.value })}
                        className="bg-stone-50 border border-stone-300 rounded p-1 text-sm font-bold font-mono"
                      >
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="08:00">08:00</option>
                        <option value="05:00">05:00</option>
                        <option value="05:30">05:30</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Part B Pattern */}
              <div>
                <p className="text-xs font-extrabold text-stone-800 mb-2">
                  2. ¿Qué juguete debe seguir para completar la serie del taller de Gepeto?
                </p>

                <div className="flex flex-col items-center gap-4 bg-white p-4 rounded-xl border border-stone-200">
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xl">
                    <span className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 shadow-sm" title="Madera">🪵</span>
                    <span className="text-stone-400">→</span>
                    <span className="p-2.5 bg-indigo-50 rounded-lg border border-indigo-200 shadow-sm" title="Muñeco">🤖</span>
                    <span className="text-stone-400">→</span>
                    <span className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 shadow-sm" title="Madera">🪵</span>
                    <span className="text-stone-400">→</span>
                    <span className="p-2.5 bg-indigo-50 rounded-lg border border-indigo-200 shadow-sm" title="Muñeco">🤖</span>
                    <span className="text-stone-400">→</span>
                    <span className="p-4 bg-stone-105 rounded-xl border-2 border-dashed border-stone-300 font-bold block text-sm font-mono text-stone-400 animate-pulse">
                      {st1PatternChoice === 'doll' ? '🤖' : st1PatternChoice === 'wood' ? '🪵' : '¿?'}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => { setSt1PatternChoice('wood'); soundEffects.playMagic(); }}
                      className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                        st1PatternChoice === 'wood'
                          ? 'bg-amber-600 text-white border-amber-700'
                          : 'bg-white hover:bg-stone-50 text-stone-750 border-stone-200'
                      }`}
                    >
                      <span>Madera 🪵</span>
                    </button>

                    <button
                      onClick={() => { setSt1PatternChoice('doll'); soundEffects.playMagic(); }}
                      className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                        st1PatternChoice === 'doll'
                          ? 'bg-indigo-600 text-white border-indigo-700'
                          : 'bg-white hover:bg-stone-50 text-stone-750 border-stone-200'
                      }`}
                    >
                      <span>Muñeco 🤖</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STATION 2 PUZZLES */}
          {activeStationIndex === 1 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-extrabold text-stone-800 mb-3">
                  1. Realiza las tres operaciones para no equivocarte de camino hacia la escuela:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Math op 1 */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200 flex flex-col items-center">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-2">
                      Suma sin Llevadas
                    </span>
                    <div className="font-mono text-sm space-y-1">
                      <div className="text-right">4 3</div>
                      <div className="text-right">+ 2 5</div>
                      <div className="border-t-2 border-stone-850 w-12 mx-auto"></div>
                      <input
                        type="number"
                        value={st2Sum1}
                        onChange={(e) => setSt2Sum1(e.target.value)}
                        placeholder="Resultado"
                        className="w-16 px-1.5 py-0.5 border border-stone-300 rounded text-center font-mono font-bold"
                      />
                    </div>
                  </div>

                  {/* Math op 2 */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200 flex flex-col items-center">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-2">
                      Suma con Llevadas ( + 1 )
                    </span>
                    <div className="font-mono text-sm space-y-1">
                      <div className="text-right">2 8</div>
                      <div className="text-right">+ 1 5</div>
                      <div className="border-t-2 border-stone-850 w-12 mx-auto"></div>
                      <input
                        type="number"
                        value={st2Sum2}
                        onChange={(e) => setSt2Sum2(e.target.value)}
                        placeholder="Resultado"
                        className="w-16 px-1.5 py-0.5 border border-stone-300 rounded text-center font-mono font-bold"
                      />
                    </div>
                  </div>

                  {/* Math op 3 */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200 flex flex-col items-center">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-2">
                      Resta sin Llevadas
                    </span>
                    <div className="font-mono text-sm space-y-1">
                      <div className="text-right">7 6</div>
                      <div className="text-right">- 3 2</div>
                      <div className="border-t-2 border-stone-850 w-12 mx-auto"></div>
                      <input
                        type="number"
                        value={st2Sub1}
                        onChange={(e) => setSt2Sub1(e.target.value)}
                        placeholder="Resultado"
                        className="w-16 px-1.5 py-0.5 border border-stone-300 rounded text-center font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Math problem */}
              <div>
                <p className="text-xs font-extrabold text-stone-800 mb-2">
                  2. Ayuda a Pepito Grillo: Resolvamos el dilema del canasto de manzanas:
                </p>
                <div className="bg-white p-4.5 rounded-xl border border-stone-200 leading-relaxed text-xs text-stone-700">
                  “Pepito Grillo tiene <strong>15 manzanas</strong> en su canasto para Pinocho.
                  Por saltar un charco, se caen <strong>6 manzanas</strong> y se pierden en el lodo.
                  ¿Cuántas manzanas quedan?”
                </div>
                
                <div className="flex items-center gap-3 mt-3 justify-center">
                  <span className="text-xs font-bold text-stone-600 font-sans">Escribe tu respuesta:</span>
                  <input
                    type="number"
                    value={st2Problem}
                    onChange={(e) => setSt2Problem(e.target.value)}
                    placeholder="Número"
                    className="w-20 px-3 py-1.5 border border-stone-300 focus:border-amber-600 focus:outline-none rounded-lg text-center font-mono font-extrabold text-sm"
                  />
                  <span className="text-xs text-stone-500 font-bold">manzanas</span>
                </div>
              </div>
            </div>
          )}

          {/* STATION 3 PUZZLES */}
          {activeStationIndex === 2 && (
            <div className="space-y-6">
              {/* Part 1 Gender */}
              <div>
                <p className="text-xs font-extrabold text-stone-800 mb-2">
                  1. Clasifica cada palabra según se refiera a MASCULINO o FEMENINO:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Gepeto', 'Hada', 'Grillo', 'Marioneta'].map((term) => (
                    <div key={term} className="bg-white p-3 rounded-lg border border-stone-200 flex items-center justify-between gap-4">
                      <span className="font-bold text-sm text-stone-800 font-sans">{term}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setSt3Gender({ ...st3Gender, [term]: 'masc' }); soundEffects.playMagic(); }}
                          className={`px-3 py-1 text-[11px] font-bold rounded-md border ${
                            st3Gender[term] === 'masc'
                              ? 'bg-blue-600 text-white border-blue-700'
                              : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          👦 Masc
                        </button>
                        <button
                          onClick={() => { setSt3Gender({ ...st3Gender, [term]: 'fem' }); soundEffects.playMagic(); }}
                          className={`px-3 py-1 text-[11px] font-bold rounded-md border ${
                            st3Gender[term] === 'fem'
                              ? 'bg-rose-600 text-white border-rose-700'
                              : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          👧 Fem
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 2 Plurals */}
              <div>
                <p className="text-xs font-extrabold text-stone-800 mb-2">
                  2. Di cómo se dice en PLURAL (muchos):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-stone-200 flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-stone-700">Reloj (uno) 🕰️</span>
                    <input
                      type="text"
                      placeholder="Muchos..."
                      value={st3Plurals.relic}
                      onChange={(e) => setSt3Plurals({ ...st3Plurals, relic: e.target.value })}
                      className="px-2 py-1 border border-stone-300 rounded text-center font-sans font-bold text-xs"
                    />
                    <span className="text-[10px] text-stone-400 block text-center">(relojes)</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-stone-200 flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-stone-700">Niño (uno) 👦</span>
                    <input
                      type="text"
                      placeholder="Muchos..."
                      value={st3Plurals.children}
                      onChange={(e) => setSt3Plurals({ ...st3Plurals, children: e.target.value })}
                      className="px-2 py-1 border border-stone-300 rounded text-center font-sans font-bold text-xs"
                    />
                    <span className="text-[10px] text-stone-400 block text-center">(niños)</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-stone-200 flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-stone-700">Estrella (una) ⭐️</span>
                    <input
                      type="text"
                      placeholder="Muchas..."
                      value={st3Plurals.star}
                      onChange={(e) => setSt3Plurals({ ...st3Plurals, star: e.target.value })}
                      className="px-2 py-1 border border-stone-300 rounded text-center font-sans font-bold text-xs"
                    />
                    <span className="text-[10px] text-stone-400 block text-center">(estrellas)</span>
                  </div>
                </div>
              </div>

              {/* Part 3 Caps */}
              <div>
                <p className="text-xs font-extrabold text-stone-800 mb-1">
                  3. Las mayúsculas del nombre propio:
                </p>
                <p className="text-[11px] text-stone-500 mb-3">
                  Toca las palabras que representan nombres propios de Pinocho que <strong>SÍ</strong> deben empezar con Mayúscula inicial en el texto.
                </p>

                <div className="flex flex-wrap gap-2 justify-center bg-white p-3.5 rounded-xl border border-stone-200">
                  {Object.keys(st3Caps).map((word) => {
                    const isSelected = st3Caps[word];
                    return (
                      <button
                        key={word}
                        onClick={() => {
                          setSt3Caps({ ...st3Caps, [word]: !isSelected });
                          soundEffects.playMagic();
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-mono border-2 transition-all ${
                          isSelected
                            ? 'bg-amber-600 text-white border-amber-700 shadow-sm scale-105'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STATION 4 PUZZLES */}
          {activeStationIndex === 3 && (
            <div className="space-y-6">
              {/* Reading literal */}
              <div>
                <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-xl leading-relaxed text-xs font-medium text-stone-800 italic font-sans mb-3">
                  “Gepeto vive en el vientre de la gran ballena. Está muy triste. Pinocho llega nadando y le da un abrazo muy fuerte.
                  Pepito propone encender un fuego con ramas de madera y asustar a la ballena. ¡Achís!"
                </div>

                <p className="text-xs font-extrabold text-stone-800 mb-2">
                  1. Completa las preguntas literales sobre la lectura de la ballena:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Q1 */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200">
                    <span className="text-[11px] font-bold text-stone-400 uppercase">¿Quién vive triste adentro?</span>
                    <div className="flex flex-col gap-1.5 mt-2">
                      <button
                        onClick={() => { setSt4Q1('gt'); soundEffects.playMagic(); }}
                        className={`px-3 py-2 text-left text-xs rounded-lg border transition-all ${
                          st4Q1 === 'gt' ? 'bg-amber-200 border-amber-400 font-bold text-amber-950' : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        👴 El abuelito Gepeto
                      </button>
                      <button
                        onClick={() => { setSt4Q1('hd'); soundEffects.playMagic(); }}
                        className={`px-3 py-2 text-left text-xs rounded-lg border transition-all ${
                          st4Q1 === 'hd' ? 'bg-amber-200 border-amber-400 font-bold text-amber-950' : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        🧚‍♀️ El Hada Azul
                      </button>
                    </div>
                  </div>

                  {/* Q2 */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200">
                    <span className="text-[11px] font-bold text-stone-400 uppercase">¿Con qué asustan a la ballena marina?</span>
                    <div className="flex flex-col gap-1.5 mt-2">
                      <button
                        onClick={() => { setSt4Q2('fg'); soundEffects.playMagic(); }}
                        className={`px-3 py-2 text-left text-xs rounded-lg border transition-all ${
                          st4Q2 === 'fg' ? 'bg-amber-200 border-amber-400 font-bold text-amber-950' : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        🔥 Encendiendo un fuego
                      </button>
                      <button
                        onClick={() => { setSt4Q2('cn'); soundEffects.playMagic(); }}
                        className={`px-3 py-2 text-left text-xs rounded-lg border transition-all ${
                          st4Q2 === 'cn' ? 'bg-amber-200 border-amber-400 font-bold text-amber-950' : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        🎶 Cantándole una nana
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coin clicker */}
              <div>
                <p className="text-xs font-extrabold text-stone-800 mb-1">
                  2. Consigue exactamente 3.50 € en monedas para pagar la madera del fuego:
                </p>
                <p className="text-[11px] text-stone-500 mb-3">
                  Pulsa en las monedas doradas del cofre para sumarlas y alcanzar el precio.
                </p>

                <div className="bg-white border-2 border-dashed border-stone-300 p-4 rounded-xl flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500">Total en tu cesta:</span>
                    <span className="font-mono text-xl font-extrabold text-amber-900 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                      {currentCoinsTotal.toFixed(2)} €
                    </span>
                    <button
                      onClick={() => { setSt4Coins([]); soundEffects.playMagic(); }}
                      className="p-1 rounded-md text-stone-400 hover:text-stone-600 hover:bg-stone-100"
                      title="Reiniciar monedas"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Visual selection verification */}
                  {currentCoinsTotal === 3.50 ? (
                    <div className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-lg flex items-center gap-1">
                      <Check className="w-4 h-4" /> ¡Cantidad justa! Excelente para encender el fuego.
                    </div>
                  ) : currentCoinsTotal > 3.50 ? (
                    <div className="text-[11px] font-bold text-red-500 bg-red-50 px-4 py-1.5 rounded-lg">
                      ¡Demasiado! Necesitas exactamente 3.50 €
                    </div>
                  ) : (
                    <div className="text-[11px] font-bold text-stone-400">
                      Sigue sumando... faltan {(3.5 - currentCoinsTotal).toFixed(2)} €
                    </div>
                  )}

                  {/* Coin buttons */}
                  <div className="flex flex-wrap gap-2.5 justify-center mt-2.5">
                    <button
                      onClick={() => { setSt4Coins([...st4Coins, 200]); soundEffects.playMagic(); }}
                      className="w-12 h-12 rounded-full bg-yellow-100 border-2 border-yellow-600 flex flex-col items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform"
                    >
                      <span className="font-mono text-xs font-bold text-yellow-900">2€</span>
                    </button>
                    <button
                      onClick={() => { setSt4Coins([...st4Coins, 100]); soundEffects.playMagic(); }}
                      className="w-11 h-11 rounded-full bg-stone-100 border-2 border-stone-400 flex flex-col items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform"
                    >
                      <span className="font-mono text-xs font-bold text-stone-600">1€</span>
                    </button>
                    <button
                      onClick={() => { setSt4Coins([...st4Coins, 50]); soundEffects.playMagic(); }}
                      className="w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-600 flex flex-col items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform"
                    >
                      <span className="font-mono text-[10px] font-bold text-amber-900">50¢</span>
                    </button>
                    <button
                      onClick={() => { setSt4Coins([...st4Coins, 20]); soundEffects.playMagic(); }}
                      className="w-9 h-9 rounded-full bg-amber-50 border-2 border-amber-500 flex flex-col items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform"
                    >
                      <span className="font-mono text-[9px] font-bold text-amber-800">20¢</span>
                    </button>
                    <button
                      onClick={() => { setSt4Coins([...st4Coins, 10]); soundEffects.playMagic(); }}
                      className="w-8 h-8 rounded-full bg-amber-50 border border-amber-500 flex flex-col items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform"
                    >
                      <span className="font-mono text-[8px] font-bold text-amber-800">10¢</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ==================================== */}
        {/* GRILLO'S MORAL DILEMMA INPUT PORTAL */}
        {/* ==================================== */}
        <div className="bg-white border-4 border-[#3B82F6] rounded-[30px] p-6 mb-6 shadow-xl text-[#5C4033]">
          <span className="text-[10px] bg-[#3B82F6] text-white px-3 py-1 rounded-full font-black uppercase tracking-wider font-sans">
            🦗 El dilema de la Conciencia
          </span>
          <h4 className="font-sans font-black text-stone-900 text-sm mt-3 mb-4">
            {station.dilema.question}
          </h4>

          <div className="flex flex-col gap-3">
            {station.dilema.options.map((opt, idx) => {
              const isSelected = selectedDilemaIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDilemaIndex(idx);
                    soundEffects.playMagic();
                  }}
                  className={`text-left text-xs p-4 rounded-2xl border-4 transition-all flex items-start gap-4 leading-normal font-sans font-bold duration-155 ${
                    isSelected
                      ? 'bg-yellow-50 border-yellow-400 text-slate-905 shadow-md'
                      : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200 text-stone-700'
                  }`}
                >
                  <div className={`mt-0.5 w-4 h-4 rounded-full border-4 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-yellow-500 bg-yellow-400 text-slate-900' : 'border-stone-400 bg-white'
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 bg-[#5C4033] rounded-full animate-pulse" />}
                  </div>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {selectedDilemaIndex !== null && (
            <div className={`mt-4 p-4 rounded-2xl text-xs flex items-start gap-2.5 border-4 ${
              station.dilema.options[selectedDilemaIndex].isCorrect
                ? 'bg-green-50 border-[#10B981] text-green-905'
                : 'bg-red-55 border-[#EF4444] text-red-905'
            }`}>
              {station.dilema.options[selectedDilemaIndex].isCorrect ? (
                <Check className="text-[#10B981] w-5 h-5 flex-shrink-0 font-black animate-bounce" />
              ) : (
                <AlertCircle className="text-[#EF4444] w-5 h-5 flex-shrink-0 font-black" />
              )}
              <p className="font-sans font-bold">
                {station.dilema.options[selectedDilemaIndex].feedback}
              </p>
            </div>
          )}
        </div>

        {/* FEEDBACK & VALIDATE ACTIONS BANNER */}
        <div className="pt-6 border-t-4 border-dashed border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-3">
            <button
              onClick={onPrevStation}
              className="px-5 py-2.5 bg-white hover:bg-yellow-50 border-4 border-[#3B82F6] text-[#3B82F6] rounded-xl text-xs font-black uppercase shadow-[0_4px_0_#2563EB] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Atrás
            </button>
            <button
              onClick={onNextStation}
              className="px-5 py-2.5 bg-white hover:bg-yellow-50 border-4 border-[#3B82F6] text-[#3B82F6] rounded-xl text-xs font-black uppercase shadow-[0_4px_0_#2563EB] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
            >
              Siguiente
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {showFeedback && (
              <span className={`text-xs font-black uppercase py-1.5 px-4 rounded-full text-center border-4 ${
                isStationFullyCompleted
                  ? 'bg-green-50 text-green-905 border-[#10B981]'
                  : 'bg-red-50 text-red-905 border-[#EF4444]'
              }`}>
                {isStationFullyCompleted
                  ? '¡RETO CORRECTO! LLAVE: ' + station.secretWord
                  : 'Falta resolver algún desafío. ¡Revísalo!'}
              </span>
            )}

            <button
              onClick={handleValidateStationAnswers}
              className="px-8 py-3.5 bg-[#10B981] hover:bg-green-650 text-white font-black text-xs uppercase rounded-full shadow-[0_5px_0_#059669] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 tracking-wide w-[100%] sm:w-auto justify-center"
            >
              <Key className="w-4 h-4" />
              <span>COMPROBAR RETO</span>
            </button>
          </div>
        </div>

        {/* Display secret key earned banner */}
        {selectedTeam.unlockedKeys[station.id as 'station1' | 'station2' | 'station3' | 'station4'] && (
          <div className="mt-5 bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-400 p-4 rounded-2xl flex items-center justify-between gap-4 self-center max-w-lg mx-auto animate-bounce shadow">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔑</span>
              <div>
                <strong className="text-stone-900 text-xs tracking-wide uppercase font-sans">
                  ¡LLAVE OBTENIDA POR {selectedTeam.name}!
                </strong>
                <p className="text-[11px] text-amber-900 font-sans">
                  Palabra secreta desbloqueada: <strong>{station.secretWord}</strong>
                </p>
              </div>
            </div>
            <span className="font-extrabold text-amber-800 tracking-wider text-sm bg-white/75 border border-amber-300 px-3 py-1 rounded-lg">
              {station.secretWord}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
