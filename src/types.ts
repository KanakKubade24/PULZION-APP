export interface EventRound {
  roundNumber: number;
  title: string;
  description: string;
  duration: string;
}

export interface CoordinatorContact {
  name: string;
  role: string;
  phone: string;
  email: string;
  whatsapp?: string;
}

export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Coding' | 'Cyber Security' | 'AI & Web' | 'Gaming' | 'Robotics' | 'Management & Fun';
  badge: string;
  entryFee: number;
  prizePool: string;
  firstPrize: string;
  secondPrize: string;
  teamSize: string;
  date: string;
  isoDate?: string;
  time: string;
  startTime?: string;
  endTime?: string;
  day?: 'Day 1' | 'Day 2' | 'Day 3' | number;
  venue: string;
  slotsRemaining: number;
  totalSlots: number;
  overview: string;
  rounds: EventRound[];
  rules: string[];
  eligibility?: string;
  instructions?: string[];
  coordinators: CoordinatorContact[];
  isPopular?: boolean;
  registrationOpen?: boolean;
  registrationDeadline?: string;
}

export interface UserAccount {
  id: string;
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactNumber?: string;
  referralCode?: string;
  country: string;
  college: string;
  year: string;
  defenseTeamId?: 'bravo' | 'charlie' | 'delta' | 'echo' | string;
  registeredEvents: string[]; // event IDs
  joinedAt: string;
  ticketId: string;
  profileImage?: string;
  checkInVerified?: boolean;
  checkInTimestamp?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  category: 'announcement' | 'mission' | 'schedule' | 'reward';
  isRead: boolean;
  actionUrl?: string;
  targetEventId?: string;
}

export interface ScheduleSlot {
  id: string;
  eventId: string;
  eventTitle: string;
  category: string;
  day: 'Day 1' | 'Day 2' | 'Day 3';
  dateLabel: string;
  startTime: string;
  endTime: string;
  venue: string;
  status: 'live' | 'upcoming' | 'completed';
  description: string;
}

export interface RegistrationRecord {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  registrationDate: string;
  status: 'Confirmed' | 'Pending Verification' | 'Checked-in' | 'Cancelled';
  participantId: string;
  qrCodeData: string;
  venue: string;
  date: string;
  time: string;
}

export interface SponsorItem {
  id: string;
  name: string;
  tier: 'Title Sponsor' | 'Co-Powered By' | 'Platinum' | 'Cloud & AI Partner' | 'Gaming Partner' | 'Beverage Partner';
  logoText: string;
  logoIcon: string;
  tagline: string;
  description: string;
  website: string;
  badgeColor: string;
}

export interface CoordinatorItem {
  id: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  whatsapp: string;
  image: string;
  isLead?: boolean;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'Hackathon' | 'Esports' | 'RoboWars' | 'Keynotes' | 'Crowd';
  image: string;
  description: string;
  year: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Registration' | 'Competitions' | 'Accommodation & Venue' | 'Prizes & Certificates';
}
