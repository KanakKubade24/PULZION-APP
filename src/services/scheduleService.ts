import { ScheduleSlot, EventItem } from '../types';
import { EventService } from './eventService';

export const ScheduleService = {
  getDays(): { id: 'Day 1' | 'Day 2' | 'Day 3'; label: string; date: string; fullDate: string }[] {
    return [
      { id: 'Day 1', label: 'Day 1', date: 'Sept 18', fullDate: 'Friday, September 18, 2026' },
      { id: 'Day 2', label: 'Day 2', date: 'Sept 19', fullDate: 'Saturday, September 19, 2026' },
      { id: 'Day 3', label: 'Day 3', date: 'Sept 20', fullDate: 'Sunday, September 20, 2026' },
    ];
  },

  getAllScheduleSlots(): ScheduleSlot[] {
    const events = EventService.getAllEvents();
    
    // Convert events to schedule slots
    const slots: ScheduleSlot[] = [
      {
        id: 'slot-1',
        eventId: 'alien-code-infiltrate',
        eventTitle: 'Code Infiltration (Round 1: Cipher Breach)',
        category: 'Coding',
        day: 'Day 1',
        dateLabel: 'Sept 18, 2026',
        startTime: '10:00 AM',
        endTime: '11:15 AM',
        venue: 'Cyber Lab 4 & 5',
        status: 'completed',
        description: '45-minute speed bug hunt & algorithmic cipher decryption sprint.',
      },
      {
        id: 'slot-2',
        eventId: 'alien-code-infiltrate',
        eventTitle: 'Code Infiltration (Round 2: Grid Hack Finale)',
        category: 'Coding',
        day: 'Day 1',
        dateLabel: 'Sept 18, 2026',
        startTime: '11:45 AM',
        endTime: '01:30 PM',
        venue: 'Cyber Lab 4 & 5',
        status: 'live',
        description: 'Advanced dynamic programming, graph traversal algorithms under strict memory caps.',
      },
      {
        id: 'slot-3',
        eventId: 'cyber-alien-ctf',
        eventTitle: 'Area 51: Cyber Siege (Jeopardy CTF Sprint)',
        category: 'Cyber Security',
        day: 'Day 1',
        dateLabel: 'Sept 18, 2026',
        startTime: '02:00 PM',
        endTime: '05:00 PM',
        venue: 'Advanced Network Defense Lab',
        status: 'live',
        description: 'Jeopardy board challenges across Web, Reverse Engineering, and Cryptanalysis.',
      },
      {
        id: 'slot-4',
        eventId: 'alien-esports-showdown',
        eventTitle: 'Cosmic Arena: Valorant Qualifiers (BO1)',
        category: 'Gaming',
        day: 'Day 1',
        dateLabel: 'Sept 18, 2026',
        startTime: '04:00 PM',
        endTime: '08:30 PM',
        venue: 'Esports Gaming Dome & Discord Servers',
        status: 'upcoming',
        description: 'Bracket stage matches streamed on arena projector boards with live commentary.',
      },
      {
        id: 'slot-5',
        eventId: 'galactic-hackathon-36',
        eventTitle: 'Galactic Infiltration: 36-Hour Hackathon Kickoff',
        category: 'AI & Web',
        day: 'Day 2',
        dateLabel: 'Sept 19, 2026',
        startTime: '09:00 AM',
        endTime: '11:00 AM',
        venue: 'Central Innovation Auditorium',
        status: 'upcoming',
        description: 'Problem statement release, team registration audit, and architecture pitch.',
      },
      {
        id: 'slot-6',
        eventId: 'robowars-alien-clash',
        eventTitle: 'Mecha-Wars: Safety Scrutiny & 15kg Bot Arena Clash',
        category: 'Robotics',
        day: 'Day 2',
        dateLabel: 'Sept 19, 2026',
        startTime: '11:00 AM',
        endTime: '02:30 PM',
        venue: 'Armored Combat Arena (Grounds)',
        status: 'upcoming',
        description: 'Pneumatic lifters and spinning blades battle for supremacy in polycarbonate cage.',
      },
      {
        id: 'slot-7',
        eventId: 'robowars-alien-clash',
        eventTitle: 'Mecha-Wars: 30kg Heavyweight Combat Deathmatch',
        category: 'Robotics',
        day: 'Day 2',
        dateLabel: 'Sept 19, 2026',
        startTime: '03:30 PM',
        endTime: '06:30 PM',
        venue: 'Armored Combat Arena (Grounds)',
        status: 'upcoming',
        description: 'Heavyweight destructive mechs enter the hazard zone with flame jets and pit traps.',
      },
      {
        id: 'slot-8',
        eventId: 'galactic-hackathon-36',
        eventTitle: 'Galactic Infiltration: Midnight Mentor Review & Jury Checkpoint 2',
        category: 'AI & Web',
        day: 'Day 2',
        dateLabel: 'Sept 19, 2026',
        startTime: '11:30 PM',
        endTime: '02:00 AM',
        venue: 'Coding Lounge (Night Sector)',
        status: 'upcoming',
        description: 'Deep technical code review, API integration tests, and live debugging assistance.',
      },
      {
        id: 'slot-9',
        eventId: 'galactic-hackathon-36',
        eventTitle: 'Grand Finale Showcase & VC Pitch Sessions',
        category: 'AI & Web',
        day: 'Day 3',
        dateLabel: 'Sept 20, 2026',
        startTime: '01:00 PM',
        endTime: '04:30 PM',
        venue: 'Main Auditorium Dome',
        status: 'upcoming',
        description: 'Top 10 finalist teams present live prototypes before angel investors and tech leaders.',
      },
      {
        id: 'slot-10',
        eventId: 'alien-esports-showdown',
        eventTitle: 'Cosmic Arena: Grand Stage Finals (BO3 + BO5)',
        category: 'Gaming',
        day: 'Day 3',
        dateLabel: 'Sept 20, 2026',
        startTime: '04:30 PM',
        endTime: '07:30 PM',
        venue: 'Main Amphitheatre & Live Stream',
        status: 'upcoming',
        description: 'The top two tactical squads clash for the ₹60,000 championship trophy on stage.',
      },
      {
        id: 'slot-11',
        eventId: 'conclave-closing-ceremony',
        eventTitle: 'Grand Conclave Valedictory & Prize Distribution',
        category: 'Management & Fun',
        day: 'Day 3',
        dateLabel: 'Sept 20, 2026',
        startTime: '07:30 PM',
        endTime: '09:30 PM',
        venue: 'Main Amphitheatre Stage',
        status: 'upcoming',
        description: 'Felicitation of winners, distribution of ₹5,00,000+ prize pool, certificates and after-party.',
      },
    ];

    return slots;
  },

  getScheduleForDay(day: 'Day 1' | 'Day 2' | 'Day 3', statusFilter?: 'all' | 'live' | 'upcoming' | 'completed'): ScheduleSlot[] {
    let slots = this.getAllScheduleSlots().filter((s) => s.day === day);
    if (statusFilter && statusFilter !== 'all') {
      slots = slots.filter((s) => s.status === statusFilter);
    }
    return slots;
  },

  getLiveNowSlots(): ScheduleSlot[] {
    return this.getAllScheduleSlots().filter((s) => s.status === 'live');
  },
};
