
import React from 'react';

const MultiplayerMock: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fa-solid fa-code-branch text-4xl text-gray-400"></i>
        </div>
        
        <h2 className="text-3xl font-black text-gray-800 mb-4">Tính năng đang phát triển</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Chế độ đối kháng trực tuyến đang được xây dựng. Chúng tôi rất hoan nghênh sự đóng góp từ cộng đồng để hoàn thiện tính năng này!
        </p>

        <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-300 mb-8">
          <p className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wider">Mã nguồn mở trên GitHub</p>
          <a 
            href="https://github.com/caothongdev/traffic_game" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black hover:scale-[1.02] transition shadow-lg"
          >
            <i className="fa-brands fa-github text-2xl"></i>
            <span>Đóng góp ngay</span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <i className="fa-solid fa-heart text-red-400 animate-pulse"></i>
          <span>Cảm ơn bạn đã quan tâm!</span>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerMock;
