export interface Notice {
  id: string;
  date: string;
  month: string;
  day: string;
  category: 'exams' | 'events' | 'admin';
  categoryLabel: string;
  title: string;
  desc: string;
  fullContent?: string;
  author?: string;
}

export interface CalendarEvent {
  id: string;
  monthName: string;
  day: number;
  type: 'holiday' | 'exam' | 'meeting' | 'activity';
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function getNotices(): Promise<Notice[]> {
  const res = await fetch(`${API_URL}/notices`);
  if (!res.ok) {
    throw new Error('Failed to fetch notices');
  }
  const data = await res.json();
  // Map MongoDB _id to id if necessary
  return data.map((item: any) => ({
    ...item,
    id: item._id || item.id
  }));
}

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const res = await fetch(`${API_URL}/calendar`);
  if (!res.ok) {
    throw new Error('Failed to fetch calendar events');
  }
  const data = await res.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id || item.id
  }));
}

export async function submitContactForm(formData: ContactFormData): Promise<void> {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    throw new Error('Failed to submit contact form');
  }
}
