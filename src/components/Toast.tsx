import React from 'react';
import { CheckCircle2, X, AlertCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start p-4 rounded-xl shadow-xl border bg-white text-slate-800 transition-all duration-300 animate-slide-up ${
            toast.type === 'success'
              ? 'border-emerald-500/30 ring-1 ring-emerald-500/20'
              : toast.type === 'error'
              ? 'border-red-500/30 ring-1 ring-red-500/20'
              : 'border-blue-500/30 ring-1 ring-blue-500/20'
          }`}
        >
          <div className="mr-3 mt-0.5 flex-shrink-0">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <div className="flex-1 pr-2">
            <h4 className="text-sm font-semibold text-slate-900">{toast.title}</h4>
            {toast.description && (
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{toast.description}</p>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 -mr-1"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
