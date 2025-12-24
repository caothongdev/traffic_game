# 🚦 Traffic Game - Trò Chơi Luật Giao Thông

Một trò chơi tương tác giúp học và kiểm tra kiến thức về luật giao thông Việt Nam.

## ✨ Tính Năng

- 🎮 **Chế độ chơi đa dạng**: Luyện tập, Thử thách hàng ngày
- 📊 **Bảng xếp hạng**: Theo dõi thành tích của bạn và so sánh với người chơi khác
- ⏱️ **Thống kê chi tiết**: Điểm số, độ chính xác, thời gian phản hồi trung bình
- 🔄 **Cập nhật real-time**: Kết quả và bảng xếp hạng được cập nhật tức thời
- 🎯 **Câu hỏi đa dạng**: Luật giao thông, biển báo, tình huống thực tế

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**: React + TypeScript + Vite
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (tùy chọn)
- **Styling**: CSS Modules / Tailwind CSS

## 📋 Yêu Cầu

- Node.js (v16 trở lên)
- npm hoặc yarn
- Tài khoản Supabase (miễn phí)

## 🚀 Cài Đặt

### 1. Clone Repository

```bash
git clone <repository-url>
cd traffic_game
```

### 2. Cài Đặt Dependencies

```bash
npm install
```

### 3. Cấu Hình Supabase

1. Tạo tài khoản tại [supabase.com](https://supabase.com)
2. Tạo project mới
3. Trong Supabase Dashboard, vào **Settings** > **API**
4. Sao chép **Project URL** và **anon public** key

### 4. Cấu Hình Environment Variables

Tạo file `.env` trong thư mục gốc:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Thiết Lập Database

Chạy SQL sau trong Supabase SQL Editor:

```sql
-- Tạo bảng daily_challenges
CREATE TABLE daily_challenges (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  player_name VARCHAR(100) NOT NULL,
  score INTEGER NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  avg_response_time INTEGER NOT NULL,
  violations INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo index để tối ưu query
CREATE INDEX idx_daily_challenges_date ON daily_challenges(date DESC);
CREATE INDEX idx_daily_challenges_score ON daily_challenges(score DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;

-- Cho phép mọi người đọc
CREATE POLICY "Anyone can read daily challenges"
  ON daily_challenges FOR SELECT
  TO public
  USING (true);

-- Cho phép mọi người insert
CREATE POLICY "Anyone can insert daily challenges"
  ON daily_challenges FOR INSERT
  TO public
  WITH CHECK (true);
```

### 6. Chạy Ứng Dụng

```bash
# Development mode
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview
```

## 📁 Cấu Trúc Thư Mục

```
traffic_game/
├── config/
│   └── supabase.ts          # Cấu hình Supabase client
├── src/
│   ├── components/          # React components
│   ├── pages/              # Các trang chính
│   ├── utils/              # Utility functions
│   └── env.d.ts            # TypeScript environment types
├── public/                 # Static assets
├── .env                    # Environment variables (không commit)
├── .env.example           # Mẫu environment variables
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── package.json
```

## 🎮 Hướng Dẫn Sử Dụng

1. **Chọn chế độ chơi**: Luyện tập hoặc Thử thách hàng ngày
2. **Nhập tên**: Để ghi nhận điểm số của bạn
3. **Trả lời câu hỏi**: Chọn đáp án đúng cho mỗi câu hỏi
4. **Xem kết quả**: Sau khi hoàn thành, xem điểm số và thứ hạng
5. **Kiểm tra bảng xếp hạng**: So sánh với người chơi khác

## 🔧 Scripts

```bash
# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🐛 Troubleshooting

### Lỗi TypeScript với import.meta.env

Đảm bảo file `src/env.d.ts` tồn tại với nội dung:

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### Không kết nối được Supabase

1. Kiểm tra file `.env` có đúng định dạng không
2. Xác nhận URL và API key chính xác
3. Kiểm tra RLS policies trong Supabase

## 📝 License

MIT License

## 🤝 Đóng Góp

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

## 📧 Liên Hệ

Nếu có bất kỳ câu hỏi nào, vui lòng tạo issue trên GitHub.

---

**Chúc bạn chơi game vui vẻ và học tốt luật giao thông! 🚗💨**