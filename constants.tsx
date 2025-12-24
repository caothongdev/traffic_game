
import { Question, Player } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Khi đèn vàng bật sáng (không nhấp nháy), người lái xe phải làm gì?",
    options: [
      "Tăng tốc để vượt qua ngã tư",
      "Dừng lại trước vạch dừng",
      "Đi tiếp nếu thấy không có xe khác",
      "Bấm còi và đi nhanh"
    ],
    correctIndex: 1
  },
  {
    id: 2,
    text: "Tại ngã tư không có biển báo ưu tiên và không có đèn tín hiệu, bạn nhường đường cho ai?",
    options: [
      "Xe đi từ bên trái",
      "Xe đi từ bên phải",
      "Xe lớn hơn",
      "Xe đi nhanh hơn"
    ],
    correctIndex: 1
  },
  {
    id: 3,
    text: "Biển báo hình tròn, viền đỏ, nền trắng, có hình vẽ đen gạch chéo là loại biển gì?",
    options: [
      "Biển báo nguy hiểm",
      "Biển báo hiệu lệnh",
      "Biển báo cấm",
      "Biển chỉ dẫn"
    ],
    correctIndex: 2
  },
  {
    id: 4,
    text: "Người lái xe mô tô có được phép buông cả hai tay khi đang tham gia giao thông không?",
    options: [
      "Được phép nếu đường vắng",
      "Chỉ được buông một tay",
      "Tuyệt đối không được phép",
      "Được phép khi đi tốc độ chậm"
    ],
    correctIndex: 2
  },
  {
    id: 5,
    text: "Vạch kẻ đường màu vàng nét đứt có ý nghĩa gì?",
    options: [
      "Phân chia các làn xe cùng chiều",
      "Phân chia hai chiều xe chạy ngược chiều nhau",
      "Cấm các xe đè lên vạch",
      "Chỉ dành cho xe buýt"
    ],
    correctIndex: 1
  },
  {
    id: 6,
    text: "Nồng độ cồn cho phép đối với người điều khiển xe ô tô là bao nhiêu?",
    options: [
      "Dưới 0.25 miligam/1 lít khí thở",
      "Dưới 50 miligam/100 mililít máu",
      "Tuyệt đối bằng 0 (Cấm hoàn toàn)",
      "Tùy vào tửu lượng"
    ],
    correctIndex: 2
  },
  {
    id: 7,
    text: "Khi gặp xe cứu thương đang phát tín hiệu ưu tiên, bạn phải làm gì?",
    options: [
      "Tăng tốc chạy trước xe cứu thương",
      "Giữ nguyên tốc độ và làn đường",
      "Nhường đường bằng cách đi về phía bên phải",
      "Bấm còi chào hỏi"
    ],
    correctIndex: 2
  },
  {
    id: 8,
    text: "Người ngồi trên xe máy bắt buộc đội mũ bảo hiểm khi nào?",
    options: [
      "Chỉ khi đi trên đường quốc lộ",
      "Khi tham gia giao thông trên đường bộ",
      "Chỉ khi thấy cảnh sát giao thông",
      "Chỉ khi trời mưa"
    ],
    correctIndex: 1
  }
];

export const LEADERBOARD_DATA: Player[] = [
  { id: 1, name: "Nguyễn Văn A", score: 1550, badges: ["🏅 Không tai nạn", "🚦 Điều phối giỏi"] },
  { id: 2, name: "Trần Thị B", score: 1400, badges: ["🏅 Không tai nạn"] },
  { id: 3, name: "Lê Văn C", score: 1250, badges: ["🚦 Điều phối giỏi"] },
  { id: 4, name: "Phạm Minh D", score: 980, badges: [] },
  { id: 5, name: "Hoàng An", score: 850, badges: ["🏅 Không tai nạn"] }
];
