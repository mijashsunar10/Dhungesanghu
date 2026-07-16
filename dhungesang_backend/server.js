import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './database.js'; // Imports connection & seeds database
import { Notice, CalendarEvent, ContactMessage, Admin, Service, GalleryImage, GalleryCategory, Testimonial } from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes

// --- ADMIN LOGIN ---
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const admin = await Admin.findOne({ username });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
    // Return a simple persistent token for session storage
    res.json({ 
      success: true, 
      token: `session_token_${admin._id}_${Date.now()}`, 
      username: admin.username 
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server login error' });
  }
});

// 1. Get Notices
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (err) {
    console.error('Error fetching notices:', err.message);
    res.status(500).json({ error: 'Database error fetching notices' });
  }
});

// 2. Post a Notice
app.post('/api/notices', async (req, res) => {
  const { date, month, day, category, categoryLabel, title, desc, fullContent, author } = req.body;
  
  if (!date || !month || !day || !category || !categoryLabel || !title || !desc) {
    return res.status(400).json({ error: 'Please provide all required notice fields.' });
  }

  try {
    const newNotice = new Notice({ date, month, day, category, categoryLabel, title, desc, fullContent, author });
    const saved = await newNotice.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving notice:', err.message);
    res.status(500).json({ error: 'Database error saving notice' });
  }
});

// 2b. Delete a Notice
app.delete('/api/notices/:id', async (req, res) => {
  try {
    const deleted = await Notice.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Notice not found.' });
    }
    res.json({ success: true, message: 'Notice deleted successfully' });
  } catch (err) {
    console.error('Error deleting notice:', err.message);
    res.status(500).json({ error: 'Database error deleting notice' });
  }
});

// 2c. Update a Notice
app.put('/api/notices/:id', async (req, res) => {
  const { title, desc, fullContent, category, categoryLabel, author } = req.body;
  try {
    const updated = await Notice.findByIdAndUpdate(
      req.params.id,
      { title, desc, fullContent, category, categoryLabel, author },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Notice not found.' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating notice:', err.message);
    res.status(500).json({ error: 'Database error updating notice' });
  }
});

// 3. Get Calendar Events
app.get('/api/calendar', async (req, res) => {
  try {
    const events = await CalendarEvent.find().sort({ day: 1 });
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err.message);
    res.status(500).json({ error: 'Database error fetching calendar events' });
  }
});

// 3b. Post a Calendar Event
app.post('/api/calendar', async (req, res) => {
  const { monthName, day, type, title, description } = req.body;

  if (!monthName || !day || !type || !title || !description) {
    return res.status(400).json({ error: 'Please provide all required event fields.' });
  }

  try {
    const newEvent = new CalendarEvent({ monthName, day: Number(day), type, title, description });
    const saved = await newEvent.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving event:', err.message);
    res.status(500).json({ error: 'Database error saving calendar event' });
  }
});

// 3c. Delete a Calendar Event
app.delete('/api/calendar/:id', async (req, res) => {
  try {
    const deleted = await CalendarEvent.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Event not found.' });
    }
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err.message);
    res.status(500).json({ error: 'Database error deleting event' });
  }
});

// 3d. Update a Calendar Event
app.put('/api/calendar/:id', async (req, res) => {
  const { monthName, day, type, title, description } = req.body;
  try {
    const updated = await CalendarEvent.findByIdAndUpdate(
      req.params.id,
      { monthName, day: Number(day), type, title, description },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Event not found.' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating calendar event:', err.message);
    res.status(500).json({ error: 'Database error updating calendar event' });
  }
});

// 4. Submit Contact Message
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  try {
    const newMessage = new ContactMessage({ name, email, subject, message });
    const saved = await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully!', data: saved });
  } catch (err) {
    console.error('Error submitting contact form:', err.message);
    res.status(500).json({ error: 'Database error saving contact message' });
  }
});

// 5. Get Contact Messages
app.get('/api/contact-messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err.message);
    res.status(500).json({ error: 'Database error fetching contact messages' });
  }
});

// 5b. Delete Contact Message
app.delete('/api/contact-messages/:id', async (req, res) => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Message not found.' });
    }
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (err) {
    console.error('Error deleting message:', err.message);
    res.status(500).json({ error: 'Database error deleting contact message' });
  }
});

// 6. Get All Services
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error('Error fetching services:', err.message);
    res.status(500).json({ error: 'Database error fetching services' });
  }
});

// 6b. Post a Service
app.post('/api/services', async (req, res) => {
  const { title, image, desc } = req.body;

  if (!title || !image || !desc) {
    return res.status(400).json({ error: 'Please provide title, image URL, and description.' });
  }

  try {
    const newService = new Service({ title, image, desc });
    const saved = await newService.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving service:', err.message);
    res.status(500).json({ error: 'Database error saving service' });
  }
});

// 6c. Update a Service
app.put('/api/services/:id', async (req, res) => {
  const { title, image, desc } = req.body;
  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      { title, image, desc },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Service not found.' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating service:', err.message);
    res.status(500).json({ error: 'Database error updating service' });
  }
});

