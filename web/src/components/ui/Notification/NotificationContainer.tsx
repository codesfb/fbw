import { Notification, type NotificationProps } from './Notification'

interface NotificationContainerProps {
  notifications: NotificationProps[]
  onClose: (id: string) => void
}

export function NotificationContainer({ notifications, onClose }: NotificationContainerProps) {
  if (notifications.length === 0) return null

  return (
    <div
      className="fixed right-4 top-20 z-50 flex flex-col gap-3"
      aria-live="polite"
      aria-atomic="false"
    >
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} onClose={onClose} />
      ))}
    </div>
  )
}

export default NotificationContainer
