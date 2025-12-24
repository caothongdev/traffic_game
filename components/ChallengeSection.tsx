
import React from 'react';

const ChallengeSection: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 text-center">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          🧠
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Thử thách hôm nay</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Tất cả người chơi có cùng một kịch bản giao thông trong ngày. Hãy chứng minh bạn là tài xế cẩn thận nhất!
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-green-50 rounded-2xl">
            <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">Độ chính xác</p>
            <p className="text-2xl font-black text-green-700">85%</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl">
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Phản ứng</p>
            <p className="text-2xl font-black text-blue-700">1.8s</p>
          </div>
          <div className="p-4 bg-red-50 rounded-2xl">
            <p className="text-xs text-red-600 font-bold uppercase tracking-wider mb-1">Tai nạn</p>
            <p className="text-2xl font-black text-red-700">1</p>
          </div>
        </div>

        <button className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-black text-xl rounded-2xl shadow-xl shadow-blue-200 hover:scale-[1.02] transition active:scale-95 mb-4">
          BẮT ĐẦU THỬ THÁCH
        </button>
        <p className="text-xs text-gray-400">Cập nhật sau 14 giờ 20 phút</p>
      </div>
    </div>
  );
};

export default ChallengeSection;
