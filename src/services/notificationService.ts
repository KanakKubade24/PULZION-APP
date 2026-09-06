import { AppNotification } from '../types';

const NOTIFICATIONS_STORAGE_KEY = 'nexus_app_notifications';

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: '🚀 Conclave Clearance Active',
    body: 'Your Digital Invasion Pass is verified for entry into PICT Pune campus arenas. Access QR code via the top menu.',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 mins ago
    category: 'announcement',
    isRead: false,
  },
  {
    id: 'notif-2',
    title: '⚡ Code Infiltration Round 2 Live!',
    body: 'Grid Hack Finale has commenced in Cyber Lab 4 & 5. Submissions close in 90 minutes.',
    timestamp: new Date(Date.now() - 1000 * 60 * 65).toISOString(), // 1 hour ago
    category: 'mission',
    isRead: false,
    targetEventId: 'alien-code-infiltrate',
  },
  {
    id: 'notif-3',
    title: '🏆 Defense Brigade Matrix Updated',
    body: 'Squadron Bravo has seized #1 rank on the leaderboard with +12,450 tactical combat points!',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    category: 'reward',
    isRead: true,
  },
  {
    id: 'notif-4',
    title: '📅 Day 2 Schedule Published',
    body: '36-Hour Galactic Hackathon and Mecha-Wars combat schedules are now synchronized. Check timeline.',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
    category: 'schedule',
    isRead: true,
  },
];

export const NotificationService = {
  getNotifications(): AppNotification[] {
    try {
      const data = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    } catch (e) {
      return INITIAL_NOTIFICATIONS;
    }
  },

  getUnreadCount(): number {
    return this.getNotifications().filter((n) => !n.isRead).length;
  },

  markAsRead(notificationId: string): AppNotification[] {
    const list = this.getNotifications().map((n) =>
      n.id === notificationId ? { ...n, isRead: true } : n
    );
    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
    return list;
  },

  markAllAsRead(): AppNotification[] {
    const list = this.getNotifications().map((n) => ({ ...n, isRead: true }));
    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
    return list;
  },

  deleteNotification(notificationId: string): AppNotification[] {
    const list = this.getNotifications().filter((n) => n.id !== notificationId);
    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
    return list;
  },

  addNotification(newNotif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>): AppNotification {
    const created: AppNotification = {
      ...newNotif,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    const list = [created, ...this.getNotifications()];
    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
    return created;
  },
};
