
import React from 'react';
import { LEADERBOARD_DATA } from '../constants';

const LeaderboardSection: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-3">
            <i className="fa-solid fa-trophy"></i>
            Bảng Xếp Hạng
          </h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {LEADERBOARD_DATA.map((player, index) => (
            <div key={player.id} className="flex items-center p-5 hover:bg-gray-50 transition">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black mr-4 ${
                index === 0 ? 'bg-yellow-400 text-white' : 
                index === 1 ? 'bg-gray-300 text-white' :
                index === 2 ? 'bg-amber-600 text-white' : 'text-gray-400'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{player.name}</h4>
                <div className="flex gap-2 mt-1">
                  {player.badges.map((badge, bIdx) => (
                    <span key={bIdx} className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-blue-600">{player.score.toLocaleString()}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ĐIỂM</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 text-center">
          <button className="text-sm font-bold text-blue-600 hover:underline">
            Xem toàn bộ bảng xếp hạng
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardSection;
