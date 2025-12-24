
import React, { useState, useEffect } from 'react';

const MultiplayerMock: React.FC = () => {
  const [myProgress, setMyProgress] = useState(10);
  const [opponentProgress, setOpponentProgress] = useState(10);
  const [gameStatus, setGameStatus] = useState<'finding' | 'racing'>('finding');

  // Simulator bot logic
  useEffect(() => {
    let interval: any;
    if (gameStatus === 'racing') {
        interval = setInterval(() => {
            // Randomly advance opponent
            setOpponentProgress(prev => Math.min(prev + Math.random() * 5, 90));
            // Simulate player moving slowly (waiting for answer input mock)
            setMyProgress(prev => Math.min(prev + 0.5, 88));
        }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStatus]);

  const startGame = () => {
      setGameStatus('racing');
      setMyProgress(10);
      setOpponentProgress(10);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/50">
        <div className="text-center mb-8">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Beta</span>
            <h2 className="text-3xl font-black text-gray-800 mt-2">Đua Đối Kháng</h2>
            <p className="text-gray-500">Thi đấu kiến thức luật giao thông thời gian thực</p>
        </div>
        
        {gameStatus === 'finding' ? (
            <div className="text-center py-10">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <i className="fa-solid fa-search text-3xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Đang tìm đối thủ...</h3>
                <p className="text-gray-500 mb-8">Hệ thống đang ghép cặp ngẫu nhiên</p>
                <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition"
                >
                    Giả lập tìm thấy trận
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-6">
                {/* Your Section */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-green-400 bg-green-50/50 p-4">
                    <div className="flex justify-between items-center mb-3 relative z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center font-bold text-green-700">B</div>
                            <span className="font-bold text-green-900">Bạn</span>
                        </div>
                        <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded font-bold">1st</span>
                    </div>
                    
                    {/* Track */}
                    <div className="h-16 bg-gray-200/50 rounded-xl relative overflow-hidden flex items-center px-2">
                        <div className="absolute w-full h-1 border-t border-dashed border-gray-400"></div>
                        <div 
                            className="absolute text-3xl transition-all duration-1000 ease-linear"
                            style={{ left: `${myProgress}%` }}
                        >
                            🚗
                        </div>
                    </div>
                </div>

                {/* Opponent Section */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-red-400 bg-red-50/50 p-4">
                    <div className="flex justify-between items-center mb-3 relative z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center font-bold text-red-700">O</div>
                            <span className="font-bold text-red-900">Đối thủ (Bot)</span>
                        </div>
                        <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded font-bold">2nd</span>
                    </div>
                    
                    {/* Track */}
                    <div className="h-16 bg-gray-200/50 rounded-xl relative overflow-hidden flex items-center px-2">
                        <div className="absolute w-full h-1 border-t border-dashed border-gray-400"></div>
                        <div 
                            className="absolute text-3xl transition-all duration-1000 ease-linear grayscale"
                            style={{ left: `${opponentProgress}%` }}
                        >
                            🏎️
                        </div>
                    </div>
                </div>

                {/* Event Feed */}
                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm space-y-2">
                    <div className="flex items-center gap-2 text-green-700">
                        <i className="fa-solid fa-check-circle"></i> Bạn đã trả lời đúng câu hỏi #1
                    </div>
                     <div className="flex items-center gap-2 text-red-700 opacity-70">
                        <i className="fa-solid fa-triangle-exclamation"></i> Đối thủ gặp đèn đỏ (trả lời chậm)
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default MultiplayerMock;
