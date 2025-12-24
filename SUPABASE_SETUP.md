# Hướng dẫn thiết lập Supabase

## Bước 1: Lấy thông tin kết nối từ Supabase

1. Đăng nhập vào [Supabase Dashboard](https://app.supabase.com)
2. Chọn project của bạn
3. Vào **Settings** > **API**
4. Copy 2 thông tin sau:
   - **Project URL** (VD: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public key** (key dài dạng `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Bước 2: Cập nhật file .env

Mở file `.env` trong thư mục gốc project và điền thông tin:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Bước 3: Tạo bảng trong Supabase

1. Vào **SQL Editor** trong Supabase Dashboard
2. Copy toàn bộ nội dung file `supabase-setup.sql`
3. Paste vào SQL Editor
4. Click **Run** để thực thi

Script sẽ tạo:
- Bảng `daily_challenges` để lưu kết quả
- Các index để tăng tốc độ query
- Row Level Security policies để bảo mật
- Function cleanup tự động (optional)

## Bước 4: Kiểm tra kết nối

1. Restart dev server: `npm run dev`
2. Chơi một ván Daily Challenge
3. Vào **Table Editor** trong Supabase để xem dữ liệu đã được lưu

## Cấu trúc bảng `daily_challenges`

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key, auto increment |
| date | DATE | Ngày chơi (YYYY-MM-DD) |
| player_name | VARCHAR(100) | Tên người chơi |
| score | INTEGER | Điểm số |
| accuracy | DECIMAL(5,2) | Độ chính xác (%) |
| avg_response_time | DECIMAL(5,2) | Thời gian phản ứng trung bình (s) |
| violations | INTEGER | Số lỗi vi phạm |
| total_questions | INTEGER | Tổng số câu hỏi |
| completed_at | BIGINT | Timestamp hoàn thành |
| created_at | TIMESTAMP | Thời gian tạo record |

## Security

- RLS (Row Level Security) đã được bật
- Public có thể READ và INSERT
- Mỗi người chỉ được chơi 1 lần/ngày (constraint `unique_player_per_day`)

## Backup

Code vẫn fallback về localStorage nếu Supabase gặp lỗi, đảm bảo app vẫn hoạt động offline.
