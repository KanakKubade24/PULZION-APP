import { UserAccount } from '../types';

const STORAGE_KEY = 'pulzion_user_session';
const ALL_USERS_KEY = 'pulzion_registered_users';

export const AuthService = {
  getCurrentUser(): UserAccount | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error fetching current user session', e);
      return null;
    }
  },

  setCurrentUser(user: UserAccount | null): void {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        // Also update in all users directory
        const all = this.getAllRegisteredUsers();
        const index = all.findIndex((u) => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());
        if (index >= 0) {
          all[index] = user;
        } else {
          all.push(user);
        }
        localStorage.setItem(ALL_USERS_KEY, JSON.stringify(all));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving user session', e);
    }
  },

  getAllRegisteredUsers(): UserAccount[] {
    try {
      const data = localStorage.getItem(ALL_USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  async login(identifier: string, password: string): Promise<{ success: boolean; user?: UserAccount; error?: string }> {
    // Simulated network latency
    await new Promise((resolve) => setTimeout(resolve, 450));

    const trimmed = identifier.trim().toLowerCase();
    if (!trimmed || !password) {
      return { success: false, error: 'Please enter both identifier (email/username) and security access code.' };
    }

    const all = this.getAllRegisteredUsers();
    const cleanHandle = trimmed.startsWith('@') ? trimmed.slice(1) : trimmed;
    const found = all.find(
      (u) =>
        u.email.toLowerCase() === trimmed ||
        (u.username && u.username.toLowerCase() === cleanHandle)
    );

    if (found) {
      this.setCurrentUser(found);
      return { success: true, user: found };
    }

    // Default demo operative if not in registry
    const defaultUser: UserAccount = {
      id: `user-${Date.now()}`,
      username: cleanHandle || 'operative_lead',
      firstName: cleanHandle ? cleanHandle.charAt(0).toUpperCase() + cleanHandle.slice(1) : 'Commander',
      lastName: 'Prime',
      email: trimmed.includes('@') ? trimmed : `${cleanHandle}@conclave.net`,
      phone: '+91 98765 43210',
      contactNumber: '+91 98765 43210',
      country: 'India',
      college: 'Pune Institute of Computer Technology (PICT)',
      year: 'Third Year (TE)',
      referralCode: `NEXUS-${Math.floor(1000 + Math.random() * 9000)}`,
      registeredEvents: ['alien-code-infiltrate', 'cyber-alien-ctf'],
      defenseTeamId: 'bravo',
      joinedAt: new Date().toISOString(),
      ticketId: `NX-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    this.setCurrentUser(defaultUser);
    return { success: true, user: defaultUser };
  },

  async register(data: {
    firstName: string;
    lastName: string;
    username?: string;
    email: string;
    phone: string;
    contactNumber?: string;
    college: string;
    year: string;
    referralCode?: string;
    defenseTeamId?: string;
    initialEvents?: string[];
  }): Promise<{ success: boolean; user?: UserAccount; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.college) {
      return { success: false, error: 'Please complete all required enlistment fields.' };
    }

    const cleanUsername = data.username
      ? data.username.replace('@', '').trim().toLowerCase()
      : `${data.firstName.toLowerCase()}_${Math.floor(100 + Math.random() * 900)}`;

    const newUser: UserAccount = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      username: cleanUsername,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      contactNumber: data.contactNumber?.trim() || data.phone.trim(),
      referralCode: data.referralCode?.trim().toUpperCase() || `NX-${Math.floor(1000 + Math.random() * 9000)}`,
      country: 'India',
      college: data.college.trim(),
      year: data.year || 'Second Year (SE)',
      defenseTeamId: data.defenseTeamId || 'bravo',
      registeredEvents: data.initialEvents || ['alien-code-infiltrate'],
      joinedAt: new Date().toISOString(),
      ticketId: `NX-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    this.setCurrentUser(newUser);
    return { success: true, user: newUser };
  },

  async updateProfile(user: UserAccount): Promise<UserAccount> {
    this.setCurrentUser(user);
    return user;
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please provide a valid registered email terminal address.' };
    }
    return {
      success: true,
      message: `A secure 6-digit recovery clearance token has been dispatched to ${email}.`,
    };
  },

  logout(): void {
    this.setCurrentUser(null);
  },
};
