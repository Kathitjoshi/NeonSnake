import { useGameStore } from '../store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Trophy } from 'lucide-react';

export function UI() {
  const { gameState, playerId, joinGame, leaveGame, nickname, setNickname } = useGameStore();

  const player = playerId && gameState ? gameState.players[playerId] : null;
  const isAlive = player?.state === 'alive';
  const isDead = player?.state === 'dead';

  const handleOpenNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-start pointer-events-auto relative">
        <div className="flex flex-col gap-2 z-10">
          <h1 className="text-3xl font-black text-white tracking-tighter" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
            NEON.SNAKE
          </h1>
          {isAlive && (
            <div className="flex items-center gap-3">
              <div className="text-xl font-mono text-white/80 font-bold">
                Length: {Math.floor(player.score)}
              </div>
              <button
                onClick={leaveGame}
                className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 hover:border-red-500/60 text-red-400 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-colors pointer-events-auto z-10 cursor-pointer"
              >
                Leave Game
              </button>
            </div>
          )}
        </div>
        
        {/* Controls Hint */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 flex gap-2 opacity-80 pointer-events-none hidden sm:flex">
          <div className="flex items-center gap-2 text-xs font-mono text-white bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded text-white">A</span>
            <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded text-white">D</span>
            <span className="text-white/70 uppercase tracking-wider text-[10px]">Turn</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-white bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded text-white">SPACE</span>
            <span className="text-white/70 uppercase tracking-wider text-[10px]">Boost</span>
          </div>
        </div>

        <button
          onClick={handleOpenNewTab}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-bold transition-colors z-10"
        >
          <ExternalLink size={16} />
          <span>New Tab</span>
        </button>
      </div>

      {/* Leaderboard */}
      {gameState && gameState.leaderboard.length > 0 && (
        <div className="absolute top-20 right-4 w-64 bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 pointer-events-auto">
          <div className="flex items-center gap-2 mb-4 text-white/80 font-semibold">
            <Trophy size={18} className="text-yellow-400" />
            <h2>LEADERBOARD</h2>
          </div>
          <div className="flex flex-col gap-2">
            {gameState.leaderboard.map((entry, i) => (
              <div key={entry.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-white/40 w-4">{i + 1}.</span>
                  <span style={{ color: entry.color }} className="font-medium truncate max-w-[120px]">
                    {entry.name}
                  </span>
                </div>
                <span className="font-mono text-white/80">{entry.score}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Menus */}
      <AnimatePresence>
        {(!player || isDead) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/60 backdrop-blur-sm"
          >
            <div className="bg-zinc-900/90 p-8 rounded-3xl border border-white/10 shadow-2xl max-w-md w-full flex flex-col items-center gap-6">
              {isDead && (
                <div className="text-center">
                  <h2 className="text-4xl font-black text-red-500 mb-2">YOU DIED</h2>
                  <p className="text-white/60">Final Length: {Math.floor(player.score)}</p>
                </div>
              )}
              
              {!isDead && (
                <div className="text-center w-full">
                  <h2 className="text-3xl font-black text-white mb-2 tracking-tight">JOIN ARENA</h2>
                  <p className="text-white/60 text-sm mb-6">Steer with A/D or Left/Right. Space to boost.</p>
                  
                  <div className="w-full text-left mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-1.5 font-bold">
                      NICKNAME
                    </label>
                    <input
                      type="text"
                      maxLength={15}
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Enter snake nickname..."
                      className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 focus:bg-white/10 active:bg-white/10 border border-white/10 focus:border-white/20 rounded-xl text-white font-medium placeholder-white/30 outline-none transition-all pointer-events-auto text-center"
                    />
                  </div>
                </div>
              )}
              
              <div className="w-full flex flex-col gap-2 pointer-events-auto">
                <button
                  onClick={() => joinGame(nickname)}
                  className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors active:scale-95 cursor-pointer"
                >
                  {isDead ? 'RESPAWN' : 'PLAY'}
                </button>
                {isDead && (
                  <button
                    onClick={leaveGame}
                    className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all active:scale-95 cursor-pointer border border-white/5"
                  >
                    BACK TO LOBBY
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
