-- SQL Script để tạo bảng trong Supabase
-- Chạy script này trong Supabase SQL Editor

-- Tạo bảng daily_challenges
CREATE TABLE IF NOT EXISTS daily_challenges (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  player_name VARCHAR(100) NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  accuracy DECIMAL(5,2) NOT NULL DEFAULT 0,
  avg_response_time DECIMAL(5,2) NOT NULL DEFAULT 0,
  violations INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 10,
  completed_at BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Index để tăng tốc độ query
  CONSTRAINT unique_player_per_day UNIQUE (date, player_name)
);

-- Tạo index cho việc query theo date
CREATE INDEX idx_daily_challenges_date ON daily_challenges(date DESC);

-- Tạo index cho leaderboard
CREATE INDEX idx_daily_challenges_date_score ON daily_challenges(date, score DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;

-- Policy: Cho phép mọi người đọc
CREATE POLICY "Allow public read access" ON daily_challenges
  FOR SELECT
  TO public
  USING (true);

-- Policy: Cho phép mọi người insert (với giới hạn 1 lần/ngày thông qua constraint)
CREATE POLICY "Allow public insert" ON daily_challenges
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Chỉ cho phép update record của chính mình (nếu cần)
CREATE POLICY "Allow update own record" ON daily_challenges
  FOR UPDATE
  TO public
  USING (player_name = current_setting('request.jwt.claims', true)::json->>'player_name');

-- Function để tự động làm sạch data cũ (optional - xóa data sau 30 ngày)
CREATE OR REPLACE FUNCTION cleanup_old_challenges()
RETURNS void AS $$
BEGIN
  DELETE FROM daily_challenges
  WHERE date < CURRENT_DATE - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Tạo scheduled job để chạy cleanup (nếu cần)
-- SELECT cron.schedule('cleanup-old-challenges', '0 0 * * *', 'SELECT cleanup_old_challenges()');

-- ==========================================
-- MAIN LEADERBOARD (Chế độ chơi chính)
-- ==========================================

-- Tạo bảng main_leaderboard
CREATE TABLE IF NOT EXISTS main_leaderboard (
  player_name VARCHAR(100) PRIMARY KEY,
  total_score BIGINT NOT NULL DEFAULT 0,
  total_games INTEGER NOT NULL DEFAULT 0,
  last_played_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tạo index cho leaderboard chính
CREATE INDEX idx_main_leaderboard_score ON main_leaderboard(total_score DESC);

-- Enable RLS
ALTER TABLE main_leaderboard ENABLE ROW LEVEL SECURITY;

-- Policy: Cho phép mọi người đọc
CREATE POLICY "Allow public read access main" ON main_leaderboard
  FOR SELECT
  TO public
  USING (true);

-- Policy: Cho phép mọi người insert/update
CREATE POLICY "Allow public insert update main" ON main_leaderboard
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Function để update điểm an toàn (Atomic Increment)
CREATE OR REPLACE FUNCTION update_main_leaderboard(p_name TEXT, p_score INTEGER)
RETURNS void AS $$
BEGIN
  INSERT INTO main_leaderboard (player_name, total_score, total_games, last_played_at)
  VALUES (p_name, p_score, 1, NOW())
  ON CONFLICT (player_name)
  DO UPDATE SET
    total_score = main_leaderboard.total_score + p_score,
    total_games = main_leaderboard.total_games + 1,
    last_played_at = NOW();
END;
$$ LANGUAGE plpgsql;


