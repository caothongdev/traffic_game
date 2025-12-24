
import React, { useState } from 'react';
import { View } from './types';
import QuizGame from './components/QuizGame';
import MultiplayerMock from './components/MultiplayerMock';
import ChallengeSection from './components/ChallengeSection';
import LeaderboardSection from './components/LeaderboardSection';
import NameEntry from './components/NameEntry';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.MENU);
  const [playerName, setPlayerName] = useState<string>('');
  const [showNameEntry, setShowNameEntry] = useState(false);
  const [pendingView, setPendingView] = useState<View | null>(null);

  const handleViewChange = (view: View) => {
    // Yêu cầu nhập tên cho các chế độ chơi
    if ((view === View.GAME || view === View.CHALLENGE || view === View.MULTIPLAYER) && !playerName) {
      setPendingView(view);
      setShowNameEntry(true);
    } else {
      setCurrentView(view);
    }
  };

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    setShowNameEntry(false);
    if (pendingView) {
      setCurrentView(pendingView);
      setPendingView(null);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case View.MENU:
        return (
          <div className="w-full max-w-md mx-auto px-4 mt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col gap-5">
            
            {/* Main Play Button - Hero */}
            <button 
              onClick={() => handleViewChange(View.GAME)}
              className="relative group w-full p-8 rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-300 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 active:scale-95 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <i className="fa-solid fa-flag-checkered text-9xl transform rotate-12"></i>
              </div>
              <div className="relative z-10 flex flex-col items-start">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-wider">Chế độ chính</span>
                <div className="flex items-center gap-4">
                  <div className="bg-white text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:rotate-90 transition-transform duration-500">
                    <i className="fa-solid fa-play"></i>
                  </div>
                  <div className="text-left">
                    <p className="text-3xl font-black leading-none">Chơi Ngay</p>
                    <p className="text-blue-100 text-sm mt-1 font-medium">Bắt đầu hành trình an toàn</p>
                  </div>
                </div>
              </div>
            </button>

            {/* Grid for secondary options */}
            <div className="grid grid-cols-2 gap-4">
                <button 
                onClick={() => handleViewChange(View.CHALLENGE)}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-lg border border-transparent hover:border-purple-200 hover:shadow-xl transition active:scale-95 group"
                >
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-brain"></i>
                </div>
                <p className="font-bold text-gray-800">Thử Thách</p>
                <p className="text-xs text-gray-400">Hàng ngày</p>
                </button>

                <button 
                onClick={() => handleViewChange(View.MULTIPLAYER)}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-lg border border-transparent hover:border-red-200 hover:shadow-xl transition active:scale-95 group"
                >
                <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-gamepad"></i>
                </div>
                <p className="font-bold text-gray-800">Đối Kháng</p>
                <p className="text-xs text-gray-400">PvP Online</p>
                </button>
            </div>

            <button 
              onClick={() => handleViewChange(View.LEADERBOARD)}
              className="flex items-center justify-between p-5 bg-white rounded-3xl shadow-lg border border-transparent hover:border-yellow-200 transition active:scale-95 group"
            >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center text-xl">
                    <i className="fa-solid fa-trophy"></i>
                 </div>
                 <div className="text-left">
                    <p className="font-bold text-gray-800">Bảng Xếp Hạng</p>
                    <p className="text-xs text-gray-400">Top tay lái lụa</p>
                 </div>
              </div>
              <i className="fa-solid fa-chevron-right text-gray-300 group-hover:text-yellow-500 transition"></i>
            </button>
          </div>
        );
      case View.GAME:
        return <QuizGame onBack={() => setCurrentView(View.MENU)} playerName={playerName} />;
      case View.CHALLENGE:
        return (
          <div className="flex flex-col items-center w-full">
            <ChallengeSection playerName={playerName} />
          </div>
        );
      case View.MULTIPLAYER:
        return (
          <div className="flex flex-col items-center w-full">
            <MultiplayerMock />
            <button onClick={() => setCurrentView(View.MENU)} className="mt-8 px-6 py-2 bg-white rounded-full shadow text-gray-500 font-bold hover:text-blue-600 transition flex items-center gap-2">
              <i className="fa-solid fa-house"></i> Menu
            </button>
          </div>
        );
      case View.LEADERBOARD:
        return (
          <div className="flex flex-col items-center w-full">
            <LeaderboardSection />
            <button onClick={() => setCurrentView(View.MENU)} className="mt-8 px-6 py-2 bg-white rounded-full shadow text-gray-500 font-bold hover:text-blue-600 transition flex items-center gap-2">
              <i className="fa-solid fa-house"></i> Menu
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 relative overflow-hidden">
      {showNameEntry && (
        <NameEntry 
          onNameSubmit={handleNameSubmit} 
          onCancel={() => {
            setShowNameEntry(false);
            setPendingView(null);
          }} 
        />
      )}
      {/* Background Decor Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/30 rounded-full blur-3xl animate-float -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/30 rounded-full blur-3xl animate-float -z-10" style={{animationDelay: '1.5s'}}></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/20 py-4 px-6 text-center shadow-sm">
        <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center gap-2">
          <i className="fa-solid fa-road text-blue-500"></i>
          Traffic Game
        </h1>
        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] mt-1">
          Lái xe an toàn - Vững vàng kiến thức
        </p>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center p-4 md:p-6 w-full max-w-4xl mx-auto">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-400 text-xs">
        <p className="font-semibold opacity-60">© 2025 Traffic Game</p>
      </footer>
    </div>
  );
};

export default App;
