
import React, { useState, useEffect } from 'react';
import DailyChallenge from './DailyChallenge';
import { 
  hasPlayedToday, 
  getTimeUntilReset, 
  getTodayLeaderboard, 
  getLastResult,
  DailyChallengeResult 
} from '../utils/dailyChallenge';

interface ChallengeSectionProps {
  playerName: string;
}

const ChallengeSection: React.FC<ChallengeSectionProps> = ({ playerName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [timeUntilReset, setTimeUntilReset] = useState(getTimeUntilReset());
  const [leaderboard, setLeaderboard] = useState<DailyChallengeResult[]>([]);
  const [myResult, setMyResult] = useState<DailyChallengeResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Update countdown mỗi phút
    const interval = setInterval(() => {
      setTimeUntilReset(getTimeUntilReset());
    }, 60000);

    loadData();

    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [played, board, result] = await Promise.all([
        hasPlayedToday(),
        getTodayLeaderboard(),
        getLastResult()
      ]);
      
      setHasPlayed(played);
      setLeaderboard(board);
      setMyResult(result);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartChallenge = () => {
    setIsPlaying(true);
  };

  const handleChallengeComplete = async (result: DailyChallengeResult) => {
    setHasPlayed(true);
    setMyResult(result);
    setIsPlaying(false);
    await loadData();
  };

  const handleBack = async () => {
    setIsPlaying(false);
    await loadData();
  };

  if (isPlaying) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <DailyChallenge onBack={handleBack} onComplete={handleChallengeComplete} playerName={playerName} />
      </div>
    );
  }

  // Tìm thứ hạng của người chơi
  const myRank = myResult ? leaderboard.findIndex(r => r.completedAt === myResult.completedAt) + 1 : 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-white ring-4 ring-purple-50">
        {/* Header với countdown */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 text-9xl transform rotate-12 translate-x-10 -translate-y-10">🎯</div>
          <div className="absolute bottom-0 left-0 opacity-10 text-8xl transform -rotate-12 -translate-x-10 translate-y-10">⚡</div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Sự kiện hàng ngày
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">Thử Thách Hôm Nay</h2>
              <p className="text-purple-100 text-lg font-medium max-w-md">Cùng một bộ câu hỏi, cùng một cơ hội. Ai sẽ là người xuất sắc nhất?</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[160px]">
              <p className="text-xs font-bold text-purple-200 uppercase tracking-wider mb-1">Reset sau</p>
              <p className="text-3xl font-black font-mono tracking-widest">{timeUntilReset}</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 bg-gray-50/50">
          {/* Kết quả cá nhân */}
          {myResult && (
            <div className="mb-10 animate-in slide-in-from-bottom-4 duration-700 delay-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl">📊</span> 
                  Kết quả của bạn
                </h3>
                {myRank > 0 && (
                  <div className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-xl font-bold flex items-center gap-2 border border-yellow-200 shadow-sm">
                    <i className="fa-solid fa-trophy"></i>
                    Hạng #{myRank}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition group">
                  <p className="text-xs text-purple-500 font-bold uppercase tracking-wider mb-2 group-hover:text-purple-600">Điểm số</p>
                  <p className="text-4xl font-black text-purple-700 group-hover:scale-110 transition-transform origin-left">{myResult.score}</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition group">
                  <p className="text-xs text-green-500 font-bold uppercase tracking-wider mb-2 group-hover:text-green-600">Độ chính xác</p>
                  <p className="text-4xl font-black text-green-700 group-hover:scale-110 transition-transform origin-left">{myResult.accuracy.toFixed(0)}%</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition group">
                  <p className="text-xs text-blue-500 font-bold uppercase tracking-wider mb-2 group-hover:text-blue-600">Phản ứng</p>
                  <p className="text-4xl font-black text-blue-700 group-hover:scale-110 transition-transform origin-left">{myResult.avgResponseTime.toFixed(1)}s</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition group">
                  <p className="text-xs text-red-500 font-bold uppercase tracking-wider mb-2 group-hover:text-red-600">Vi phạm</p>
                  <p className="text-4xl font-black text-red-700 group-hover:scale-110 transition-transform origin-left">{myResult.violations}</p>
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard Top 10 */}
          <div className="mb-10">
            <h3 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-xl">🏆</span> 
              Bảng Xếp Hạng Hôm Nay
            </h3>
            
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              {leaderboard.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {leaderboard.slice(0, 10).map((result, index) => (
                    <div 
                      key={result.completedAt}
                      className={`p-5 flex items-center gap-5 transition-all hover:bg-gray-50 ${
                        myResult?.completedAt === result.completedAt ? 'bg-purple-50/50' : ''
                      }`}
                    >
                      <div className={`w-12 h-12 flex-shrink-0 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm ${
                        index === 0 ? 'bg-yellow-400 text-white ring-4 ring-yellow-100' :
                        index === 1 ? 'bg-gray-300 text-white ring-4 ring-gray-100' :
                        index === 2 ? 'bg-orange-400 text-white ring-4 ring-orange-100' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {index === 0 ? '1' : index === 1 ? '2' : index === 2 ? '3' : index + 1}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-gray-800 text-lg truncate">
                            {result.playerName}
                          </p>
                          {myResult?.completedAt === result.completedAt && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold uppercase rounded-full">Bạn</span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs font-medium text-gray-500">
                          <span className="flex items-center gap-1"><i className="fa-solid fa-check text-green-500"></i> {result.accuracy.toFixed(0)}%</span>
                          <span className="flex items-center gap-1"><i className="fa-solid fa-bolt text-blue-500"></i> {result.avgResponseTime.toFixed(1)}s</span>
                          <span className="flex items-center gap-1"><i className="fa-solid fa-triangle-exclamation text-red-500"></i> {result.violations} lỗi</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`text-2xl font-black ${
                          index === 0 ? 'text-yellow-500' : 
                          index === 1 ? 'text-gray-500' :
                          index === 2 ? 'text-orange-500' : 'text-gray-800'
                        }`}>{result.score}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">điểm</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-flag-checkered text-3xl text-gray-300"></i>
                  </div>
                  <p className="font-bold text-gray-600 text-lg">Chưa có ai tham gia hôm nay</p>
                  <p className="text-gray-400">Hãy là người đầu tiên ghi danh!</p>
                </div>
              )}
            </div>
          </div>

          {/* Nút chơi */}
          {hasPlayed ? (
            <div className="text-center p-8 bg-white rounded-3xl border-2 border-dashed border-green-200 shadow-sm">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl animate-bounce">
                <i className="fa-solid fa-check"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Bạn đã hoàn thành thử thách hôm nay!</h3>
              <p className="text-gray-500">Hãy quay lại vào ngày mai để tiếp tục chinh phục thử thách mới.</p>
            </div>
          ) : (
            <button 
              onClick={handleStartChallenge}
              className="group relative w-full py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white font-black text-xl rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center justify-center gap-3">
                <i className="fa-solid fa-play"></i>
                BẮT ĐẦU THỬ THÁCH NGAY
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeSection;
