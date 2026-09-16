import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error?.message || 'Beklenmeyen bir hata oluştu.' };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('gundem_tuzla_news_cache');
    } catch {
      // ignore
    }
    this.setState({ hasError: false, errorMessage: '' });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-900/50 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Gündem Tuzla 34</h2>
              <p className="text-xs text-slate-400">
                Sayfa yüklenirken bir sorun algılandı. Önbelleği temizleyip sayfayı yenileyebilirsiniz.
              </p>
              {this.state.errorMessage && (
                <p className="text-[11px] font-mono text-red-400 bg-slate-950 p-2 rounded border border-slate-800 overflow-x-auto text-left">
                  {this.state.errorMessage}
                </p>
              )}
            </div>
            <div className="pt-2 flex gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Yeniden Yükle</span>
              </button>
              <button
                onClick={() => {
                  this.setState({ hasError: false });
                }}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-lg transition cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Tekrar Dene</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
