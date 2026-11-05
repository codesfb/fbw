import { useState, useCallback } from 'react'
import type { NotificationType, NotificationProps } from '@/components/ui/Notification'

interface NotificationOptions {
  title: string
  message?: string
  type?: NotificationType
  duration?: number
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([])

  const addNotification = useCallback((options: NotificationOptions) => {
    const id = `notification-${Date.now()}-${Math.random()}`
    const notification: NotificationProps = {
      id,
      type: options.type || 'info',
      title: options.title,
      message: options.message,
      duration: options.duration ?? 5000,
      onClose: () => {},
    }

    setNotifications((prev) => [...prev, notification])
    return id
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications: notifications.map((n) => ({ ...n, onClose: removeNotification })),
    addNotification,
    removeNotification,
    clearAll,
  }
}

export default useNotifications
