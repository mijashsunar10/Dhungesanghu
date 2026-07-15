import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './database.js'; // Imports connection & seeds database
import { Notice, CalendarEvent, ContactMessage, Admin } from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
