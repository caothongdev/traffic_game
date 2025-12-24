import React, { useState } from 'react';

interface NameEntryProps {
  onNameSubmit: (name: string) => void;
  onCancel: () => void;
  title?: string;
}

const NameEntry: React.FC<NameEntryProps> = ({ onNameSubmit, onCancel, title = "Nhập Tên Của Bạn" }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-300 border-4 border-white/20">
        <div className="text-center mb-6">
            <div className="text-5xl mb-4">🏷️</div>
            <h2 className="text-2xl font-black text-gray-800">{title}</h2>
            <p className="text-gray-500 text-sm mt-2">Hãy chọn một cái tên thật ngầu để ghi danh!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên của bạn..."
                className="w-full p-4 pl-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg font-bold"
                autoFocus
                required
                maxLength={15}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="fa-solid fa-user"></i>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:shadow-xl hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Bắt Đầu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NameEntry;
