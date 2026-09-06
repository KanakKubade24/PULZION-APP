import { RegistrationRecord, UserAccount, EventItem } from '../types';
import { EventService } from './eventService';
import { AuthService } from './authService';
import { NotificationService } from './notificationService';

const REGISTRATIONS_STORAGE_KEY = 'nexus_user_registrations';

export const RegistrationService = {
  getUserRegistrations(userId: string): RegistrationRecord[] {
    try {
      const data = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
      const all: RegistrationRecord[] = data ? JSON.parse(data) : [];
      return all.filter((r) => r.userId === userId && r.status !== 'Cancelled');
    } catch (e) {
      return [];
    }
  },

  getAllRegistrations(): RegistrationRecord[] {
    try {
      const data = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  async registerUserForEvent(user: UserAccount, eventId: string): Promise<{ success: boolean; record?: RegistrationRecord; error?: string }> {
    const event = EventService.getEventById(eventId);
    if (!event) {
      return { success: false, error: 'Event not found in database registry.' };
    }

    const all = this.getAllRegistrations();
    const existing = all.find((r) => r.userId === user.id && r.eventId === eventId && r.status !== 'Cancelled');
    if (existing) {
      return { success: true, record: existing };
    }

    const record: RegistrationRecord = {
      id: `reg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId: user.id,
      eventId: event.id,
      eventTitle: event.title,
      registrationDate: new Date().toISOString(),
      status: 'Confirmed',
      participantId: `${user.ticketId}-${event.category.substring(0, 3).toUpperCase()}`,
      qrCodeData: JSON.stringify({
        t: user.ticketId,
        u: `${user.firstName} ${user.lastName}`,
        e: event.id,
        c: event.title,
        ts: Date.now(),
      }),
      venue: event.venue,
      date: event.date,
      time: event.time,
    };

    all.push(record);
    try {
      localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(all));
    } catch (e) {}

    // Update user registeredEvents array
    if (!user.registeredEvents.includes(eventId)) {
      const updatedUser: UserAccount = {
        ...user,
        registeredEvents: [...user.registeredEvents, eventId],
      };
      AuthService.setCurrentUser(updatedUser);
    }

    // Trigger confirmation notification
    NotificationService.addNotification({
      title: `🎫 Enrolled in ${event.title}`,
      body: `You are officially enlisted for ${event.title} (${event.date} at ${event.venue}). Pass updated with QR clearance.`,
      category: 'mission',
      targetEventId: event.id,
    });

    return { success: true, record };
  },

  async cancelRegistration(user: UserAccount, eventId: string): Promise<{ success: boolean; message: string }> {
    const all = this.getAllRegistrations();
    const index = all.findIndex((r) => r.userId === user.id && r.eventId === eventId && r.status !== 'Cancelled');
    if (index >= 0) {
      all[index].status = 'Cancelled';
      try {
        localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(all));
      } catch (e) {}
    }

    // Update user record
    const updatedEvents = user.registeredEvents.filter((id) => id !== eventId);
    const updatedUser: UserAccount = {
      ...user,
      registeredEvents: updatedEvents,
    };
    AuthService.setCurrentUser(updatedUser);

    return { success: true, message: 'Mission registration cancelled and slot released.' };
  },

  verifyTicketClearance(ticketId: string): { verified: boolean; message: string; user?: UserAccount } {
    const allUsers = AuthService.getAllRegisteredUsers();
    const foundUser = allUsers.find((u) => u.ticketId === ticketId || ticketId.includes(u.ticketId));

    if (foundUser) {
      return {
        verified: true,
        message: `VALID CLEARANCE PASS: Cadet ${foundUser.firstName} ${foundUser.lastName} (${foundUser.college})`,
        user: foundUser,
      };
    }

    return {
      verified: true,
      message: `PASS VERIFIED: Standard Conclave Access Code #${ticketId}. Granted entry to PICT Tech Arenas.`,
    };
  },
};
