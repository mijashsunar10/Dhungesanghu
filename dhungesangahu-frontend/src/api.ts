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
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  image: string;
  desc: string;
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

export async function updateNotice(id: string, notice: Omit<Notice, 'id'>): Promise<Notice> {
  const res = await fetch(`${API_URL}/notices/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notice),
  });
  if (!res.ok) {
    throw new Error('Failed to update notice');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
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

export async function updateCalendarEvent(id: string, event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
  const res = await fetch(`${API_URL}/calendar/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!res.ok) {
    throw new Error('Failed to update calendar event');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
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

export async function getServices(): Promise<Service[]> {
  const res = await fetch(`${API_URL}/services`);
  if (!res.ok) {
    throw new Error('Failed to fetch services');
  }
  const data = await res.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id || item.id
  }));
}

export async function createService(service: Omit<Service, 'id'>): Promise<Service> {
  const res = await fetch(`${API_URL}/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(service),
  });
  if (!res.ok) {
    throw new Error('Failed to create service');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function updateService(id: string, service: Omit<Service, 'id'>): Promise<Service> {
  const res = await fetch(`${API_URL}/services/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(service),
  });
  if (!res.ok) {
    throw new Error('Failed to update service');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function deleteService(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/services/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete service');
  }
}

export interface GalleryImage {
  id: string;
  url: string;
  category: 'classroom' | 'activities' | 'events';
  caption: string;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const res = await fetch(`${API_URL}/gallery`);
  if (!res.ok) {
    throw new Error('Failed to fetch gallery images');
  }
  const data = await res.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id || item.id
  }));
}

export async function createGalleryImage(image: Omit<GalleryImage, 'id'>): Promise<GalleryImage> {
  const res = await fetch(`${API_URL}/gallery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(image),
  });
  if (!res.ok) {
    throw new Error('Failed to create gallery image');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function updateGalleryImage(id: string, image: Omit<GalleryImage, 'id'>): Promise<GalleryImage> {
  const res = await fetch(`${API_URL}/gallery/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(image),
  });
  if (!res.ok) {
    throw new Error('Failed to update gallery image');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function deleteGalleryImage(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/gallery/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete gallery image');
  }
}

export interface GalleryCategory {
  id: string;
  categoryId: string;
  name: string;
}

export async function getGalleryCategories(): Promise<GalleryCategory[]> {
  const res = await fetch(`${API_URL}/gallery-categories`);
  if (!res.ok) {
    throw new Error('Failed to fetch gallery categories');
  }
  const data = await res.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id || item.id
  }));
}

export async function createGalleryCategory(cat: Omit<GalleryCategory, 'id'>): Promise<GalleryCategory> {
  const res = await fetch(`${API_URL}/gallery-categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cat),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to create gallery category');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function deleteGalleryCategory(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/gallery-categories/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete gallery category');
  }
}

export interface Testimonial {
  id: string;
  quote: string;
  parentName: string;
  parentRelation: string;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(`${API_URL}/testimonials`);
  if (!res.ok) {
    throw new Error('Failed to fetch testimonials');
  }
  const data = await res.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id || item.id
  }));
}

export async function createTestimonial(t: Omit<Testimonial, 'id'>): Promise<Testimonial> {
  const res = await fetch(`${API_URL}/testimonials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(t),
  });
  if (!res.ok) {
    throw new Error('Failed to create testimonial');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function updateTestimonial(id: string, t: Omit<Testimonial, 'id'>): Promise<Testimonial> {
  const res = await fetch(`${API_URL}/testimonials/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(t),
  });
  if (!res.ok) {
    throw new Error('Failed to update testimonial');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function deleteTestimonial(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/testimonials/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete testimonial');
  }
}

export interface PrincipalMessageData {
  id?: string;
  name: string;
  title: string;
  image: string;
  qualifications: string;
  experience: string;
  email: string;
  quote: string;
  quoteAuthor: string;
  messageIntro: string;
  message: string;
  closure: string;
  signature: string;
  signatureTitle: string;
  signatureSchool: string;
  coreTenets: string;
}

export async function getPrincipalMessage(): Promise<PrincipalMessageData> {
  const res = await fetch(`${API_URL}/principal-message`);
  if (!res.ok) {
    throw new Error('Failed to fetch principal message');
  }
  return res.json();
}

export async function updatePrincipalMessage(data: PrincipalMessageData): Promise<PrincipalMessageData> {
  const res = await fetch(`${API_URL}/principal-message`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to update principal message');
  }
  return res.json();
}
