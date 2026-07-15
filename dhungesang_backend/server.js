import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './database.js'; // Imports connection & seeds database
import { Notice, CalendarEvent, ContactMessage } from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// 1. Get Notices
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await Notice.find();
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

// 3. Get Calendar Events
app.get('/api/calendar', async (req, res) => {
  try {
    const events = await CalendarEvent.find();
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err.message);
    res.status(500).json({ error: 'Database error fetching calendar events' });
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

// 5. Get Contact Messages (For testing/verification)
app.get('/api/contact-messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err.message);
    res.status(500).json({ error: 'Database error fetching contact messages' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
