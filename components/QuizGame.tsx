
import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../constants';

interface QuizGameProps {
  onBack: () => void;
}

const QuizGame: React.FC<QuizGameProps> = ({ onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [carPosition, setCarPosition] = useState(5); // percentage start
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [shake, setShake] = useState(false);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  
  // Calculate progress to determine if finish line should show
  const progress = (currentQuestionIndex / QUESTIONS.length) * 100;

  const handleAnswer = (index: number) => {
    if (isPaused || isGameOver) return;

    if (index === currentQuestion.correctIndex) {
      // Correct
      setFeedback({ type: 'success', message: 'Chính xác! Tăng tốc!' });
      setScore(prev => prev + 100 + (timeLeft * 10)); // Bonus points for speed
      setCarPosition(prev => Math.min(prev + 12, 85));
      setIsPaused(true);
      setTimeout(() => {
        nextQuestion();
      }, 1200);
    } else {
      // Wrong
      setFeedback({ type: 'error', message: 'Vi phạm luật! Dừng xe!' });
      setShake(true); // Trigger shake animation
      setIsPaused(true);
      setTimeout(() => {
        setFeedback({ type: null, message: '' });
        setShake(false);
        setIsPaused(false);
        // Penalty but give a chance to retry or move on? 
        // For game flow, let's move on but no points
        nextQuestion(); 
      }, 2000);
    }
  };

  const nextQuestion = () => {
    setFeedback({ type: null, message: '' });
    setIsPaused(false);
    setTimeLeft(20);
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCarPosition(90); // Cross finish line
      setTimeout(() => setIsGameOver(true), 1000);
    }
  };

  useEffect(() => {
    if (isGameOver || isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleAnswer(-1); // Time out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameOver, isPaused, currentQuestionIndex]);

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500 max-w-md mx-auto border-4 border-yellow-400">
        <div className="text-6xl mb-4 animate-bounce">🏆</div>
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-2">VỀ ĐÍCH!</h2>
        <p className="text-gray-500 mb-6 font-bold">Bạn đã hoàn thành chặng đua</p>
        
        <div className="bg-blue-50 w-full p-6 rounded-2xl mb-6 border-2 border-blue-100">
          <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-2">Tổng điểm</p>
          <p className="text-5xl font-black text-blue-700">{score}</p>
        </div>

        <div className="flex flex-col w-full gap-3">
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition active:scale-95"
          >
            Đua lại từ đầu
          </button>
          <button 
            onClick={onBack}
            className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition"
          >
            Về Menu Chính
          </button>
        </div>
      </div>
    );
  }

  const isSuccess = feedback.type === 'success';

  return (
    <div className={`w-full max-w-2xl mx-auto flex flex-col gap-6 ${shake ? 'animate-shake' : ''}`}>
      {/* HUD */}
      <div className="flex justify-between items-center bg-white/90 backdrop-blur rounded-2xl shadow-lg border-b-4 border-blue-500 p-4 sticky top-4 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
             <i className="fa-solid fa-star"></i>
          </div>
          <div>
             <p className="text-xs text-gray-400 font-bold uppercase">Điểm số</p>
             <p className="text-xl font-black text-gray-800">{score}</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="hidden md:block flex-1 mx-6 bg-gray-200 h-3 rounded-full overflow-hidden">
             <div 
                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestionIndex) / QUESTIONS.length) * 100}%` }}
             ></div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`text-right ${timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-gray-700'}`}>
             <p className="text-xs text-gray-400 font-bold uppercase">Thời gian</p>
             <p className="text-xl font-black w-8">{timeLeft}</p>
          </div>
          <div className={`p-2 rounded-lg ${timeLeft < 5 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
            <i className="fa-solid fa-clock"></i>
          </div>
        </div>
      </div>

      {/* Game Scene */}
      <div className="relative w-full h-48 bg-gray-800 rounded-2xl overflow-hidden shadow-inner border-4 border-gray-700 road-texture group">
        {/* Road Markings */}
        <div className={`absolute w-full h-2 top-1/2 -translate-y-1/2 road-divider opacity-70 ${isSuccess ? 'animate-road-move' : ''}`}></div>
        
        {/* Finish Line (Visible near end) */}
        <div 
            className="absolute top-0 bottom-0 w-8 finish-line right-0 z-0 transition-transform duration-1000"
            style={{ 
                transform: currentQuestionIndex >= QUESTIONS.length - 1 ? 'translateX(0)' : 'translateX(100px)',
                opacity: currentQuestionIndex >= QUESTIONS.length - 1 ? 1 : 0
            }}
        ></div>

        {/* The Car */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 transition-all z-20"
          style={{ 
            left: `${carPosition}%`,
            transitionDuration: isSuccess ? '500ms' : '800ms',
            transitionTimingFunction: isSuccess ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease-in-out'
          }}
        >
          <div className={`text-6xl filter drop-shadow-lg relative ${isSuccess ? 'animate-drive' : ''}`}>
            <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>🚗</span>
            {/* Motion lines */}
            {isSuccess && <div className="absolute top-1/2 -left-4 w-6 h-1 bg-white/50 rounded-full animate-pulse"></div>}
            {isSuccess && <div className="absolute bottom-2 -left-6 w-4 h-1 bg-white/30 rounded-full animate-pulse delay-75"></div>}
          </div>
          
          {/* Status Indicators */}
          {feedback.type === 'error' && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl animate-bounce">💥</div>
          )}
          {feedback.type === 'success' && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-3xl animate-bounce">💨</div>
          )}
        </div>
      </div>

      {/* Question & Options */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden transition-all duration-300">
        {/* Feedback Overlay */}
        <div className={`absolute top-0 left-0 w-full h-1.5 transition-colors duration-300 ${
            feedback.type === 'success' ? 'bg-green-500' : 
            feedback.type === 'error' ? 'bg-red-500' : 'bg-gray-100'
        }`}></div>
        
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Câu hỏi {currentQuestionIndex + 1}/{QUESTIONS.length}
              </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-snug">
            {currentQuestion.text}
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                disabled={isPaused}
                onClick={() => handleAnswer(idx)}
                className={`group relative w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 active:scale-[0.98] ${
                  isPaused 
                    ? 'opacity-60 cursor-not-allowed border-gray-100 bg-gray-50' 
                    : 'hover:border-blue-400 hover:shadow-md hover:bg-blue-50/50 border-gray-100 bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                    <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-colors ${
                        isPaused ? 'bg-gray-200 text-gray-500' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-500 group-hover:text-white'
                    }`}>
                    {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {feedback.message && (
             <div className={`p-3 text-center font-bold text-white animate-in slide-in-from-bottom-2 ${feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                 {feedback.message}
             </div>
        )}
      </div>

      <button 
        onClick={onBack}
        className="text-gray-400 font-bold hover:text-red-500 transition flex items-center justify-center gap-2 py-2"
      >
        <i className="fa-solid fa-flag-checkered"></i> Bỏ cuộc & Quay lại
      </button>
    </div>
  );
};

export default QuizGame;
