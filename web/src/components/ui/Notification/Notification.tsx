'use client'

import { useEffect } from 'react'
import { X, CheckCircle2, AlertCircle, Wifi, WifiOff } from 'lucide-react'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface NotificationProps {
  id: string
  type: NotificationType
  title: string
  message?: string
  duration?: number
  onClose: (id: string) => void
}

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Wifi,
  warning: WifiOff,
}

const getTypeVars = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return {
        bg: '--status-success-bg',
        border: '--status-success-border',
        text: '--status-success-text',
        icon: '--status-success',
      }
    case 'error':
      return {
        bg: '--status-error-bg',
        border: '--status-error-border',
        text: '--status-error-text',
        icon: '--status-error',
      }
    case 'info':
      return {
        bg: '--status-info-bg',
        border: '--status-info-border',
        text: '--status-info-text',
        icon: '--status-info',
      }
    case 'warning':
      return {
        bg: '--status-warning-bg',
        border: '--status-warning-border',
        text: '--status-warning-text',
        icon: '--status-warning',
      }
  }
}

export function Notification({ id, type, title, message, duration = 5000, onClose }: NotificationProps) {
  const Icon = icons[type]
  const vars = getTypeVars(type)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [id, duration, onClose])

  return (
    <div
      className="flex w-72 items-start gap-2.5 rounded-lg border p-2.5 shadow-lg backdrop-blur-xl transition-all duration-300 animate-slide-in"
      role="alert"
      aria-live="polite"
      style={{
        backgroundColor: `var(${vars.bg})`,
        borderColor: `var(${vars.border})`,
        color: `var(${vars.text})`,
      }}
    >
      <Icon className="mt-0.5 size-4 shrink-0" style={{ color: `var(${vars.icon})` }} />
      
      <div className="flex-1 min-w-0">
        <h3 className="text-xs font-semibold">{title}</h3>
        {message && <p className="mt-0.5 text-[11px] opacity-90">{message}</p>}
      </div>

      <button
        onClick={() => onClose(id)}
        className="shrink-0 rounded border p-1 transition-all duration-200"
        aria-label="Fechar notificação"
        type="button"
        style={{
          backgroundColor: 'var(--bg-elevated)',
          borderColor: 'var(--border-transparent)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--status-error)'
          e.currentTarget.style.boxShadow = '2px 2px 0px 0px var(--status-error)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-transparent)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <X className="size-3" />
      </button>
    </div>
  )
}

export default Notification
