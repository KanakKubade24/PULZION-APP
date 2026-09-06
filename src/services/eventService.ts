import { EventItem } from '../types';
import { EVENTS_DATA } from '../data/eventsData';

const BOOKMARKS_STORAGE_KEY = 'nexus_bookmarked_events';

export const EventService = {
  getAllEvents(): EventItem[] {
    return EVENTS_DATA.map((event, index) => ({
      ...event,
      day: event.day || (index % 3 === 0 ? 'Day 1' : index % 3 === 1 ? 'Day 2' : 'Day 3'),
      registrationOpen: event.registrationOpen !== undefined ? event.registrationOpen : true,
      eligibility: event.eligibility || 'Open to all undergraduate & diploma engineering students with valid college ID.',
      instructions: event.instructions || [
        'Report to the venue 15 minutes before the scheduled reporting time.',
        'Carry your Digital Conclave Pass with QR Code on your mobile device.',
        'Laptops and hardware gear must be registered at the security kiosk upon entry.',
      ],
    }));
  },

  getEventById(id: string): EventItem | undefined {
    return this.getAllEvents().find((e) => e.id === id);
  },

  getCategories(): string[] {
    const events = this.getAllEvents();
    const set = new Set<string>();
    events.forEach((e) => set.add(e.category));
    return ['All', ...Array.from(set)];
  },

  searchAndFilterEvents(params: {
    query?: string;
    category?: string;
    day?: string;
    sortBy?: 'popular' | 'prize' | 'fee' | 'slots' | 'title';
    onlyBookmarked?: boolean;
    onlyRegistered?: boolean;
    userRegisteredIds?: string[];
  }): EventItem[] {
    let list = this.getAllEvents();
    const bookmarks = this.getBookmarkedEventIds();

    if (params.query && params.query.trim()) {
      const q = params.query.trim().toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.tagline.toLowerCase().includes(q) ||
          e.overview.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.coordinators.some((c) => c.name.toLowerCase().includes(q))
      );
    }

    if (params.category && params.category !== 'All') {
      list = list.filter((e) => e.category === params.category);
    }

    if (params.day && params.day !== 'All') {
      list = list.filter((e) => e.day === params.day);
    }

    if (params.onlyBookmarked) {
      list = list.filter((e) => bookmarks.includes(e.id));
    }

    if (params.onlyRegistered && params.userRegisteredIds) {
      list = list.filter((e) => params.userRegisteredIds!.includes(e.id));
    }

    if (params.sortBy) {
      if (params.sortBy === 'popular') {
        list.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
      } else if (params.sortBy === 'fee') {
        list.sort((a, b) => a.entryFee - b.entryFee);
      } else if (params.sortBy === 'slots') {
        list.sort((a, b) => a.slotsRemaining - b.slotsRemaining);
      } else if (params.sortBy === 'title') {
        list.sort((a, b) => a.title.localeCompare(b.title));
      } else if (params.sortBy === 'prize') {
        const getPrizeNum = (p: string) => parseInt(p.replace(/[^0-9]/g, '')) || 0;
        list.sort((a, b) => getPrizeNum(b.prizePool) - getPrizeNum(a.prizePool));
      }
    }

    return list;
  },

  getBookmarkedEventIds(): string[] {
    try {
      const data = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleBookmark(eventId: string): boolean {
    const list = this.getBookmarkedEventIds();
    const index = list.indexOf(eventId);
    let isNowBookmarked = false;
    if (index >= 0) {
      list.splice(index, 1);
      isNowBookmarked = false;
    } else {
      list.push(eventId);
      isNowBookmarked = true;
    }
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
    return isNowBookmarked;
  },

  isBookmarked(eventId: string): boolean {
    return this.getBookmarkedEventIds().includes(eventId);
  },
};
