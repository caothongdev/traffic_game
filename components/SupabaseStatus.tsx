import React, { useState, useEffect } from 'react';
import { testSupabaseConnection, checkEnvConfig } from '../utils/supabaseTest';

const SupabaseStatus: React.FC = () => {
  const [status, setStatus] = useState<{
    loading: boolean;
    connected: boolean;
    message: string;
    tableExists: boolean;
    envConfigured: boolean;
  }>({
    loading: true,
    connected: false,
    message: 'Đang kiểm tra...',
    tableExists: false,
    envConfigured: false
  });

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setStatus(prev => ({ ...prev, loading: true }));
    
    const envCheck = checkEnvConfig();
    
    if (!envCheck.configured) {
      setStatus({
        loading: false,
        connected: false,
        message: envCheck.message,
        tableExists: false,
        envConfigured: false
      });
      return;
    }

    const result = await testSupabaseConnection();
    
    setStatus({
      loading: false,
      connected: result.connected,
      message: result.message,
      tableExists: result.tableExists,
      envConfigured: true
    });
  };

  const getStatusIcon = () => {
    if (status.loading) return '⏳';
    if (status.connected && status.tableExists) return '✅';
    if (status.connected && !status.tableExists) return '⚠️';
    return '❌';
  };

  const getStatusColor = () => {
    if (status.loading) return 'bg-gray-100 text-gray-600 border-gray-200';
    if (status.connected && status.tableExists) return 'bg-green-100 text-green-700 border-green-200';
    if (status.connected && !status.tableExists) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`rounded-2xl border-2 shadow-lg transition-all duration-300 ${getStatusColor()} ${showDetails ? 'w-80' : 'w-auto'}`}>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full px-4 py-3 flex items-center gap-3 hover:opacity-80 transition"
        >
          <span className="text-2xl">{getStatusIcon()}</span>
          <div className="flex-1 text-left">
            <p className="text-xs font-bold uppercase tracking-wider opacity-70">Database Status</p>
            {showDetails ? (
              <p className="text-xs font-medium mt-1">{status.message}</p>
            ) : (
              <p className="text-sm font-bold">
                {status.loading ? 'Checking...' : status.connected && status.tableExists ? 'Connected' : 'Offline'}
              </p>
            )}
          </div>
          <i className={`fa-solid fa-chevron-${showDetails ? 'down' : 'up'} text-xs`}></i>
        </button>

        {showDetails && (
          <div className="px-4 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <div className="h-px bg-current opacity-20"></div>
            
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span>{status.envConfigured ? '✅' : '❌'}</span>
                <span className="font-medium">ENV Configuration</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{status.connected ? '✅' : '❌'}</span>
                <span className="font-medium">API Connection</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{status.tableExists ? '✅' : '❌'}</span>
                <span className="font-medium">Database Table</span>
              </div>
            </div>

            {!status.tableExists && status.connected && (
              <div className="mt-3 p-2 bg-white/50 rounded-lg text-xs">
                <p className="font-bold mb-1">Cần làm gì?</p>
                <p>Chạy file <code className="bg-black/10 px-1 rounded">supabase-setup.sql</code> trong Supabase SQL Editor</p>
              </div>
            )}

            <button
              onClick={checkConnection}
              disabled={status.loading}
              className="w-full mt-2 py-2 bg-white/50 hover:bg-white/70 rounded-lg font-bold text-xs transition disabled:opacity-50"
            >
              {status.loading ? '⏳ Đang kiểm tra...' : '🔄 Kiểm tra lại'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupabaseStatus;
