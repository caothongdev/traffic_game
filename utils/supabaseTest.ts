import { supabase } from '../config/supabase';

// Test kết nối Supabase
export const testSupabaseConnection = async (): Promise<{
  connected: boolean;
  message: string;
  tableExists: boolean;
}> => {
  try {
    // Test 1: Kiểm tra client đã được khởi tạo
    if (!supabase) {
      return {
        connected: false,
        message: 'Supabase client chưa được khởi tạo',
        tableExists: false
      };
    }

    // Test 2: Thử query đơn giản để kiểm tra connection
    const { data, error } = await supabase
      .from('daily_challenges')
      .select('count')
      .limit(1);

    if (error) {
      // Kiểm tra xem có phải lỗi do table chưa tồn tại không
      if (error.message.includes('does not exist') || error.code === '42P01') {
        return {
          connected: true,
          message: 'Kết nối thành công nhưng bảng "daily_challenges" chưa được tạo. Hãy chạy script SQL trong SUPABASE_SETUP.md',
          tableExists: false
        };
      }

      return {
        connected: false,
        message: `Lỗi kết nối: ${error.message}`,
        tableExists: false
      };
    }

    // Test 3: Thử lấy số lượng records
    const { count } = await supabase
      .from('daily_challenges')
      .select('*', { count: 'exact', head: true });

    return {
      connected: true,
      message: `Kết nối thành công! Đã có ${count || 0} kết quả trong database`,
      tableExists: true
    };
  } catch (err) {
    return {
      connected: false,
      message: `Lỗi: ${err instanceof Error ? err.message : 'Unknown error'}`,
      tableExists: false
    };
  }
};

// Kiểm tra cấu hình ENV
export const checkEnvConfig = (): { configured: boolean; message: string } => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return {
      configured: false,
      message: 'Thiếu VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY trong file .env'
    };
  }

  if (url.includes('your-project-url') || key.includes('your-anon-key')) {
    return {
      configured: false,
      message: 'Vui lòng cập nhật URL và API Key trong file .env'
    };
  }

  return {
    configured: true,
    message: 'ENV đã được cấu hình'
  };
};
