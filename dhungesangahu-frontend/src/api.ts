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

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function adminLogin(username: string, password: string): Promise<{ success: boolean; token: string; username: string }> {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Invalid credentials');
  }
  return res.json();
}

export async function getNotices(): Promise<Notice[]> {
  const res = await fetch(`${API_URL}/notices`);
  if (!res.ok) {
    throw new Error('Failed to fetch notices');
  }
  const data = await res.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id || item.id
  }));
}

export async function createNotice(notice: Omit<Notice, 'id'>): Promise<Notice> {
  const res = await fetch(`${API_URL}/notices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notice),
  });
  if (!res.ok) {
    throw new Error('Failed to create notice');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function deleteNotice(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/notices/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete notice');
  }
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

export async function createCalendarEvent(event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
  const res = await fetch(`${API_URL}/calendar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!res.ok) {
    throw new Error('Failed to create calendar event');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function deleteCalendarEvent(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/calendar/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete calendar event');
  }
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

export async function getContactMessages(): Promise<ContactMessage[]> {
  const res = await fetch(`${API_URL}/contact-messages`);
  if (!res.ok) {
    throw new Error('Failed to fetch contact messages');
  }
  const data = await res.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id || item.id
  }));
}

export async function deleteContactMessage(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/contact-messages/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete message');
  }
}

