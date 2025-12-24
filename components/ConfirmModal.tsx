import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Đồng ý",
  cancelText = "Hủy bỏ",
  type = 'warning'
}) => {
  if (!isOpen) return null;

  const colors = {
    danger: {
      icon: 'text-red-500 bg-red-100',
      button: 'bg-red-500 hover:bg-red-600',
      border: 'border-red-100'
    },
    warning: {
      icon: 'text-yellow-500 bg-yellow-100',
      button: 'bg-yellow-500 hover:bg-yellow-600',
      border: 'border-yellow-100'
    },
    info: {
      icon: 'text-blue-500 bg-blue-100',
      button: 'bg-blue-500 hover:bg-blue-600',
      border: 'border-blue-100'
    }
  };

  const theme = colors[type];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
      <div className={`bg-white rounded-3xl p-6 md:p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-300 border-4 ${theme.border}`}>
        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl ${theme.icon}`}>
            {type === 'danger' && <i className="fa-solid fa-triangle-exclamation"></i>}
            {type === 'warning' && <i className="fa-solid fa-circle-exclamation"></i>}
            {type === 'info' && <i className="fa-solid fa-circle-info"></i>}
          </div>
          <h3 className="text-2xl font-black text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-500 font-medium">{message}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition ${theme.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
