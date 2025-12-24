import React from 'react';
import { useSelector } from 'react-redux'; // Nếu không dùng redux, có thể bỏ dòng này

// Component này chỉ hiển thị nút trở về menu khi không đang chơi thử thách
const ChallengeSectionMenuBack: React.FC = () => {
  // Nếu có state toàn cục, có thể kiểm tra trạng thái chơi thử thách ở đây
  // Hoặc truyền prop từ App xuống để biết có đang chơi không
  // Ở đây mặc định luôn hiển thị, ChallengeSection sẽ kiểm soát việc ẩn/hiện
  return (
    <button 
      onClick={() => window.location.reload()} // Hoặc gọi hàm setCurrentView(View.MENU) qua prop
      className="mt-8 px-6 py-2 bg-white rounded-full shadow text-gray-500 font-bold hover:text-blue-600 transition flex items-center gap-2"
    >
      <i className="fa-solid fa-house"></i> Menu
    </button>
  );
};

export default ChallengeSectionMenuBack;