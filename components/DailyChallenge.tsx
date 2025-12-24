import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { getDailyQuestions, saveDailyChallengeResult, DailyChallengeResult } from '../utils/dailyChallenge';
import ConfirmModal from './ConfirmModal';

interface DailyChallengeProps {
  onBack: () => void;
  onComplete: (result: DailyChallengeResult) => void;
  playerName: string;
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({ onBack, onComplete, playerName }) => {
  const [questions] = useState<Question[]>(getDailyQuestions(10));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [carPosition, setCarPosition] = useState(5);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [shake, setShake] = useState(false);
  const [showGiveUpModal, setShowGiveUpModal] = useState(false);
  
  // Stats tracking
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [violations, setViolations] = useState(0);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (isGameOver || isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleAnswer(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameOver, isPaused, currentQuestionIndex]);

  const handleAnswer = (index: number) => {
    if (isPaused || isGameOver) return;

    const responseTime = (Date.now() - questionStartTime) / 1000;
    setResponseTimes([...responseTimes, responseTime]);

    if (index === currentQuestion.correctIndex) {
      setFeedback({ type: 'success', message: 'Chính xác! Tăng tốc!' });
      setScore(prev => prev + 100 + (timeLeft * 10));
      setCorrectAnswers(prev => prev + 1);
      setCarPosition(prev => Math.min(prev + 12, 85));
      setIsPaused(true);
      setTimeout(() => {
        nextQuestion();
      }, 1200);
    } else {
      setFeedback({ type: 'error', message: 'Vi phạm luật! Dừng xe!' });
      setViolations(prev => prev + 1);
      setShake(true);
      setIsPaused(true);
      setTimeout(() => {
        setFeedback({ type: null, message: '' });
        setShake(false);
        setIsPaused(false);
        nextQuestion();
      }, 2000);
    }
  };

  const nextQuestion = () => {
    setFeedback({ type: null, message: '' });
    setIsPaused(false);
    setTimeLeft(20);
    setQuestionStartTime(Date.now());
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCarPosition(90);
      setTimeout(() => finishChallenge(), 1000);
    }
  };

  const finishChallenge = () => {
    const avgResponseTime = responseTimes.length > 0 
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length 
      : 0;
    const accuracy = (correctAnswers / questions.length) * 100;
    
    const result: DailyChallengeResult = {
      date: new Date().toISOString().split('T')[0],
      score,
      accuracy,
      avgResponseTime,
      violations,
      totalQuestions: questions.length,
      playerName: playerName,
      completedAt: Date.now()
    };
    
    saveDailyChallengeResult(result);
    setIsGameOver(true);
    onComplete(result);
  };

  const handleGiveUp = () => {
    setShowGiveUpModal(true);
  };

  const confirmGiveUp = () => {
    setShowGiveUpModal(false);
    finishChallenge();
  };

