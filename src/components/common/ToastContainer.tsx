import React from 'react'
import { useToastStore } from '../../stores/toastStore'
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react'

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        let icon = <Info className="w-4 h-4 text-purple-400 shrink-0" />
        let borderColor = 'border-white/10'

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          borderColor = 'border-emerald-500/20'
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          borderColor = 'border-rose-500/20'
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          borderColor = 'border-amber-500/20'
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-[#151922]/95 backdrop-blur-md border ${borderColor} shadow-2xl text-sm transition-all duration-200 transform translate-y-0 opacity-100`}
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#F5F7FA] text-sm leading-snug">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-[#9AA3B2] mt-0.5 leading-relaxed">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#687181] hover:text-[#F5F7FA] transition-colors p-0.5 -mr-1 -mt-1 rounded focus:outline-none focus:ring-1 focus:ring-purple-400"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
