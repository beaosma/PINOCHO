import React, { useState } from 'react';
import { Printer, Calendar, Award, FileText, Key, Compass, GraduationCap, CheckCircle } from 'lucide-react';
import { STATIONS_DATA } from './StationsData';
import { soundEffects } from './SoundEffects';

export const Printables: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<'welcome' | 'stations' | 'keys' | 'diploma'>('welcome');
  const [diplomaName, setDiplomaName] = useState('Equipo Grillos');
  const [selectedStationIndex, setSelectedStationIndex] = useState(0);

  const handlePrint = () => {
    soundEffects.playMagic();
    window.print();
  };

  return (
    <div className="bg-white rounded-[40px] border-8 border-[#3B82F6] p-6 shadow-2xl text-[#5C4033]">
      {/* Introduction screen about printing to guide the teacher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b-4 border-dashed border-stone-200 pb-5 print:hidden">
        <div>
          <h2 className="font-sans font-black text-[#3B82F6] text-xl flex items-center gap-2 uppercase">
            <Printer className="w-6 h-6 text-[#3B82F6]" />
            Imprenta del Hada Azul (Material Físico)
          </h2>
          <p className="text-xs text-stone-600 font-sans mt-1.5 font-bold">
            Prepara tu Escape Room en el aula física. Selecciona el material, pulsa
            <strong className="text-yellow-600 uppercase font-black"> "Imprimir en Papel"</strong> y recortarás todo listo.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-8 py-3.5 bg-[#10B981] hover:bg-green-650 text-white font-black text-xs uppercase rounded-full shadow-[0_5px_0_#059669] active:translate-y-0.5 active:shadow-none transition-all"
        >
          <Printer className="w-5 h-5 flex-shrink-0" />
          <span>IMPRIMIR EN PAPEL</span>
        </button>
      </div>

      {/* Tabs list - Hidden on print */}
      <div className="flex flex-wrap gap-2.5 mb-6 border-b-4 border-dashed border-stone-200 pb-5 print:hidden">
        <button
          onClick={() => setSelectedDoc('welcome')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-sans font-black uppercase rounded-2xl border-4 transition-all cursor-pointer ${
            selectedDoc === 'welcome'
              ? 'bg-[#3B82F6] text-white border-yellow-400 shadow-[0_4px_0_#1D4ED8] translate-y-0.5'
              : 'bg-[#FFF9E6]/30 hover:bg-[#FFF9E6] text-stone-600 border-stone-200'
          }`}
        >
          <FileText className="w-4 h-4 text-inherit" />
          <span>Carta de Presentación</span>
        </button>

        <button
          onClick={() => setSelectedDoc('stations')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-sans font-black uppercase rounded-2xl border-4 transition-all cursor-pointer ${
            selectedDoc === 'stations'
              ? 'bg-[#3B82F6] text-white border-yellow-400 shadow-[0_4px_0_#1D4ED8] translate-y-0.5'
              : 'bg-[#FFF9E6]/30 hover:bg-[#FFF9E6] text-stone-600 border-stone-200'
          }`}
        >
          <Compass className="w-4 h-4 text-inherit" />
          <span>Fichas de las 4 Estaciones</span>
        </button>

        <button
          onClick={() => setSelectedDoc('keys')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-sans font-black uppercase rounded-2xl border-4 transition-all cursor-pointer ${
            selectedDoc === 'keys'
              ? 'bg-[#3B82F6] text-white border-yellow-400 shadow-[0_4px_0_#1D4ED8] translate-y-0.5'
              : 'bg-[#FFF9E6]/30 hover:bg-[#FFF9E6] text-stone-600 border-stone-200'
          }`}
        >
          <Key className="w-4 h-4 text-inherit" />
          <span>Llaves / Códigos Recortables</span>
        </button>

        <button
          onClick={() => setSelectedDoc('diploma')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-sans font-black uppercase rounded-2xl border-4 transition-all cursor-pointer ${
            selectedDoc === 'diploma'
              ? 'bg-[#3B82F6] text-white border-yellow-400 shadow-[0_4px_0_#1D4ED8] translate-y-0.5'
              : 'bg-[#FFF9E6]/30 hover:bg-[#FFF9E6] text-stone-600 border-stone-200'
          }`}
        >
          <Award className="w-4 h-4 text-inherit" />
          <span>Diploma del Hada Azul</span>
        </button>
      </div>

      {/* Auxiliary controls for customizing documents before print */}
      <div className="mb-6 pt-1 print:hidden">
        {selectedDoc === 'diploma' && (
          <div className="bg-[#FFF9E6] border-4 border-yellow-400 rounded-[24px] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Award className="w-8 h-8 text-[#3B82F6] flex-shrink-0" />
            <div className="w-full">
              <label className="block text-xs font-sans font-black text-stone-705 mb-1.5">
                Escribe el nombre del Alumno o del Equipo para el diploma:
              </label>
              <input
                type="text"
                value={diplomaName}
                onChange={(e) => setDiplomaName(e.target.value)}
                placeholder="Ejemplo: Daniel, Lucía, Equipo Fígaro..."
                className="w-full sm:max-w-md px-4 py-2 bg-white border-2 border-stone-200 focus:border-[#3B82F6] focus:outline-none rounded-xl text-xs font-black text-stone-900"
              />
            </div>
          </div>
        )}

        {selectedDoc === 'stations' && (
          <div className="bg-[#FFF9E6] border-4 border-yellow-400 rounded-[24px] p-4 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-sans font-black text-stone-705 mr-2">Elegir FICHA de la Estación:</span>
            {STATIONS_DATA.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setSelectedStationIndex(idx)}
                className={`px-3 py-1.5 text-xs font-sans font-black uppercase rounded-xl transition-all cursor-pointer ${
                  selectedStationIndex === idx
                    ? 'bg-[#3B82F6] text-white border-2 border-yellow-400 shadow-sm'
                    : 'bg-white hover:bg-stone-50 text-stone-700 border-2 border-stone-200'
                }`}
              >
                Estación {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PRINT CONTAINERS - Outer border represents the standard paper layout in Web. */}
      {/* On normal screen it looks like a paper layout. When printing, we isolate it. */}
      <div id="school-escape-print-container" className="bg-[#FFF9E6]/10 p-4 sm:p-10 rounded-[32px] border-8 border-dashed border-stone-200 flex justify-center overflow-auto print:bg-white print:p-0 print:border-0 print:m-0 print:rounded-none shadow-inner">
        
        {/* Document 1: Welcome letter from the Blue Fairy */}
        {selectedDoc === 'welcome' && (
          <div className="relative bg-white w-[100%] max-w-[800px] border border-stone-300 shadow-xl p-8 sm:p-14 font-sans text-stone-800 print:shadow-none print:border-0 print:p-4 print:max-w-none">
            {/* Elegant fairy graphic header border */}
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 via-amber-400 to-blue-500"></div>

            {/* Aesthetic framing */}
            <div className="border-4 border-double border-amber-200 p-8 rounded-2xl relative">
              <div className="absolute top-3 right-3 text-stone-300 pointer-events-none">✨</div>
              <div className="absolute bottom-3 left-3 text-stone-300 pointer-events-none">🎨</div>

              <div className="text-center mb-8">
                <span className="text-2xl">🪄</span>
                <h1 className="font-sans font-extrabold text-stone-900 text-2xl tracking-wide uppercase mt-1">
                  La Petición del Hada Azul
                </h1>
                <p className="text-[10px] text-amber-800 tracking-widest font-mono uppercase mt-1">
                  Misión Secreta • 1º de Educación Primaria
                </p>
              </div>

              {/* Adaptive brief text */}
              <div className="leading-relaxed space-y-4 text-xs sm:text-sm text-stone-700">
                <p className="font-extrabold text-stone-900">¡Hola, queridos amigos y amigas!</p>
                <p>
                  Soy el <strong>Hada Azul</strong>. Mi querido muñeco de madera, <strong>Pinocho</strong>, sueña con convertirse
                  en un niño de verdad. Pero como es muy travieso, se ha distraído por el camino y ha caído en varias bromas del Zorro, del Gato y de Strómboli.
                </p>
                <p className="bg-amber-50 border-l-4 border-amber-600 p-3 rounded text-amber-900 font-medium">
                  Para ayudarle a recuperar su corazón sincero y su forma humana, os he organizado un reto de 4 estaciones mágicas.
                  En cada estación, vuestro equipo descubrirá un secreto para Pinocho:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <span className="font-bold text-amber-800">1. El Taller de Gepeto</span>
                    <p className="text-stone-500 text-[11px] mt-0.5">Ordenad los relojes y los juguetes para aprender el valor del esfuerzo.</p>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <span className="font-bold text-amber-800">2. El Camino a la Escuela</span>
                    <p className="text-stone-500 text-[11px] mt-0.5">Resolved las sumas y las manzanas para estudiar con alegría.</p>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <span className="font-bold text-amber-800">3. El Teatro de Strómboli</span>
                    <p className="text-stone-500 text-[11px] mt-0.5">Clasificad las letras mágicas para librar a Pinocho de las cuerdas.</p>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <span className="font-bold text-amber-800">4. El Vientre de la Ballena</span>
                    <p className="text-stone-500 text-[11px] mt-0.5">Sacad las monedas exactas para encender el fuego y rescatar a Gepeto.</p>
                  </div>
                </div>

                <p className="pt-2">
                  Al terminar cada prueba, escribiréis la <strong>Llave Mágica</strong> (palabra secreta). Al final, debéis
                  unir las 4 llaves para descifrar el juramento de la sinceridad.
                </p>
                <p className="font-bold text-stone-900 text-center pt-3">
                  ¿Estáis preparados? ¡Confío en vosotros! Agitad vuestros lápices y... ¡comencemos!
                </p>
              </div>

              {/* Footer signatures */}
              <div className="flex justify-between items-center mt-10 pt-6 border-t border-stone-100 text-[11px]">
                <div className="text-center">
                  <p className="font-serif italic text-stone-400">🪄 Varita mágica</p>
                  <p className="font-bold text-stone-900">El Hada Azul</p>
                </div>
                <div className="text-center">
                  <p className="font-serif italic text-stone-400">🦗 ¡Cri-cri!</p>
                  <p className="font-bold text-stone-900">Pepito Grillo</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Document 2: Active Station Worksheet */}
        {selectedDoc === 'stations' && (
          <div className="bg-white w-[100%] max-w-[800px] border border-stone-300 shadow-xl p-8 sm:p-14 font-sans text-stone-800 print:shadow-none print:border-0 print:p-4 print:max-w-none">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-stone-300 pb-4 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-amber-50 px-2 py-1 rounded">
                  Ficha Oficial del Alumno
                </span>
                <h2 className="text-xl font-extrabold text-stone-900 mt-2 font-sans">
                  {STATIONS_DATA[selectedStationIndex].name}
                </h2>
                <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                  <strong>Objetivo:</strong> {STATIONS_DATA[selectedStationIndex].educationalObjective}
                </p>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-xs font-bold text-stone-400 font-sans">ESTACIÓN {selectedStationIndex + 1}/4</span>
                <div className="border border-stone-300 px-3 py-1.5 rounded-lg mt-1 text-left bg-stone-50">
                  <span className="text-[9px] block text-stone-400 font-bold uppercase">Equipo:</span>
                  <div className="w-24 h-4 border-b border-stone-400"></div>
                </div>
              </div>
            </div>

            {/* Story Hook */}
            <div className="bg-stone-50 p-4 rounded-xl mb-6 border-l-4 border-amber-600 text-xs text-stone-700 leading-relaxed font-sans">
              <strong className="text-amber-900 font-extrabold uppercase tracking-wide block mb-1">📖 En el Cuento de Pinocho:</strong>
              {STATIONS_DATA[selectedStationIndex].storyRelation}
            </div>

            {/* Main Activities Panel depending on the station */}
            <div className="border-2 border-dashed border-stone-300 rounded-2xl p-6 mb-6">
              <h3 className="font-sans font-bold text-stone-900 text-sm mb-4 bg-stone-100 py-1 px-2.5 rounded uppercase tracking-wide">
                ✏️ RETOS A RESOLVER (Escribe tus respuestas aquí)
              </h3>

              {/* ST 1 - Gepeto Clock Hands & Pattern */}
              {selectedStationIndex === 0 && (
                <div className="space-y-6">
                  {/* Task 1 */}
                  <div>
                    <h4 className="text-xs font-bold text-stone-800 uppercase mb-2">1. Dibuja las agujas en los Relojes de Cuco:</h4>
                    <p className="text-[11px] text-stone-500 mb-3 font-sans">La aguja corta marca las horas y la aguja larga marca los minutos.</p>
                    <div className="grid grid-cols-3 gap-4">
                      {/* Clock 1 */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border-4 border-stone-800 relative flex items-center justify-center bg-stone-50 shadow-sm">
                          <div className="absolute top-0.5 text-[8px] font-bold">12</div>
                          <div className="absolute bottom-0.5 text-[8px] font-bold">6</div>
                          <div className="absolute left-1 text-[8px] font-bold">9</div>
                          <div className="absolute right-1 text-[8px] font-bold">3</div>
                          <div className="w-2 h-2 rounded-full bg-stone-800 absolute"></div>
                        </div>
                        <span className="text-[11px] font-extrabold text-stone-700 mt-2">8 : 00</span>
                        <span className="text-[9px] text-stone-400">Hora de Despertar</span>
                      </div>
                      {/* Clock 2 */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border-4 border-stone-800 relative flex items-center justify-center bg-stone-50 shadow-sm">
                          <div className="absolute top-0.5 text-[8px] font-bold">12</div>
                          <div className="absolute bottom-0.5 text-[8px] font-bold">6</div>
                          <div className="absolute left-1 text-[8px] font-bold">9</div>
                          <div className="absolute right-1 text-[8px] font-bold">3</div>
                          <div className="w-2 h-2 rounded-full bg-stone-800 absolute"></div>
                        </div>
                        <span className="text-[11px] font-extrabold text-stone-700 mt-2">12 : 30</span>
                        <span className="text-[9px] text-stone-400">Hora del Almuerzo</span>
                      </div>
                      {/* Clock 3 */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border-4 border-stone-800 relative flex items-center justify-center bg-stone-50 shadow-sm">
                          <div className="absolute top-0.5 text-[8px] font-bold">12</div>
                          <div className="absolute bottom-0.5 text-[8px] font-bold">6</div>
                          <div className="absolute left-1 text-[8px] font-bold">9</div>
                          <div className="absolute right-1 text-[8px] font-bold">3</div>
                          <div className="w-2 h-2 rounded-full bg-stone-800 absolute"></div>
                        </div>
                        <span className="text-[11px] font-extrabold text-stone-700 mt-2">5 : 00</span>
                        <span className="text-[9px] text-stone-400">Hora de los Juguetes</span>
                      </div>
                    </div>
                  </div>

                  {/* Task 2 */}
                  <div>
                    <h4 className="text-xs font-bold text-stone-800 uppercase mb-2">2. Continúa la serie lógica del taller:</h4>
                    <p className="text-[11px] text-stone-500 mb-3 font-sans">Mira el orden e introduce el dibujo que va a continuación.</p>
                    <div className="flex items-center gap-1 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                      <div className="px-2 py-1 bg-amber-100 text-xs font-bold rounded">Wood 🪵</div>
                      <span className="text-stone-400">→</span>
                      <div className="px-2 py-1 bg-purple-100 text-xs font-bold rounded">Doll 🤖</div>
                      <span className="text-stone-400">→</span>
                      <div className="px-2 py-1 bg-amber-100 text-xs font-bold rounded">Wood 🪵</div>
                      <span className="text-stone-400">→</span>
                      <div className="px-2 py-1 bg-purple-100 text-xs font-bold rounded">Doll 🤖</div>
                      <span className="text-stone-400">→</span>
                      <div className="px-4 py-2 bg-white border-2 border-dashed border-stone-400 rounded text-stone-400 text-xs font-sans italic font-bold">¿Cuál va ahora...?</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ST 2 - Pathway Math */}
              {selectedStationIndex === 1 && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-stone-800 uppercase mb-3">1. Resuelve las operaciones mágicas en vertical:</h4>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="border border-stone-300 rounded-lg p-3 flex flex-col items-center">
                        <span className="text-[9px] font-bold text-stone-400 mb-2">SUMA SIN LLEVADA</span>
                        <div className="font-mono text-lg space-y-1">
                          <div className="text-right">4 3</div>
                          <div className="text-right">+ 2 5</div>
                          <div className="border-t-2 border-stone-800 w-10"></div>
                          <div className="h-6 border-b border-dashed border-stone-300"></div>
                        </div>
                      </div>

                      <div className="border border-stone-300 rounded-lg p-3 flex flex-col items-center">
                        <span className="text-[9px] font-bold text-stone-400 mb-2">SUMA CON LLEVADA</span>
                        <div className="font-mono text-lg space-y-1">
                          <div className="text-right text-stone-400 text-xs">( )</div>
                          <div className="text-right">2 8</div>
                          <div className="text-right">+ 1 5</div>
                          <div className="border-t-2 border-stone-800 w-10"></div>
                          <div className="h-6 border-b border-dashed border-stone-300"></div>
                        </div>
                      </div>

                      <div className="border border-stone-300 rounded-lg p-3 flex flex-col items-center">
                        <span className="text-[9px] font-bold text-stone-400 mb-2">RESTA SIN LLEVADA</span>
                        <div className="font-mono text-lg space-y-1">
                          <div className="text-right">7 6</div>
                          <div className="text-right">- 3 2</div>
                          <div className="border-t-2 border-stone-800 w-10"></div>
                          <div className="h-6 border-b border-dashed border-stone-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-stone-800 uppercase mb-2">2. El problema del Grillo:</h4>
                    <p className="text-xs leading-relaxed text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-200">
                      “Pepito Grillo tiene <strong>15 manzanas</strong> ricas en su cesta. Camino del colegio,
                      Pinocho tropieza y se le caen <strong>6 manzanas</strong> de la cesta. ¿Cuántas manzanas le quedan?”
                    </p>
                    <div className="flex gap-4 items-center justify-center mt-3">
                      <div className="font-mono text-sm border border-stone-300 p-2.5 rounded-md min-w-[80px] text-center bg-white">
                        15 - 6 = ______
                      </div>
                      <div className="text-xs font-medium font-sans">
                        Respuesta: Le quedan ________ manzanas.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ST 3 - Stromboli Marionettes Grammar */}
              {selectedStationIndex === 2 && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-stone-800 uppercase mb-2">1. Une con flechas según el GÉNERO de cada palabra:</h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="border border-dashed border-stone-300 p-3 rounded-xl">
                        <h5 className="font-bold text-xs text-blue-600 mb-2 bg-blue-50 py-1 rounded">👦 MASCULINO</h5>
                        <ul className="text-xs space-y-2 font-medium">
                          <li className="border-b border-stone-100 pb-1">Gepeto</li>
                          <li className="border-b border-stone-100 pb-1">Grillo</li>
                        </ul>
                      </div>
                      <div className="border border-dashed border-stone-300 p-3 rounded-xl">
                        <h5 className="font-bold text-xs text-rose-600 mb-2 bg-rose-50 py-1 rounded">👧 FEMENINO</h5>
                        <ul className="text-xs space-y-2 font-medium">
                          <li className="border-b border-stone-100 pb-1">Hada</li>
                          <li className="border-b border-stone-100 pb-1">Marioneta</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-stone-800 uppercase mb-2">2. Escribe el PLURAL de estos elementos de madera:</h4>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="bg-stone-50 p-2 rounded border border-stone-200">
                        <span>Reloj 🕰️</span>
                        <div className="border-b border-dashed border-stone-400 w-full h-5 mt-2"></div>
                      </div>
                      <div className="bg-stone-50 p-2 rounded border border-stone-200">
                        <span>Niño 👦</span>
                        <div className="border-b border-dashed border-stone-400 w-full h-5 mt-2"></div>
                      </div>
                      <div className="bg-stone-50 p-2 rounded border border-stone-200">
                        <span>Estrella ⭐️</span>
                        <div className="border-b border-dashed border-stone-400 w-full h-5 mt-2"></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-stone-800 uppercase mb-2">3. Mayúsculas: ¿Cuáles de estos nombres propios de personajes se escriben con Mayúscula?</h4>
                    <p className="text-[11px] text-stone-500 mb-2">Coloca un círculo alrededor de las que deban llevar mayúscula inicial.</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="px-3 py-1.5 bg-stone-100 rounded-full text-xs font-bold font-mono">gepeto</span>
                      <span className="px-3 py-1.5 bg-stone-100 rounded-full text-xs font-bold font-mono">pinocho</span>
                      <span className="px-3 py-1.5 bg-stone-100 rounded-full text-xs font-bold font-mono">manzana</span>
                      <span className="px-3 py-1.5 bg-stone-100 rounded-full text-xs font-bold font-mono">madrina</span>
                      <span className="px-3 py-1.5 bg-stone-100 rounded-full text-xs font-bold font-mono">pepito</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ST 4 - Whale Reading & Coins */}
              {selectedStationIndex === 3 && (
                <div className="space-y-6">
                  {/* Reading */}
                  <div>
                    <h4 className="text-xs font-bold text-stone-800 uppercase mb-2">1. Lectura corta y Comprensión:</h4>
                    <p className="text-xs leading-relaxed text-stone-700 bg-amber-50/50 border border-amber-100 p-3 rounded-lg font-sans">
                      “Gepeto vive en el vientre de la gran ballena. Está muy triste. Pinocho llega nadando y le da un abrazo muy fuerte.
                      Pepito Grillo propone encender un fuego con ramas de madera y asustar a la ballena. ¡Achís!"
                    </p>
                    {/* Compreh questions */}
                    <div className="mt-3 space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-stone-800">a) ¿Quién vive en el vientre de la ballena?</p>
                        <div className="flex gap-4 mt-1">
                          <label className="flex items-center gap-1.5 text-xs">
                            <input type="checkbox" className="rounded" /> Gepeto
                          </label>
                          <label className="flex items-center gap-1.5 text-xs">
                            <input type="checkbox" className="rounded" /> El Hada Azul
                          </label>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-stone-800">b) ¿Cómo consiguen asustar a la gran ballena?</p>
                        <div className="flex gap-4 mt-1">
                          <label className="flex items-center gap-1.5 text-xs">
                            <input type="checkbox" className="rounded" /> Cantando una canción
                          </label>
                          <label className="flex items-center gap-1.5 text-xs">
                            <input type="checkbox" className="rounded" /> Encendiendo un fuego
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coin Solver */}
                  <div>
                    <h4 className="text-xs font-bold text-stone-800 uppercase mb-2">2. Monedas de euro: Consigue exactamente 3,50 € para canjear por madera:</h4>
                    <p className="text-[11px] text-stone-500 mb-3">Dibuja o colorea las monedas de abajo que vas a entregar a la ventanilla:</p>
                    <div className="flex justify-center gap-4">
                      {/* 2€ */}
                      <div className="w-12 h-12 rounded-full border-4 border-amber-600 bg-amber-100 flex items-center justify-center font-bold text-stone-850 text-xs shadow-sm">
                        2 €
                      </div>
                      {/* 1€ */}
                      <div className="w-11 h-11 rounded-full border-4 border-stone-400 bg-stone-100 flex items-center justify-center font-bold text-stone-700 text-xs shadow-sm">
                        1 €
                      </div>
                      {/* 50c */}
                      <div className="w-10 h-10 rounded-full border-4 border-amber-500 bg-amber-50 flex items-center justify-center font-bold text-stone-700 text-[10px] shadow-sm">
                        50 ¢
                      </div>
                      {/* 20c */}
                      <div className="w-9 h-9 rounded-full border-2 border-amber-500 bg-amber-50 flex items-center justify-center font-bold text-stone-700 text-[10px] shadow-sm">
                        20 ¢
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dilemma section inside the worksheet */}
            <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-4 mb-6">
              <strong className="text-sky-900 text-xs uppercase tracking-wider block mb-2">🦗 LA PREGUNTA DE PEPITO GRILLO (Valores)</strong>
              <p className="text-xs text-stone-700 mb-3 font-medium">
                {STATIONS_DATA[selectedStationIndex].dilema.question}
              </p>
              <div className="space-y-2">
                {STATIONS_DATA[selectedStationIndex].dilema.options.map((opt, i) => (
                  <label key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-stone-200 text-xs hover:border-sky-300 cursor-pointer">
                    <input type="radio" name={`dilema-${selectedStationIndex}`} className="mt-0.5" />
                    <span className="text-stone-700 font-sans leading-tight">{opt.text}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Bottom Key Code Target */}
            <div className="bg-amber-50 border-2 border-amber-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="font-bold text-[13px] text-amber-950 uppercase tracking-wide block">🔑 LLAVE MÁGICA DE ESTA ESTACIÓN:</span>
                <span className="text-[10px] text-amber-800 font-sans">
                  Escribe la palabra secreta gigante que has descubierto en mayúsculas.
                </span>
              </div>
              <div className="w-48 h-10 border-2 border-dashed border-amber-800 bg-white rounded-lg flex items-center justify-center font-mono font-extrabold text-lg text-amber-950">
                [ _ _ _ _ _ _ _ _ _ ]
              </div>
            </div>
          </div>
        )}

        {/* Document 3: Cutout Keys / Tokens */}
        {selectedDoc === 'keys' && (
          <div className="bg-white w-[100%] max-w-[800px] border border-stone-300 shadow-xl p-8 sm:p-14 font-sans text-stone-800 print:shadow-none print:border-0 print:p-4 print:max-w-none">
            <div className="text-center mb-6">
              <h1 className="font-sans font-extrabold text-stone-900 text-xl tracking-wide uppercase">
                ⚙️ Llaves y Códigos Recortables para Profesores
              </h1>
              <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                Corta por las líneas de puntos e introduce cada llave dentro de un cofre o sobre al finalizar cada estación.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {STATIONS_DATA.map((st, idx) => (
                <div key={st.id} className="border-2 border-dashed border-amber-700 rounded-3xl p-6 bg-amber-50/20 relative flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 bg-amber-800 text-white text-[9px] font-sans font-bold px-3 py-1 rounded-bl-xl tracking-widest uppercase">
                    ESTACIÓN {idx + 1}
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-amber-100 border-2 border-amber-800 rounded-full flex items-center justify-center text-amber-900 text-xl font-bold flex-shrink-0 animate-pulse">
                      🔑
                    </div>
                    <div>
                      <h3 className="font-sans font-extrabold text-stone-800 text-xs tracking-wider uppercase">
                        LLAVE DE LA VIRTUD
                      </h3>
                      <p className="text-[10px] text-stone-400 font-sans">Misterio del Hada Azul</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center py-6 bg-white border border-amber-100 rounded-2xl shadow-sm">
                    <span className="text-[9px] text-amber-800 uppercase tracking-widest font-mono mb-1">Palabra secreta:</span>
                    <span className="font-mono text-xl font-extrabold tracking-widest text-amber-950 px-4 py-1.5 bg-amber-50 rounded-lg">
                      {st.secretWord}
                    </span>
                  </div>

                  <p className="text-[9px] text-stone-400 text-center mt-3 italic">
                    Cut along the dashed lines • 1º de Educación Primaria
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Document 4: Blue Fairy Assistant Diploma */}
        {selectedDoc === 'diploma' && (
          <div className="bg-white w-[100%] max-w-[800px] border-8 border-amber-900 shadow-xl p-8 sm:p-14 font-sans text-stone-800 relative select-none print:shadow-none print:border-8 print:p-8 print:max-w-none print:m-0">
            {/* Soft magic backgrounds and star overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-50/40 via-white/40 to-blue-50/40 opacity-80 pointer-events-none"></div>

            {/* Double border styling */}
            <div className="border-4 border-double border-amber-600 p-8 rounded-xl text-center relative bg-white/95">
              <span className="text-3xl block mb-2">🧚‍♀️</span>
              <h1 className="font-sans font-extrabold text-stone-900 text-3xl tracking-wide uppercase mt-1">
                DIPLOMA DE HONOR
              </h1>
              <p className="text-amber-800 font-bold tracking-widest text-xs uppercase mt-1">
                Ayudante del Hada Azul
              </p>

              <div className="my-8">
                <p className="text-xs text-stone-500 italic font-sans mb-3">Este diploma certifica que:</p>
                <div className="text-xl font-serif italic text-amber-950 font-extrabold border-b-2 border-amber-400 max-w-sm mx-auto pb-1 mt-2 tracking-wide font-sans">
                  {diplomaName || '________________________'}
                </div>
                <p className="text-xs text-stone-500 italic mt-3 font-sans max-w-md mx-auto">
                  Ha resuelto con éxito las cuatro estaciones educativas basadas en la historia de Pinocho,
                  demostrando excelentes valores curriculares como la <strong>sinceridad</strong>, la
                  <strong> bondad</strong>, el <strong>esfuerzo</strong> y el hermoso don de la <strong>amistad</strong>.
                </p>
              </div>

              {/* Badges alignment and signatures */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-6 text-xs border-t border-stone-200/80 pt-6">
                <div className="text-center font-sans sm:text-left flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full border-2 border-dashed border-amber-800 flex items-center justify-center text-lg shadow-sm">
                    📜
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Sello de Calidad</p>
                    <p className="text-[10px] text-stone-400">Pinocho es libre</p>
                  </div>
                </div>

                <div className="flex gap-8 text-[11px] font-sans">
                  <div className="text-center">
                    <p className="font-semibold border-b border-stone-300 w-28 pb-1 mx-auto text-stone-400">
                      🪄 Varita
                    </p>
                    <p className="font-bold text-stone-850 mt-1">El Hada Azul</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold border-b border-stone-300 w-28 pb-1 mx-auto text-stone-400">
                      🦗 Grillo
                    </p>
                    <p className="font-bold text-stone-850 mt-1">Pepito Grillo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60 mt-6 text-xs text-stone-500 font-sans flex items-start gap-2.5 print:hidden">
        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-stone-700">Consejo de uso pedagógico: </strong>
          Te aconsejamos imprimir un diploma para cada mesa de equipo o para cada alumno al final de la sesión.
          Cada material ha sido estructurado meticulosamente sin textos largos para ser manejable de forma autónoma.
        </div>
      </div>
    </div>
  );
};
