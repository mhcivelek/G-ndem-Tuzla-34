import React, { useState } from 'react';
import { 
  History, 
  Download, 
  RotateCcw, 
  Activity, 
  ShieldAlert, 
  Database, 
  Server, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  HardDrive
} from 'lucide-react';
import { SystemLog, CurrentUser } from '../../types';
import { storageService } from '../../services/storageService';

interface AuditLogsPanelProps {
  currentUser: CurrentUser;
  onRefreshAll?: () => void;
}

export const AuditLogsPanel: React.FC<AuditLogsPanelProps> = ({ currentUser, onRefreshAll }) => {
  const [logs, setLogs] = useState<SystemLog[]>(storageService.getLogs());
  const [filterLevel, setFilterLevel] = useState<'all' | 'info' | 'warn' | 'security'>('all');
  const [backupMessage, setBackupMessage] = useState('');

  const handleExportBackup = () => {
    const json = storageService.exportBackupJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gundem_tuzla34_tam_sistem_yedek_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setBackupMessage('Tam sistem veritabanı yedeği JSON formatında başarıyla indirildi.');
    setTimeout(() => setBackupMessage(''), 4000);
  };

  const handleRestoreDefaults = () => {
    if (window.confirm('Tüm haberler, yorumlar ve reklamlar fabrika ayarlarına sıfırlansın mı?')) {
      storageService.restoreDefaults();
      if (onRefreshAll) onRefreshAll();
      setLogs(storageService.getLogs());
      setBackupMessage('Sistem varsayılan demo verilerine sıfırlandı.');
      setTimeout(() => setBackupMessage(''), 4000);
    }
  };

  const filteredLogs = logs.filter((l) => {
    if (filterLevel === 'all') return true;
    return l.level === filterLevel;
  });

  return (
    <div className="space-y-6">
      {/* Central Monitoring Health Metrics */}
      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h4 className="font-bold text-sm">Merkezi Sistem İzleme ve Hata Ayıklama (Monitoring)</h4>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Tüm Mikroservisler Aktif
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
            <span className="text-slate-400 block text-[10px]">Çalışma Süresi (Uptime)</span>
            <span className="text-base font-bold text-white">%99.98</span>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
            <span className="text-slate-400 block text-[10px]">Ortalama API Gecikmesi</span>
            <span className="text-base font-bold text-emerald-400">18 ms</span>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
            <span className="text-slate-400 block text-[10px]">Hata Oranı (5xx / 4xx)</span>
            <span className="text-base font-bold text-blue-400">%0.012</span>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
            <span className="text-slate-400 block text-[10px]">Canlı Socket Bağlantısı</span>
            <span className="text-base font-bold text-amber-300">1,482 Okur</span>
          </div>
        </div>
      </div>

      {/* Backup & Disaster Recovery Section */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Otomatik Yedekleme ve Felaket Kurtarma (Disaster Recovery)
              </h4>
              <p className="text-xs text-slate-500">
                Veritabanı her gün saat 03:00'te şifreli blob olarak yedeklenir. İstediğiniz an anlık yedek alabilirsiniz.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportBackup}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Anlık JSON Yedeği Al</span>
            </button>

            <button
              onClick={handleRestoreDefaults}
              className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-500" />
              <span>Sıfırla</span>
            </button>
          </div>
        </div>

        {backupMessage && (
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {backupMessage}
          </div>
        )}
      </div>

      {/* Activity Logs Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-4 h-4 text-red-600" />
            Kullanıcı Aktivite ve Güvenlik Denetim İzi (Audit Logs)
          </h4>

          {/* Level Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setFilterLevel('all')}
              className={`px-2.5 py-1 rounded transition ${filterLevel === 'all' ? 'bg-white dark:bg-slate-900 shadow-xs' : 'text-slate-500'}`}
            >
              Tümü ({logs.length})
            </button>
            <button
              onClick={() => setFilterLevel('info')}
              className={`px-2.5 py-1 rounded transition ${filterLevel === 'info' ? 'bg-white dark:bg-slate-900 shadow-xs text-blue-600' : 'text-slate-500'}`}
            >
              Bilgi
            </button>
            <button
              onClick={() => setFilterLevel('warn')}
              className={`px-2.5 py-1 rounded transition ${filterLevel === 'warn' ? 'bg-white dark:bg-slate-900 shadow-xs text-amber-600' : 'text-slate-500'}`}
            >
              Uyarı
            </button>
            <button
              onClick={() => setFilterLevel('security')}
              className={`px-2.5 py-1 rounded transition ${filterLevel === 'security' ? 'bg-white dark:bg-slate-900 shadow-xs text-red-600' : 'text-slate-500'}`}
            >
              Güvenlik
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
          <div className="overflow-x-auto text-xs font-mono">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Zaman</th>
                  <th className="p-3">Kullanıcı</th>
                  <th className="p-3">Rol</th>
                  <th className="p-3">Eylem</th>
                  <th className="p-3">Açıklama</th>
                  <th className="p-3">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-750">
                    <td className="p-3 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                    <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{log.userName}</td>
                    <td className="p-3">
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded font-sans font-semibold">
                        {log.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`font-bold ${log.level === 'warn' ? 'text-amber-600' : log.level === 'security' ? 'text-red-600' : 'text-blue-600'}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300 font-sans max-w-sm truncate">
                      {log.details}
                    </td>
                    <td className="p-3 text-slate-400 text-[11px]">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
