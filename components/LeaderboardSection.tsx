
import React, { useState, useEffect } from 'react';
import { getMainLeaderboard, MainLeaderboardEntry } from '../utils/leaderboard';

const LeaderboardSection: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<MainLeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Refresh data khi component mount
    loadLeaderboard();

    // Auto-refresh mỗi 10 giây (giả lập real-time)
    const interval = setInterval(() => {
      loadLeaderboard();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const loadLeaderboard = async () => {
    setIsLoading(true);
    const data = await getMainLeaderboard();
    setLeaderboard(data);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white ring-4 ring-blue-50">
        <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 text-9xl transform rotate-12 translate-x-10 -translate-y-10">🏆</div>
          <div className="absolute bottom-0 left-0 opacity-10 text-8xl transform -rotate-12 -translate-x-10 translate-y-10">⭐</div>
          
          <h2 className="text-3xl font-black flex items-center justify-center gap-3 relative z-10 drop-shadow-md">
            <i className="fa-solid fa-crown text-yellow-300"></i>
            Bảng Xếp Hạng Tổng
          </h2>
          <p className="text-blue-100 mt-2 font-medium relative z-10">Vinh danh những tay lái kiên trì nhất</p>
        </div>
        
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md bg-opacity-90">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Cập nhật trực tiếp
          </div>
          <button 
            onClick={loadLeaderboard} 
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition disabled:opacity-50 active:scale-95"
          >
            <i className={`fa-solid fa-rotate ${isLoading ? 'animate-spin' : ''}`}></i>
            Làm mới
          </button>
        </div>
        
        {leaderboard.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {leaderboard.slice(0, 50).map((player, index) => (
              <div 
                key={player.playerName} 
                className={`flex items-center p-5 transition-all duration-300 hover:bg-blue-50/50 group ${
                  index < 3 ? 'bg-gradient-to-r from-white to-transparent' : ''
                }`}
              >
                <div className="relative mr-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform group-hover:scale-110 transition-transform ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-white ring-4 ring-yellow-100' : 
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white ring-4 ring-gray-100' :
                    index === 2 ? 'bg-gradient-to-br from-orange-300 to-orange-500 text-white ring-4 ring-orange-100' : 
                    'bg-white text-gray-400 border-2 border-gray-100'
                  }`}>
                    {index === 0 ? '1' : index === 1 ? '2' : index === 2 ? '3' : index + 1}
                  </div>
                  {index < 3 && (
                    <div className="absolute -top-2 -right-2 text-xl drop-shadow-md animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                      {index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold text-lg truncate ${index < 3 ? 'text-gray-900' : 'text-gray-700'}`}>
                    {player.playerName}
                  </h4>
                  <div className="flex flex-wrap gap-3 mt-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                      <i className="fa-solid fa-gamepad"></i>
                      {player.totalGames} ván
                    </span>
                  </div>
                </div>

                <div className="text-right pl-4">
                  <p className={`text-2xl font-black tracking-tight ${
                    index === 0 ? 'text-yellow-500' : 
                    index === 1 ? 'text-gray-500' :
                    index === 2 ? 'text-orange-500' : 'text-blue-600'
                  }`}>
                    {player.totalScore.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Tổng điểm</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 bg-gray-50/50">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <i className="fa-solid fa-trophy text-4xl text-gray-300"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Bảng xếp hạng đang trống</h3>
            <p className="text-gray-500 max-w-xs mx-auto">Hãy là người đầu tiên ghi danh vào bảng vàng!</p>
          </div>
        )}

        <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
          <p className="text-xs font-medium text-gray-400 flex items-center justify-center gap-2">
            <i className="fa-solid fa-infinity"></i>
            Điểm sẽ được tích lũy sau mỗi lần chơi
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardSection;