  if (isGameOver) {
    const accuracy = (correctAnswers / questions.length) * 100;
    const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 max-w-lg w-full text-center border-4 border-white ring-4 ring-purple-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-lg ring-4 ring-yellow-50">
            <span className="text-5xl">🏆</span>
          </div>
          
          <h2 className="text-4xl font-black text-gray-800 mb-2 tracking-tight">HOÀN THÀNH!</h2>
          <p className="text-gray-500 mb-8 font-medium">Bạn đã chinh phục thử thách hôm nay</p>
          
          <div className="bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-100">
            <div className="mb-6">
              <p className="text-xs text-purple-500 font-bold uppercase tracking-wider mb-1">Tổng điểm</p>
              <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{score}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 divide-x divide-gray-200">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Chính xác</p>
                <p className="text-xl font-black text-gray-800">{accuracy.toFixed(0)}%</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Phản ứng</p>
                <p className="text-xl font-black text-gray-800">{avgResponseTime.toFixed(1)}s</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Vi phạm</p>
                <p className="text-xl font-black text-red-500">{violations}</p>
              </div>
            </div>
          </div>

          <button 
            onClick={onBack}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group"
          >
            <i className="fa-solid fa-list-ol group-hover:-translate-x-1 transition-transform"></i>
            Xem Bảng Xếp Hạng
          </button>
        </div>
      </div>
    );
  }

  const isSuccess = feedback.type === 'success';

  return (
    <div className={`w-full max-w-3xl mx-auto flex flex-col gap-6 ${shake ? 'animate-shake' : ''}`}>
      {/* HUD */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sticky top-4 z-40 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl shadow-sm">
             <i className="fa-solid fa-star"></i>
          </div>
          <div>
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Điểm số</p>
             <p className="text-2xl font-black text-gray-800 leading-none">{score}</p>
          </div>
        </div>
        
        <div className="hidden md:flex flex-1 flex-col gap-1 max-w-xs mx-auto">
           <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <span>Tiến độ</span>
              <span>{currentQuestionIndex + 1}/{questions.length}</span>
           </div>
           <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
             <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
             ></div>
           </div>
        </div>

        <div className="flex items-center gap-4 text-right">
          <div>
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Thời gian</p>
             <p className={`text-2xl font-black leading-none w-12 ${timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-gray-800'}`}>{timeLeft}</p>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-colors ${timeLeft < 5 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
            <i className="fa-solid fa-clock"></i>
          </div>
        </div>
      </div>

      {/* Game Scene */}
      <div className="relative w-full h-56 bg-gray-800 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-700 road-texture group">
        {/* Road markings */}
        <div className={`absolute w-full h-full flex flex-col justify-center gap-12 opacity-30`}>
           <div className="w-full h-2 bg-white dashed-line"></div>
        </div>
        
        {/* Finish line */}
        <div 
            className="absolute top-0 bottom-0 w-16 finish-line right-0 z-0 transition-transform duration-1000 flex flex-col justify-center items-center"
            style={{ 
                transform: currentQuestionIndex >= questions.length - 1 ? 'translateX(0)' : 'translateX(100px)',
                opacity: currentQuestionIndex >= questions.length - 1 ? 1 : 0
            }}
        >
           <div className="h-full w-4 bg-white"></div>
        </div>

        {/* Car */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 transition-all z-20"
          style={{ 
            left: `${carPosition}%`,
            transitionDuration: isSuccess ? '500ms' : '800ms',
            transitionTimingFunction: isSuccess ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease-in-out',
            transform: 'scaleX(-1) translateY(-50%)'
          }}
        >
          <div className={`text-7xl filter drop-shadow-2xl relative ${isSuccess ? 'animate-drive' : ''}`}>
            🏎️
            {isSuccess && <div className="absolute top-1/2 -right-8 w-12 h-2 bg-white/40 rounded-full animate-pulse blur-sm"></div>}
            {isSuccess && <div className="absolute bottom-2 -right-10 w-8 h-2 bg-white/20 rounded-full animate-pulse delay-75 blur-sm"></div>}
          </div>
          
          {feedback.type === 'error' && (
            <div className="absolute top-1/2 -translate-y-1/2 -left-12 text-5xl animate-bounce" style={{ transform: 'translateY(-50%) scaleX(-1)' }}>💥</div>
          )}
          {feedback.type === 'success' && (
            <div className="absolute top-1/2 -translate-y-1/2 -right-20 text-4xl animate-bounce" style={{ transform: 'translateY(-50%) scaleX(-1)' }}>💨</div>
          )}
        </div>
      </div>

      {/* Question & Options */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 relative overflow-hidden transition-all duration-300">
        <div className={`absolute top-0 left-0 w-full h-2 transition-colors duration-300 ${
            feedback.type === 'success' ? 'bg-green-500' : 
            feedback.type === 'error' ? 'bg-red-500' : 'bg-transparent'
        }`}></div>
        
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-start mb-8">
              <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-gray-200">
                  Câu hỏi {currentQuestionIndex + 1}
              </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-10 leading-tight">
            {currentQuestion.text}
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                disabled={isPaused}
                onClick={() => handleAnswer(idx)}
                className={`relative w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-200 ${
                  isPaused 
                    ? 'opacity-50 cursor-not-allowed border-gray-100 bg-gray-50' 
                    : 'border-gray-100 bg-white'
                }`}
              >
                <div className="flex items-center gap-5">
                    <span className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg transition-colors shadow-sm ${
                        isPaused ? 'bg-gray-200 text-gray-400' : 'bg-gray-100 text-gray-500'
                    }`}>
                    {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-bold text-lg text-gray-700">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {feedback.message && (
             <div className={`p-4 text-center font-bold text-white text-lg animate-in slide-in-from-bottom-4 ${feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                 {feedback.type === 'success' ? <i className="fa-solid fa-check-circle mr-2"></i> : <i className="fa-solid fa-triangle-exclamation mr-2"></i>}
                 {feedback.message}
             </div>
        )}
      </div>

      <div className="text-center">
        <button 
          onClick={handleGiveUp}
          className="text-gray-400 font-bold hover:text-red-500 transition-colors inline-flex items-center gap-2 py-2 px-4 rounded-full hover:bg-red-50"
        >
          <i className="fa-solid fa-flag"></i> Bỏ cuộc
        </button>
      </div>

      <ConfirmModal
        isOpen={showGiveUpModal}
        title="Dừng thử thách?"
        message="Bạn có chắc chắn muốn bỏ cuộc? Kết quả hiện tại sẽ được tính là kết quả cuối cùng của bạn hôm nay."
        onConfirm={confirmGiveUp}
        onCancel={() => setShowGiveUpModal(false)}
        confirmText="Chấp nhận kết quả này"
        cancelText="Tiếp tục chơi"
        type="warning"
      />
    </div>
  );
};

export default DailyChallenge;
