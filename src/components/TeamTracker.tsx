import React from 'react';
import { Team, TeamId } from '../types';
import { Users, Key, Star, Edit3, CheckCircle2 } from 'lucide-react';
import { soundEffects } from './SoundEffects';

interface TeamTrackerProps {
  teams: Team[];
  selectedTeamId: TeamId;
  onSelectTeam: (id: TeamId) => void;
  onToggleKey: (teamId: TeamId, stationId: 'station1' | 'station2' | 'station3' | 'station4') => void;
  onRenameTeam: (teamId: TeamId, newName: string) => void;
}

export const TeamTracker: React.FC<TeamTrackerProps> = ({
  teams,
  selectedTeamId,
  onSelectTeam,
  onToggleKey,
  onRenameTeam,
}) => {
  const getProgressCount = (team: Team) => {
    return Object.values(team.unlockedKeys).filter(Boolean).length;
  };

  const getPercentage = (team: Team) => {
    return (getProgressCount(team) / 4) * 100;
  };

  return (
    <div className="bg-white rounded-[40px] border-8 border-[#3B82F6] p-6 shadow-2xl text-[#5C4033]">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-3.5 bg-yellow-400 text-slate-800 rounded-3xl border-2 border-yellow-500 flex items-center justify-center">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-sans font-black text-xl text-[#3B82F6] uppercase">
            Marcador de los 4 Equipos
          </h3>
          <p className="text-xs text-stone-605 font-bold font-sans">
            Registra el nombre de tus mesas y pulsa en las llaves que vayan resolviendo en físico.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teams.map((team) => {
          const progress = getProgressCount(team);
          const isSelected = selectedTeamId === team.id;

          // Define team-specific theme colors
          let teamColorTheme = 'border-[#10B981]';
          if (team.id === 'team2') teamColorTheme = 'border-[#3B82F6]';
          if (team.id === 'team3') teamColorTheme = 'border-[#EF4444]';
          if (team.id === 'team4') teamColorTheme = 'border-[#FBBF24]';

          return (
            <div
              key={team.id}
              onClick={() => {
                onSelectTeam(team.id);
                soundEffects.playMagic();
              }}
              className={`rounded-[30px] p-5 border-4 transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? `${teamColorTheme} bg-yellow-50/50 shadow-2xl scale-[1.02] ring-8 ring-yellow-400/20`
                  : 'border-stone-200 bg-stone-50 hover:bg-white hover:border-[#3B82F6]'
              }`}
            >
              {isSelected && (
                <div className="absolute -top-4 -right-1 bg-yellow-400 border-2 border-yellow-500 text-slate-900 rounded-full p-1.5 shadow-lg animate-bounce">
                  <Star className="w-4 h-4 fill-yellow-100" />
                </div>
              )}

              {/* Header and editable name */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-4 h-4 rounded-full border border-black/10 ${team.color}`} />
                    <span className="text-[10px] font-sans font-black text-stone-400 tracking-wider uppercase">
                      Ranura {team.id.replace('team', '')}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="text-[9px] bg-[#3B82F6] text-white px-2 py-0.5 rounded-full font-sans font-black uppercase">
                      JUGANDO
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 group bg-white border-2 border-stone-200 rounded-2xl px-2.5 py-1">
                  <input
                    type="text"
                    value={team.name}
                    onChange={(e) => onRenameTeam(team.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Avoid triggering selectTeam twice when clicking input
                    className="font-sans font-black text-xs text-stone-800 bg-transparent border-none focus:outline-none rounded w-full transition-all"
                  />
                  <Edit3 className="w-3.5 h-3.5 text-stone-450 group-hover:text-stone-600 flex-shrink-0" />
                </div>

                {/* Progress bar info */}
                <div className="mt-4">
                  <div className="flex justify-between items-center text-[10px] text-stone-605 font-bold mb-1 uppercase">
                    <span>Llaves mágicas</span>
                    <span className="font-extrabold text-[#5C4033]">{progress} de 4</span>
                  </div>
                  <div className="w-full bg-stone-205 h-3 rounded-full overflow-hidden border border-stone-300">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${team.color}`}
                      style={{ width: `${getPercentage(team)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Lock check selectors */}
              <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t-2 border-dashed border-stone-200">
                {(['station1', 'station2', 'station3', 'station4'] as const).map((station, idx) => {
                  const unlocked = team.unlockedKeys[station];
                  return (
                    <button
                      key={station}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleKey(team.id, station);
                        if (!unlocked) {
                          soundEffects.playCorrect();
                        } else {
                          soundEffects.playMagic();
                        }
                      }}
                      className={`flex flex-col items-center justify-center p-2 rounded-2xl border-4 transition-all duration-150 ${
                        unlocked
                          ? 'bg-yellow-400 border-yellow-500 text-slate-800 shadow-[0_4px_0_#D97706]'
                          : 'bg-white border-stone-300 text-stone-300 hover:border-blue-300 hover:text-[#3B82F6]'
                      }`}
                      title={`Llave ${idx + 1}`}
                    >
                      <Key className={`w-4 h-4 ${unlocked ? 'animate-bounce' : ''}`} />
                      <span className="text-[9px] font-sans font-black mt-0.5">L{idx + 1}</span>
                    </button>
                  );
                })}
              </div>

              {progress === 4 && (
                <div className="mt-3.5 bg-green-100 border-2 border-green-300 text-emerald-805 text-[10px] font-sans font-black rounded-xl py-1.5 px-2 flex items-center justify-center gap-1 uppercase">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-[#10B981]" />
                  <span>¡Reto Final Listo!</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
