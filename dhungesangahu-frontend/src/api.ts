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

export interface Alumni {
  id: string;
  name: string;
  batch: string;
  profession: string;
  quote: string;
  affiliation: string;
  path: string;
  image: string;
}

export async function getAlumni(): Promise<Alumni[]> {
  const res = await fetch(`${API_URL}/alumni`);
  if (!res.ok) {
    throw new Error('Failed to fetch alumni list');
  }
  const data = await res.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id || item.id
  }));
}

export async function createAlumni(alumni: Omit<Alumni, 'id'>): Promise<Alumni> {
  const res = await fetch(`${API_URL}/alumni`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(alumni),
  });
  if (!res.ok) {
    throw new Error('Failed to create alumni entry');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function updateAlumni(id: string, alumni: Omit<Alumni, 'id'>): Promise<Alumni> {
  const res = await fetch(`${API_URL}/alumni/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(alumni),
  });
  if (!res.ok) {
    throw new Error('Failed to update alumni entry');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function deleteAlumni(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/alumni/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete alumni entry');
  }
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  desc: string;
}

export async function getMilestones(): Promise<Milestone[]> {
  const res = await fetch(`${API_URL}/milestones`);
  if (!res.ok) {
    throw new Error('Failed to fetch milestones');
  }
  const data = await res.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id || item.id
  }));
}

export async function createMilestone(milestone: Omit<Milestone, 'id'>): Promise<Milestone> {
  const res = await fetch(`${API_URL}/milestones`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(milestone),
  });
  if (!res.ok) {
    throw new Error('Failed to create milestone');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function updateMilestone(id: string, milestone: Omit<Milestone, 'id'>): Promise<Milestone> {
  const res = await fetch(`${API_URL}/milestones/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(milestone),
  });
  if (!res.ok) {
    throw new Error('Failed to update milestone');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function deleteMilestone(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/milestones/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete milestone');
  }
}

export interface Rule {
  id: string;
  text: string;
  order: number;
}

export async function getRules(): Promise<Rule[]> {
  const res = await fetch(`${API_URL}/rules`);
  if (!res.ok) {
    throw new Error('Failed to fetch school rules');
  }
  const data = await res.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id || item.id
  }));
}

export async function createRule(rule: Omit<Rule, 'id'>): Promise<Rule> {
  const res = await fetch(`${API_URL}/rules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rule),
  });
  if (!res.ok) {
    throw new Error('Failed to create rule');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function updateRule(id: string, rule: Omit<Rule, 'id'>): Promise<Rule> {
  const res = await fetch(`${API_URL}/rules/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rule),
  });
  if (!res.ok) {
    throw new Error('Failed to update rule');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function deleteRule(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/rules/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete rule');
  }
}

export interface Program {
  id: string;
  programId: string;
  title: string;
  subtitle: string;
  description: string;
  ageGroup: string;
  highlights: string[];
  subjects: string[];
  icon: string;
  order: number;
}

export async function getPrograms(): Promise<Program[]> {
  const res = await fetch(`${API_URL}/programs`);
  if (!res.ok) {
    throw new Error('Failed to fetch academic programs');
  }
  const data = await res.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id || item.id
  }));
}

export async function createProgram(program: Omit<Program, 'id'>): Promise<Program> {
  const res = await fetch(`${API_URL}/programs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(program),
  });
  if (!res.ok) {
    throw new Error('Failed to create academic program');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function updateProgram(id: string, program: Omit<Program, 'id'>): Promise<Program> {
  const res = await fetch(`${API_URL}/programs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(program),
  });
  if (!res.ok) {
    throw new Error('Failed to update academic program');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function deleteProgram(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/programs/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete academic program');
  }
}

// ADMISSION STEPS
export interface AdmissionStep {
  id: string;
  num: string;
  title: string;
  desc: string;
  icon: string;
  details: string[];
  order: number;
}

export async function getAdmissionSteps(): Promise<AdmissionStep[]> {
  const res = await fetch(`${API_URL}/admission-steps`);
  if (!res.ok) {
    throw new Error('Failed to fetch admission steps');
  }
  const data = await res.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id || item.id
  }));
}

export async function createAdmissionStep(step: Omit<AdmissionStep, 'id'>): Promise<AdmissionStep> {
  const res = await fetch(`${API_URL}/admission-steps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(step),
  });
  if (!res.ok) {
    throw new Error('Failed to create admission step');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function updateAdmissionStep(id: string, step: Omit<AdmissionStep, 'id'>): Promise<AdmissionStep> {
  const res = await fetch(`${API_URL}/admission-steps/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(step),
  });
  if (!res.ok) {
    throw new Error('Failed to update admission step');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function deleteAdmissionStep(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/admission-steps/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete admission step');
  }
}

export interface Official {
  id: string;
  name: string;
  position: string;
  category: 'leadership' | 'teachers' | 'admin';
  categoryLabel: string;
  image: string;
  email: string;
  qualification: string;
  experience: string;
  order: number;
}

export async function getOfficials(): Promise<Official[]> {
  const res = await fetch(`${API_URL}/officials`);
  if (!res.ok) {
    throw new Error('Failed to fetch school officials');
  }
  const data = await res.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id || item.id
  }));
}

export async function createOfficial(official: Omit<Official, 'id' | 'categoryLabel'>): Promise<Official> {
  const res = await fetch(`${API_URL}/officials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(official),
  });
  if (!res.ok) {
    throw new Error('Failed to create school official');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function updateOfficial(id: string, official: Omit<Official, 'id' | 'categoryLabel'>): Promise<Official> {
  const res = await fetch(`${API_URL}/officials/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(official),
  });
  if (!res.ok) {
    throw new Error('Failed to update school official');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function deleteOfficial(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/officials/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete school official');
  }
}

export interface AdmissionFaq {
  id: string;
  q: string;
  a: string;
  order: number;
}

export async function getAdmissionFaqs(): Promise<AdmissionFaq[]> {
  const res = await fetch(`${API_URL}/admission-faqs`);
  if (!res.ok) {
    throw new Error('Failed to fetch admission FAQs');
  }
  const data = await res.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id || item.id
  }));
}

export async function createAdmissionFaq(faq: Omit<AdmissionFaq, 'id'>): Promise<AdmissionFaq> {
  const res = await fetch(`${API_URL}/admission-faqs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(faq),
  });
  if (!res.ok) {
    throw new Error('Failed to create admission FAQ');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function updateAdmissionFaq(id: string, faq: Omit<AdmissionFaq, 'id'>): Promise<AdmissionFaq> {
  const res = await fetch(`${API_URL}/admission-faqs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(faq),
  });
  if (!res.ok) {
    throw new Error('Failed to update admission FAQ');
  }
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function deleteAdmissionFaq(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/admission-faqs/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete admission FAQ');
  }
}