// 6d. Delete a Service
app.delete('/api/services/:id', async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Service not found.' });
    }
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Error deleting service:', err.message);
    res.status(500).json({ error: 'Database error deleting service' });
  }
});

// 7. Gallery Images APIs

// 7a. Get All Gallery Images
app.get('/api/gallery', async (req, res) => {
  try {
    const images = await GalleryImage.find();
    res.json(images);
  } catch (err) {
    console.error('Error fetching gallery images:', err.message);
    res.status(500).json({ error: 'Database error fetching gallery images' });
  }
});

// 7b. Post a Gallery Image
app.post('/api/gallery', async (req, res) => {
  const { url, category, caption } = req.body;

  if (!url || !category || !caption) {
    return res.status(400).json({ error: 'Please provide url, category, and caption.' });
  }

  try {
    const newImage = new GalleryImage({ url, category, caption });
    const saved = await newImage.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving gallery image:', err.message);
    res.status(500).json({ error: 'Database error saving gallery image' });
  }
});

// 7c. Update a Gallery Image
app.put('/api/gallery/:id', async (req, res) => {
  const { url, category, caption } = req.body;
  try {
    const updated = await GalleryImage.findByIdAndUpdate(
      req.params.id,
      { url, category, caption },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Gallery image not found.' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating gallery image:', err.message);
    res.status(500).json({ error: 'Database error updating gallery image' });
  }
});

// 7d. Delete a Gallery Image
app.delete('/api/gallery/:id', async (req, res) => {
  try {
    const deleted = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Gallery image not found.' });
    }
    res.json({ success: true, message: 'Gallery image deleted successfully' });
  } catch (err) {
    console.error('Error deleting gallery image:', err.message);
    res.status(500).json({ error: 'Database error deleting gallery image' });
  }
});

// 7e. Get All Gallery Categories
app.get('/api/gallery-categories', async (req, res) => {
  try {
    const categories = await GalleryCategory.find();
    res.json(categories);
  } catch (err) {
    console.error('Error fetching gallery categories:', err.message);
    res.status(500).json({ error: 'Database error fetching gallery categories' });
  }
});

// 7f. Post a Gallery Category
app.post('/api/gallery-categories', async (req, res) => {
  const { categoryId, name } = req.body;

  if (!categoryId || !name) {
    return res.status(400).json({ error: 'Please provide categoryId and name.' });
  }

  const normalizedId = categoryId.toLowerCase().replace(/[^a-z0-9-]/g, '');

  try {
    const existing = await GalleryCategory.findOne({ categoryId: normalizedId });
    if (existing) {
      return res.status(400).json({ error: 'Category ID already exists.' });
    }

    const newCategory = new GalleryCategory({ categoryId: normalizedId, name });
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving gallery category:', err.message);
    res.status(500).json({ error: 'Database error saving gallery category' });
  }
});

// 7g. Delete a Gallery Category
app.delete('/api/gallery-categories/:id', async (req, res) => {
  try {
    const deleted = await GalleryCategory.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Gallery category not found.' });
    }
    res.json({ success: true, message: 'Gallery category deleted successfully' });
  } catch (err) {
    console.error('Error deleting gallery category:', err.message);
    res.status(500).json({ error: 'Database error deleting gallery category' });
  }
});

// --- TESTIMONIALS ENDPOINTS ---
app.get('/api/testimonials', async (req, res) => {
  try {
    const list = await Testimonial.find();
    res.json(list.map(t => ({
      id: t._id,
      quote: t.quote,
      parentName: t.parentName,
      parentRelation: t.parentRelation
    })));
  } catch (err) {
    console.error('Error fetching testimonials:', err.message);
    res.status(500).json({ error: 'Database error fetching testimonials' });
  }
});

app.post('/api/testimonials', async (req, res) => {
  const { quote, parentName, parentRelation } = req.body;
  if (!quote || !parentName || !parentRelation) {
    return res.status(400).json({ error: 'Quote, parentName, and parentRelation are required.' });
  }
  try {
    const fresh = new Testimonial({ quote, parentName, parentRelation });
    const saved = await fresh.save();
    res.status(201).json({
      id: saved._id,
      quote: saved.quote,
      parentName: saved.parentName,
      parentRelation: saved.parentRelation
    });
  } catch (err) {
    console.error('Error creating testimonial:', err.message);
    res.status(500).json({ error: 'Database error creating testimonial' });
  }
});

app.put('/api/testimonials/:id', async (req, res) => {
  const { quote, parentName, parentRelation } = req.body;
  try {
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { quote, parentName, parentRelation },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Testimonial not found.' });
    }
    res.json({
      id: updated._id,
      quote: updated.quote,
      parentName: updated.parentName,
      parentRelation: updated.parentRelation
    });
  } catch (err) {
    console.error('Error updating testimonial:', err.message);
    res.status(500).json({ error: 'Database error updating testimonial' });
  }
});

app.delete('/api/testimonials/:id', async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Testimonial not found.' });
    }
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (err) {
    console.error('Error deleting testimonial:', err.message);
    res.status(500).json({ error: 'Database error deleting testimonial' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
