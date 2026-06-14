/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Team, TeamId } from './types';
import { Timer } from './components/Timer';
import { TeamTracker } from './components/TeamTracker';
import { Stations } from './components/Stations';
import { FinalReto } from './components/FinalReto';
import { Printables } from './components/Printables';
import { soundEffects } from './components/SoundEffects';
import { 
  Compass, 
  Printer, 
  Sparkles, 
  Clock, 
  HelpCircle, 
  Award, 
  Users, 
  BookOpen, 
  Bookmark, 
  UserCheck, 
  ChevronRight, 
  Lightbulb, 
  Dices 
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'interactive' | 'print' | 'final' | 'instructions'>('home');
  const [activeStationIndex, setActiveStationIndex] = useState(0);

  // Default setup of 4 school teams representing famous Pinocchio characters
  const [teams, setTeams] = useState<Team[]>([
    {
      id: 'team1',
      name: 'Equipo Pepito Grillo 🦗',
      color: 'bg-emerald-600',
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-250',
      unlockedKeys: { station1: false, station2: false, station3: false, station4: false }
    },
    {
      id: 'team2',
      name: 'Equipo Hada Azul 🧚‍♀️',
      color: 'bg-sky-600',
      bgColor: 'bg-sky-50/60',
      borderColor: 'border-sky-250',
      unlockedKeys: { station1: false, station2: false, station3: false, station4: false }
    },
    {
      id: 'team3',
      name: 'Equipo Fígaro 🐱',
      color: 'bg-rose-600',
      bgColor: 'bg-rose-50/60',
      borderColor: 'border-rose-250',
      unlockedKeys: { station1: false, station2: false, station3: false, station4: false }
    },
    {
      id: 'team4',
      name: 'Equipo Cleo 🐠',
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50/60',
      borderColor: 'border-amber-250',
      unlockedKeys: { station1: false, station2: false, station3: false, station4: false }
    }
  ]);

  const [selectedTeamId, setSelectedTeamId] = useState<TeamId>('team1');

  const selectedTeam = teams.find(t => t.id === selectedTeamId) || teams[0];

  const handleSelectTeam = (id: TeamId) => {
    setSelectedTeamId(id);
  };

  const handleToggleKey = (teamId: TeamId, stationId: 'station1' | 'station2' | 'station3' | 'station4') => {
    setTeams(prevTeams => 
      prevTeams.map(team => {
        if (team.id === teamId) {
          const unlockedKeys = { ...team.unlockedKeys, [stationId]: !team.unlockedKeys[stationId] };
          return { ...team, unlockedKeys };
        }
        return team;
      })
    );
  };

  const handleKeyUnlockedForce = (stationId: 'station1' | 'station2' | 'station3' | 'station4', isUnlocked: boolean) => {
    setTeams(prevTeams => 
      prevTeams.map(team => {
        if (team.id === selectedTeamId) {
          const unlockedKeys = { ...team.unlockedKeys, [stationId]: isUnlocked };
          return { ...team, unlockedKeys };
        }
        return team;
      })
    );
  };

  const handleRenameTeam = (teamId: TeamId, newName: string) => {
    setTeams(prevTeams => 
      prevTeams.map(team => {
        if (team.id === teamId) {
          return { ...team, name: newName };
        }
        return team;
      })
    );
  };

  const changeView = (view: 'home' | 'interactive' | 'print' | 'final' | 'instructions') => {
    setCurrentView(view);
    soundEffects.playMagic();
  };

  return (
    <div className="min-h-screen bg-[#FFF9E6] select-none pb-12 print:bg-white print:pb-0 border-[12px] border-[#3B82F6]">
      
      {/* 1. HERO NAVIGATION HEADER - Hidden on print */}
      <header className="bg-[#3B82F6] p-6 text-white sticky top-0 z-50 shadow-lg border-b-8 border-yellow-400 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Logo Brand matching design theme */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-inner border-2 border-yellow-400 flex-shrink-0 animate-pulse">
              ⭐
            </div>
            <div>
              <h1 className="font-sans font-black text-2xl tracking-tight leading-none uppercase text-white">
                Escape Room: La Aventura de Pinocho
              </h1>
              <p className="text-sm font-bold text-blue-100 italic uppercase tracking-wide mt-1.5 font-sans">
                Misión: ¡Conviértelo en un niño de verdad!
              </p>
            </div>
          </div>

          {/* Navigation Items (Vibrant buttons with 3D bottom shadow) */}
          <nav className="flex flex-wrap justify-center items-center gap-3">
            {[
              { id: 'home', label: 'Inicio 🏰' },
              { id: 'interactive', label: '🎮 Estaciones' },
              { id: 'final', label: '🗝️ Cofre Final' },
              { id: 'print', label: '🖨️ Imprenta' },
              { id: 'instructions', label: '📘 Guía Didáctica' }
            ].map((btn) => {
              const active = currentView === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => changeView(btn.id as any)}
                  className={`px-5 py-2.5 text-xs font-sans font-black rounded-xl border-2 uppercase tracking-wider transition-all duration-150 ${
                    active
                      ? 'bg-yellow-400 text-slate-800 border-yellow-500 shadow-[0_5px_0_#D97706] translate-y-0.5'
                      : 'bg-white hover:bg-yellow-50 text-[#3B82F6] border-[#3B82F6] shadow-[0_5px_0_#2563EB] active:translate-y-1 active:shadow-none'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* 2. VIEWS PORTAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* VIEW A: HOME - Dashboard and Story Introduction */}
        {currentView === 'home' && (
          <div className="space-y-6">
            
            {/* Story Showcase card */}
            <div className="bg-white rounded-[40px] border-8 border-[#3B82F6] p-8 sm:p-10 relative overflow-hidden shadow-2xl text-[#5C4033] relative">
              <div className="absolute top-0 right-0 bg-[#3B82F6] text-white px-6 py-2 rounded-bl-3xl font-black text-xs uppercase shadow-sm">
                Aventura Activa
              </div>
              
              <div className="relative max-w-2xl space-y-4">
                <span className="text-xs bg-yellow-100 text-yellow-800 border border-yellow-300 font-sans font-black py-1 px-4 rounded-full uppercase tracking-wider">
                  Escape Room Educativo
                </span>
                
                <h2 className="font-sans font-black text-2xl sm:text-4xl tracking-tight leading-tight text-[#3B82F6] uppercase">
                  ¡Ayuda a Pinocho a convertirse en un niño de verdad!
                </h2>
                
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans font-medium">
                  Usa nuestro simulador en el aula física o digital. Pinocho ha salido del taller de Gepeto, se ha extraviado por desoír a Pepito Grillo y ahora necesita que cuatro equipos de alumnos y alumnas de 1º de Primaria desvelen las 4 virtudes de la conciencia: 
                  <strong> Sinceridad</strong>, <strong>Esfuerzo</strong>, <strong>Bondad</strong> y <strong>Amistad</strong> para disolver los hilos del títere.
                </p>

                {/* Big CTAs with play 3D shadow buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => changeView('interactive')}
                    className="flex justify-center items-center gap-2 px-8 py-3.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-black py-3 px-8 rounded-full text-sm shadow-[0_6px_0_#2563EB] active:translate-y-1 active:shadow-none uppercase transition-all"
                  >
                    <span>🎮 INICIAR MULTI-JUEGO DIGITAL</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => changeView('print')}
                    className="flex justify-center items-center gap-2 px-8 py-3.5 bg-[#EF4444] hover:bg-red-650 text-white font-[#EF4444] font-black py-3 px-8 rounded-full text-sm shadow-[0_6px_0_#DC2626] active:translate-y-1 active:shadow-none uppercase transition-all"
                  >
                    <Printer className="w-4 h-4 text-white" />
                    <span>VER E IMPRIMIR MATERIAL FÍSICO</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick specifications grid with the Vibrant Palette border system */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white border-4 border-[#FBBF24] rounded-[30px] p-5 flex items-center gap-3.5 shadow-xl">
                <div className="p-3.5 bg-[#FFF9E6] text-[#FBBF24] rounded-2xl border-2 border-yellow-200">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] block text-stone-400 font-bold tracking-wide uppercase font-sans">Duración</span>
                  <span className="text-sm font-black text-[#5C4033] font-sans">60-90 MIN</span>
                </div>
              </div>

              <div className="bg-white border-4 border-[#EF4444] rounded-[30px] p-5 flex items-center gap-3.5 shadow-xl">
                <div className="p-3.5 bg-red-50 text-[#EF4444] rounded-2xl border-2 border-red-200">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] block text-stone-400 font-bold tracking-wide uppercase font-sans">Organización</span>
                  <span className="text-sm font-black text-[#5C4033] font-sans">4 EQUIPOS</span>
                </div>
              </div>

              <div className="bg-white border-4 border-[#10B981] rounded-[30px] p-5 flex items-center gap-3.5 shadow-xl">
                <div className="p-3.5 bg-green-50 text-[#10B981] rounded-2xl border-2 border-green-200">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] block text-stone-400 font-bold tracking-wide uppercase font-sans">Alineamiento</span>
                  <span className="text-sm font-black text-[#5C4033] font-sans">1º PRIMARIA</span>
                </div>
              </div>

              <div className="bg-white border-4 border-[#6366F1] rounded-[30px] p-5 flex items-center gap-3.5 shadow-xl">
                <div className="p-3.5 bg-indigo-50 text-[#6366F1] rounded-2xl border-2 border-indigo-200">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] block text-stone-400 font-bold tracking-wide uppercase font-sans">Nivel</span>
                  <span className="text-sm font-black text-[#5C4033] font-sans">6 - 7 AÑOS</span>
                </div>
              </div>
            </div>

            {/* Curriculum Breakdown Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Mathematics Card */}
              <div className="bg-white rounded-[40px] border-[6px] border-[#10B981] p-6 shadow-xl text-[#5C4033]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#10B981] text-white flex items-center justify-center font-black font-sans text-lg shadow-md">
                    +
                  </div>
                  <h3 className="font-sans font-black text-[#5C4033] text-sm uppercase tracking-wider">
                    Matemáticas en Pinocho
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs text-stone-600 font-medium font-sans">
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-black">✔</span>
                    <strong>Sumas con y sin llevadas:</strong> Operaciones hasta 99 en el camino de baldosas de la escuela.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-black">✔</span>
                    <strong>Restas sin llevadas:</strong> Quitar manzanas y medir recursos sencillos.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-black">✔</span>
                    <strong>Problemas matemáticos:</strong> Resolución de forma cooperativa adaptada a 6 años.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-black">✔</span>
                    <strong>Monedas de euro:</strong> Compra de leña por valor de 3,50 € usando monedas de 2€, 1€ y céntimos.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#10B981] font-black">✔</span>
                    <strong>Reloj analógico:</strong> Horas "en punto" y "y media" en el Taller de Gepeto.
                  </li>
                </ul>
              </div>

              {/* Language and Spanish rules Card */}
              <div className="bg-white rounded-[40px] border-[6px] border-[#3B82F6] p-6 shadow-xl text-[#5C4033]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#3B82F6] text-white flex items-center justify-center font-black text-sm shadow-md font-sans">
                    ABC
                  </div>
                  <h3 className="font-sans font-black text-[#5C4033] text-sm uppercase tracking-wider">
                    Lengua Castellana y Valores
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs text-stone-600 font-medium font-sans">
                  <li className="flex items-center gap-2">
                    <span className="text-[#3B82F6] font-black">✔</span>
                    <strong>Lectura corta:</strong> Breve fragmento del vientre de la ballena marina.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#3B82F6] font-black">✔</span>
                    <strong>Compresión literal:</strong> Dos preguntas directas basadas en el texto.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#3B82F6] font-black">✔</span>
                    <strong>Sustantivos de género:</strong> Clasificación manipulativa entre Masculino y Femenino.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#3B82F6] font-black">✔</span>
                    <strong>Formación de plurales:</strong> De un objeto a varios (reloj-relojes, estrella-estrellas).
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#3B82F6] font-black">✔</span>
                    <strong>Mayúsculas de nombres:</strong> Tocar palabras que requieren mayúscula de personaje.
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick setup instruction section */}
            <div className="bg-white rounded-[40px] border-8 border-[#6366F1] p-6 shadow-2xl text-[#5C4033]">
              <h3 className="font-sans font-black text-[#3B82F6] text-lg uppercase tracking-wider mb-4">
                ¿Cómo funciona este Escape Room de Pinocho?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600 leading-normal font-sans">
                <div className="space-y-2">
                  <strong className="text-[#EF4444] font-black text-sm block uppercase tracking-wide">1. DECIDE EL MÉTODO</strong>
                  <p>
                    Puedes usar la pestaña <span className="font-bold text-[#EF4444]">"Estaciones de Juego"</span> proyectada en la pizarra digital o tabletas para realizar el reto interactivo en grupos, o imprimir los papeles en la pestaña <span className="font-bold text-[#EF4444]">"Imprimir"</span> para que sea 100% manipulativo físico.
                  </p>
                </div>
                <div className="space-y-2">
                  <strong className="text-[#FBBF24] font-black text-sm block uppercase tracking-wide">2. MONTA LAS ESTACIONES</strong>
                  <p>
                    El aula se divide en 4 mesas. El Equipo 1 comienza en la Estación 1, el Equipo 2 en la 2, y así sucesivamente. Luego van rotando para resolver los desafíos y ganar sus palabras clave.
                  </p>
                </div>
                <div className="space-y-2">
                  <strong className="text-[#10B981] font-black text-sm block uppercase tracking-wide">3. DESBLOQUEA EL COFRE</strong>
                  <p>
                    Reúne a los secretarios/as de cada grupo en el proyector de clase o en la mesa del profesor, ordenad las 4 palabras secretas en la pestaña <span className="font-bold text-[#10B981]">"Cofre Final"</span> para ver la preciosa animación de Pinocho convirtiéndose en un niño de verdad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW B: INTERACTIVE PLAY MODE */}
        {currentView === 'interactive' && (
          <div className="space-y-6">
            
            {/* Top row: Interactive Live Timer */}
            <div>
              <Timer initialMinutes={75} />
            </div>

            {/* Main Interactive bento columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: Team Tracker dashboard (1 Col grid) */}
              <div className="lg:col-span-1">
                <TeamTracker
                  teams={teams}
                  selectedTeamId={selectedTeamId}
                  onSelectTeam={handleSelectTeam}
                  onToggleKey={handleToggleKey}
                  onRenameTeam={handleRenameTeam}
                />
              </div>

              {/* Right Column: Dynamic Station Engine (2 Cols grid) */}
              <div className="lg:col-span-2">
                <Stations
                  activeStationIndex={activeStationIndex}
                  selectedTeam={selectedTeam}
                  onPrevStation={() => setActiveStationIndex(prev => Math.max(0, prev - 1))}
                  onNextStation={() => setActiveStationIndex(prev => Math.min(3, prev + 1))}
                  onKeyUnlocked={handleKeyUnlockedForce}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW C: COFRE FINAL PORTAL */}
        {currentView === 'final' && (
          <div className="animate-fade-in">
            <FinalReto onGoToPrint={() => changeView('print')} />
          </div>
        )}

        {/* VIEW D: PRINT SHOP */}
        {currentView === 'print' && (
          <div className="animate-fade-in">
            <Printables />
          </div>
        )}

        {/* VIEW E: GUIDE FOR TEACHERS */}
        {currentView === 'instructions' && (
          <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 sm:p-10 shadow-xs space-y-8 font-sans">
            
            <div>
              <span className="text-xs bg-amber-120 text-amber-805 py-1 px-3.5 rounded-full font-bold uppercase tracking-wide">
                Guía Didáctica para el Maestro/a
              </span>
              <h2 className="font-sans font-extrabold text-stone-900 text-2xl tracking-tight mt-2">
                Programación y Sugerencias Didácticas del Escape Room
              </h2>
              <p className="text-xs text-stone-500 font-sans mt-0.5">
                Cómo coordinar esta aventura pedagógica basada en Pinocho para que todo resulte un éxito rotundo.
              </p>
            </div>

            {/* Rotation layout card */}
            <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 space-y-3">
              <h3 className="font-sans font-extrabold text-amber-955 text-sm uppercase tracking-wide flex items-center gap-1.5">
                <Dices className="w-5 h-5 text-amber-700" />
                La Dinámica de Rotación en 4 Estaciones:
              </h3>
              
              <p className="text-xs text-stone-701 leading-relaxed font-sans">
                Para evitar colas y atascos, este Escape Room está diseñado con una estructura rotativa por estaciones. Organiza el aula dividiendo a tus alumnos en 4 grupos fijos de mesas (entre 4 y 6 alumnos por mesa) y rotará de esta manera:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-white border border-amber-200 rounded-xl">
                  <strong className="text-xs text-amber-900 block font-bold mb-1">Ronda 1 (15 min)</strong>
                  <ul className="text-[10px] text-stone-500 space-y-0.5 font-sans">
                    <li>• Equipo A → Estación 1</li>
                    <li>• Equipo B → Estación 2</li>
                    <li>• Equipo C → Estación 3</li>
                    <li>• Equipo D → Estación 4</li>
                  </ul>
                </div>
                <div className="p-3 bg-white border border-amber-200 rounded-xl">
                  <strong className="text-xs text-amber-900 block font-bold mb-1">Ronda 2 (15 min)</strong>
                  <ul className="text-[10px] text-stone-500 space-y-0.5 font-sans">
                    <li>• Equipo A → Estación 2</li>
                    <li>• Equipo B → Estación 3</li>
                    <li>• Equipo C → Estación 4</li>
                    <li>• Equipo D → Estación 1</li>
                  </ul>
                </div>
                <div className="p-3 bg-white border border-amber-200 rounded-xl">
                  <strong className="text-xs text-amber-900 block font-bold mb-1">Ronda 3 (15 min)</strong>
                  <ul className="text-[10px] text-stone-500 space-y-0.5 font-sans">
                    <li>• Equipo A → Estación 3</li>
                    <li>• Equipo B → Estación 4</li>
                    <li>• Equipo C → Estación 1</li>
                    <li>• Equipo D → Estación 2</li>
                  </ul>
                </div>
                <div className="p-3 bg-white border border-amber-200 rounded-xl">
                  <strong className="text-xs text-amber-900 block font-bold mb-1">Ronda 4 (15 min)</strong>
                  <ul className="text-[10px] text-stone-500 space-y-0.5 font-sans">
                    <li>• Equipo A → Estación 4</li>
                    <li>• Equipo B → Estación 1</li>
                    <li>• Equipo C → Estación 2</li>
                    <li>• Equipo D → Estación 3</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Teacher instructions timeline */}
            <div className="space-y-4">
              <h3 className="font-sans font-extrabold text-stone-900 text-sm uppercase tracking-wide">
                Fases del Escape Room Paso a Paso
              </h3>

              <div className="relative border-l-2 border-stone-200 pl-6 ml-3 space-y-6">
                
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-600 border-2 border-white"></div>
                  <div>
                    <h4 className="font-sans font-bold text-stone-850 text-xs">
                      1. INTRODUCCIÓN HISTÓRICA (10 minutos)
                    </h4>
                    <p className="text-xs text-stone-500 leading-normal mt-1 font-sans">
                      El maestro/a lee la <strong className="text-amber-805">Carta del Hada Azul</strong> interpretando el personaje con voz de misterio. Se explican las reglas generales básicas: hay que hablar bajito en cada equipo, cooperar ("unir hombros") y que no se puede avanzar sin completar la ficha y el dilema moral de Pepito Grillo.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-600 border-2 border-white"></div>
                  <div>
                    <h4 className="font-sans font-bold text-stone-850 text-xs">
                      2. DESAFÍO EN ACCIÓN (60 minutos)
                    </h4>
                    <p className="text-xs text-stone-500 leading-normal mt-1 font-sans">
                      Los equipos van resolviendo de forma autónoma. El maestro/a se pasea por el aula actuando como la conciencia o animando a buscar las soluciones correctas en los materiales físicos o digitales. Al terminar cada mesa, obtienen la Llave Recortable que contiene la palabra secreta.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-600 border-2 border-white"></div>
                  <div>
                    <h4 className="font-sans font-bold text-stone-850 text-xs">
                      3. CONEXIÓN DEL JURAMENTO FINAL (10 minutos)
                    </h4>
                    <p className="text-xs text-stone-500 leading-normal mt-1 font-sans">
                      Todos los alumnos se reúnen e introducen juntos las 4 palabras clave ganadas en el proyector de clase o pizarra digital. Pinocho se convierte en un niño de verdad.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-600 border-2 border-white"></div>
                  <div>
                    <h4 className="font-sans font-bold text-stone-850 text-xs">
                      4. REPARTO DE DIPLOMAS (10 minutos)
                    </h4>
                    <p className="text-xs text-stone-500 leading-normal mt-1 font-sans">
                      El Hada Azul concede el diploma de honor oficial de "Ayudante de la Conciencia" a cada uno de los niños o equipos, culminando con un enorme aplauso de felicitación colectiva.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pedagogical ideas and tips of help */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
              
              <div className="space-y-1.5">
                <h4 className="font-sans font-bold text-stone-800 text-xs flex items-center gap-1">
                  <Bookmark className="w-4 h-4 text-amber-700" />
                  Sinceridad y Valores:
                </h4>
                <p className="text-xs text-stone-500 leading-normal">
                  Los dilemas morales son deliberadamente interactivos. Fomenta debates rápidos de 1 minuto en la mesa sobre <em>"¿qué haría Pinocho en este caso?"</em> antes de responder.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-sans font-bold text-stone-800 text-xs flex items-center gap-1">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  Inclusión Escolar:
                </h4>
                <p className="text-xs text-stone-500 leading-normal">
                  Las tareas están ilustradas visualmente para alumnos con dificultades lectoras del final de 1º de Primaria. El trabajo cooperativo mitigará las diferencias de velocidad lectora.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-sans font-bold text-stone-800 text-xs flex items-center gap-1">
                  <Lightbulb className="w-4 h-4 text-blue-700" />
                  Material Recomendado:
                </h4>
                <p className="text-xs text-stone-500 leading-normal">
                  Recomendamos contar con un reloj escolar de juguete en el aula, además de algunas monedas de plástico ficticias para que la simulación física resulte fabulosamente tangible.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
