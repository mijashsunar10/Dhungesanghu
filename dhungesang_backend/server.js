import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { 
  startDailyBackupSchedule, 
  getBackupsList, 
  createBackup, 
  restoreBackup 
} from './backupService.js';
import './database.js'; // Imports connection & seeds database
import { sendContactAlertEmail } from './emailService.js';
import { Notice, CalendarEvent, ContactMessage, Admin, Service, GalleryImage, GalleryCategory, Testimonial, PrincipalMessage, Alumni, Milestone, Rule, Program, AdmissionStep, Official, AdmissionFaq, TriviaQuestion, GameScore } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Authentication Middleware to protect write endpoints and contact inbox
app.use((req, res, next) => {
  const method = req.method;
  const path = req.path;

  // Skip auth for admin login
  if (path === '/api/admin/login') {
    return next();
  }
  // Skip auth for public contact submissions
  if (path === '/api/contact' && method === 'POST') {
    return next();
  }
  // Skip auth for public game score submissions
  if (path === '/api/game-scores' && method === 'POST') {
    return next();
  }

  // Protect contact messages read/delete, any write/delete operations, and backup operations
  const isContactMessages = path.startsWith('/api/contact-messages');
  const isAdminBackupPath = path.startsWith('/api/admin/backups');
  const isWriteOperation = ['POST', 'PUT', 'DELETE'].includes(method);

  if (isContactMessages || isAdminBackupPath || isWriteOperation) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header is missing.' });
    }

    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.split(' ')[1] 
      : authHeader;

    if (!token) {
      return res.status(401).json({ error: 'Token is missing.' });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'dhungesanghu_school_super_secret_key_2026'
      );
      req.admin = decoded;
      return next();
    } catch (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
  }

  next();
});

// Routes

// --- ADMIN LOGIN ---
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Verify using bcrypt
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, admin.password);
    } catch (err) {
      isMatch = false;
    }

    // Fallback: check plain text if it hasn't been hashed yet (self-healing migration)
    if (!isMatch && admin.password === password) {
      isMatch = true;
      try {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);
        await admin.save();
        console.log(`Self-healed: migrated admin user '${username}' to hashed password format.`);
      } catch (saveErr) {
        console.error('Failed to hash & migrate admin password:', saveErr);
      }
    }

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Generate secure JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'dhungesanghu_school_super_secret_key_2026',
      { expiresIn: '7d' }
    );

    res.json({ 
      success: true, 
      token, 
      username: admin.username 
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server login error' });
  }
});

// --- IMAGE UPLOAD CONFIG & ROUTE ---
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

// Route to handle image uploads
app.post('/api/upload', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Please select an image file to upload.' });
    }

    const baseUrl = `${req.protocol}://${req.hostname === 'localhost' ? 'localhost:5000' : req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    res.json({
      success: true,
      url: fileUrl,
      filename: req.file.filename
    });
  });
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
    
    // Trigger background email alert notification to admin
    sendContactAlertEmail({ name, email, subject, message }).catch(err => {
      console.error('Failed sending background contact alert email:', err.message);
    });

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

// --- PRINCIPAL MESSAGE ENDPOINTS ---
app.get('/api/principal-message', async (req, res) => {
  try {
    let msg = await PrincipalMessage.findOne();
    if (!msg) {
      // Return a default empty structure or seed it here
      msg = await PrincipalMessage.create({
        name: "Mr. Bishnu G.C.",
        title: "Principal",
        image: "https://dhungesanghuschool.edu.np/wp-content/uploads/2026/02/BishnuGcPrincipal.jpeg",
        qualifications: "M.Ed. in Educational Leadership",
        experience: "18+ Years Academic Service",
        email: "bishnugc@dhungesanghu.edu.np",
        quote: "Education is not the learning of facts, but the training of the mind to think.",
        quoteAuthor: "Albert Einstein",
        messageIntro: "Dear Parents, Children and Well-Wishers,",
        message: "A warm greeting from the Principal! It is an honor and privilege to lead an institution where everyone is a learner and each day brings new opportunities to grow and discover.\n\nAt Dhungesanghu Boarding School, we believe education is more than academics. It is about character building, discipline, creativity, and preparing students to face the future with confidence. Our primary focus is to identify the unique talents of each individual and guide them on their path to personal excellence.\n\nWe believe in partnering with parents, administrators, and the local community to create a safe, stimulating, and academically rigorous environment. We teach our students to practice discipline, show respect to seniors, and act with integrity at all times.\n\nWe are constantly updating our curriculum, labs, and teaching methodologies to align with modern international standards while retaining our core values. We encourage collaborative learning and practical problem-solving in all grade levels.\n\nThank you for trusting Dhungesanghu Boarding School with your child's educational journey. Together, let us cultivate a generation of innovators, thinkers, and builders.",
        closure: "Warm regards,",
        signature: "Bishnu G.C.",
        signatureTitle: "Mr. Bishnu G.C., Principal",
        signatureSchool: "Dhungesanghu Boarding School",
        coreTenets: "Nurturing unique potentials of every child\nFostering empathy, respect, and discipline\nConstant curriculum updates to global levels"
      });
    }
    res.json({
      id: msg._id,
      name: msg.name,
      title: msg.title,
      image: msg.image,
      qualifications: msg.qualifications,
      experience: msg.experience,
      email: msg.email,
      quote: msg.quote,
      quoteAuthor: msg.quoteAuthor,
      messageIntro: msg.messageIntro,
      message: msg.message,
      closure: msg.closure,
      signature: msg.signature,
      signatureTitle: msg.signatureTitle,
      signatureSchool: msg.signatureSchool,
      coreTenets: msg.coreTenets
    });
  } catch (err) {
    console.error('Error fetching principal message:', err.message);
    res.status(500).json({ error: 'Database error fetching principal message' });
  }
});

app.put('/api/principal-message', async (req, res) => {
  const { 
    name, title, image, qualifications, experience, email, 
    quote, quoteAuthor, messageIntro, message, 
    closure, signature, signatureTitle, signatureSchool, coreTenets 
  } = req.body;

  try {
    let msg = await PrincipalMessage.findOne();
    if (!msg) {
      msg = new PrincipalMessage({
        name, title, image, qualifications, experience, email, 
        quote, quoteAuthor, messageIntro, message, 
        closure, signature, signatureTitle, signatureSchool, coreTenets
      });
    } else {
      if (name !== undefined) msg.name = name;
      if (title !== undefined) msg.title = title;
      if (image !== undefined) msg.image = image;
      if (qualifications !== undefined) msg.qualifications = qualifications;
      if (experience !== undefined) msg.experience = experience;
      if (email !== undefined) msg.email = email;
      if (quote !== undefined) msg.quote = quote;
      if (quoteAuthor !== undefined) msg.quoteAuthor = quoteAuthor;
      if (messageIntro !== undefined) msg.messageIntro = messageIntro;
      if (message !== undefined) msg.message = message;
      if (closure !== undefined) msg.closure = closure;
      if (signature !== undefined) msg.signature = signature;
      if (signatureTitle !== undefined) msg.signatureTitle = signatureTitle;
      if (signatureSchool !== undefined) msg.signatureSchool = signatureSchool;
      if (coreTenets !== undefined) msg.coreTenets = coreTenets;
    }
    const saved = await msg.save();
    res.json({
      id: saved._id,
      name: saved.name,
      title: saved.title,
      image: saved.image,
      qualifications: saved.qualifications,
      experience: saved.experience,
      email: saved.email,
      quote: saved.quote,
      quoteAuthor: saved.quoteAuthor,
      messageIntro: saved.messageIntro,
      message: saved.message,
      closure: saved.closure,
      signature: saved.signature,
      signatureTitle: saved.signatureTitle,
      signatureSchool: saved.signatureSchool,
      coreTenets: saved.coreTenets
    });
  } catch (err) {
    console.error('Error updating principal message:', err.message);
    res.status(500).json({ error: 'Database error updating principal message' });
  }
});

// --- ALUMNI SUCCESS NETWORK ENDPOINTS ---
app.get('/api/alumni', async (req, res) => {
  try {
    const list = await Alumni.find().sort({ batch: -1 });
    res.json(list.map(item => ({
      id: item._id,
      name: item.name,
      batch: item.batch,
      profession: item.profession,
      quote: item.quote,
      affiliation: item.affiliation,
      path: item.path,
      image: item.image
    })));
  } catch (err) {
    console.error('Error fetching alumni:', err.message);
    res.status(500).json({ error: 'Database error fetching alumni' });
  }
});

app.post('/api/alumni', async (req, res) => {
  const { name, batch, profession, quote, affiliation, path, image } = req.body;
  if (!name || !batch || !profession || !quote || !affiliation || !path) {
    return res.status(400).json({ error: 'All fields (name, batch, profession, quote, affiliation, path) are required.' });
  }
  try {
    const fresh = new Alumni({
      name,
      batch,
      profession,
      quote,
      affiliation,
      path,
      image: image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200'
    });
    const saved = await fresh.save();
    res.status(201).json({
      id: saved._id,
      name: saved.name,
      batch: saved.batch,
      profession: saved.profession,
      quote: saved.quote,
      affiliation: saved.affiliation,
      path: saved.path,
      image: saved.image
    });
  } catch (err) {
    console.error('Error creating alumni:', err.message);
    res.status(500).json({ error: 'Database error creating alumni' });
  }
});

app.put('/api/alumni/:id', async (req, res) => {
  const { name, batch, profession, quote, affiliation, path, image } = req.body;
  try {
    const updated = await Alumni.findByIdAndUpdate(
      req.params.id,
      { name, batch, profession, quote, affiliation, path, image },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Alumni not found.' });
    }
    res.json({
      id: updated._id,
      name: updated.name,
      batch: updated.batch,
      profession: updated.profession,
      quote: updated.quote,
      affiliation: updated.affiliation,
      path: updated.path,
      image: updated.image
    });
  } catch (err) {
    console.error('Error updating alumni:', err.message);
    res.status(500).json({ error: 'Database error updating alumni' });
  }
});

app.delete('/api/alumni/:id', async (req, res) => {
  try {
    const deleted = await Alumni.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Alumni not found.' });
    }
    res.json({ success: true, message: 'Alumni deleted successfully' });
  } catch (err) {
    console.error('Error deleting alumni:', err.message);
    res.status(500).json({ error: 'Database error deleting alumni' });
  }
});

// --- MILESTONES TIMELINE ENDPOINTS ---
app.get('/api/milestones', async (req, res) => {
  try {
    const list = await Milestone.find().sort({ year: 1 });
    res.json(list.map(item => ({
      id: item._id,
      year: item.year,
      title: item.title,
      desc: item.desc
    })));
  } catch (err) {
    console.error('Error fetching milestones:', err.message);
    res.status(500).json({ error: 'Database error fetching milestones' });
  }
});

app.post('/api/milestones', async (req, res) => {
  const { year, title, desc } = req.body;
  if (!year || !title || !desc) {
    return res.status(400).json({ error: 'All fields (year, title, desc) are required.' });
  }
  try {
    const fresh = new Milestone({ year, title, desc });
    const saved = await fresh.save();
    res.status(201).json({
      id: saved._id,
      year: saved.year,
      title: saved.title,
      desc: saved.desc
    });
  } catch (err) {
    console.error('Error creating milestone:', err.message);
    res.status(500).json({ error: 'Database error creating milestone' });
  }
});

app.put('/api/milestones/:id', async (req, res) => {
  const { year, title, desc } = req.body;
  try {
    const updated = await Milestone.findByIdAndUpdate(
      req.params.id,
      { year, title, desc },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Milestone not found.' });
    }
    res.json({
      id: updated._id,
      year: updated.year,
      title: updated.title,
      desc: updated.desc
    });
  } catch (err) {
    console.error('Error updating milestone:', err.message);
    res.status(500).json({ error: 'Database error updating milestone' });
  }
});

app.delete('/api/milestones/:id', async (req, res) => {
  try {
    const deleted = await Milestone.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Milestone not found.' });
    }
    res.json({ success: true, message: 'Milestone deleted successfully' });
  } catch (err) {
    console.error('Error deleting milestone:', err.message);
    res.status(500).json({ error: 'Database error deleting milestone' });
  }
});

// --- RULES & POLICIES ENDPOINTS ---
app.get('/api/rules', async (req, res) => {
  try {
    const list = await Rule.find().sort({ order: 1 });
    res.json(list.map(item => ({
      id: item._id,
      text: item.text,
      order: item.order
    })));
  } catch (err) {
    console.error('Error fetching rules:', err.message);
    res.status(500).json({ error: 'Database error fetching rules' });
  }
});

app.post('/api/rules', async (req, res) => {
  const { text, order } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Rule text is required.' });
  }
  try {
    let ruleOrder = order;
    if (ruleOrder === undefined) {
      const maxRule = await Rule.findOne().sort({ order: -1 });
      ruleOrder = maxRule ? maxRule.order + 1 : 1;
    }
    const fresh = new Rule({ text, order: ruleOrder });
    const saved = await fresh.save();
    res.status(201).json({
      id: saved._id,
      text: saved.text,
      order: saved.order
    });
  } catch (err) {
    console.error('Error creating rule:', err.message);
    res.status(500).json({ error: 'Database error creating rule' });
  }
});

app.put('/api/rules/:id', async (req, res) => {
  const { text, order } = req.body;
  try {
    const updated = await Rule.findByIdAndUpdate(
      req.params.id,
      { text, order },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Rule not found.' });
    }
    res.json({
      id: updated._id,
      text: updated.text,
      order: updated.order
    });
  } catch (err) {
    console.error('Error updating rule:', err.message);
    res.status(500).json({ error: 'Database error updating rule' });
  }
});

app.delete('/api/rules/:id', async (req, res) => {
  try {
    const deleted = await Rule.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Rule not found.' });
    }
    res.json({ success: true, message: 'Rule deleted successfully' });
  } catch (err) {
    console.error('Error deleting rule:', err.message);
    res.status(500).json({ error: 'Database error deleting rule' });
  }
});

// --- ACADEMIC PROGRAMS ENDPOINTS ---
app.get('/api/programs', async (req, res) => {
  try {
    const list = await Program.find().sort({ order: 1 });
    res.json(list.map(item => ({
      id: item._id,
      programId: item.programId,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      ageGroup: item.ageGroup,
      highlights: item.highlights,
      subjects: item.subjects,
      icon: item.icon,
      order: item.order
    })));
  } catch (err) {
    console.error('Error fetching academic programs:', err.message);
    res.status(500).json({ error: 'Database error fetching academic programs' });
  }
});

app.post('/api/programs', async (req, res) => {
  const { programId, title, subtitle, description, ageGroup, highlights, subjects, icon, order } = req.body;
  if (!programId || !title || !subtitle || !description || !ageGroup) {
    return res.status(400).json({ error: 'Missing required program fields.' });
  }
  try {
    let progOrder = order;
    if (progOrder === undefined) {
      const maxProg = await Program.findOne().sort({ order: -1 });
      progOrder = maxProg ? maxProg.order + 1 : 1;
    }
    const fresh = new Program({
      programId,
      title,
      subtitle,
      description,
      ageGroup,
      highlights: highlights || [],
      subjects: subjects || [],
      icon: icon || 'BookOpen',
      order: progOrder
    });
    const saved = await fresh.save();
    res.status(201).json({
      id: saved._id,
      programId: saved.programId,
      title: saved.title,
      subtitle: saved.subtitle,
      description: saved.description,
      ageGroup: saved.ageGroup,
      highlights: saved.highlights,
      subjects: saved.subjects,
      icon: saved.icon,
      order: saved.order
    });
  } catch (err) {
    console.error('Error creating program:', err.message);
    res.status(500).json({ error: 'Database error creating program' });
  }
});

app.put('/api/programs/:id', async (req, res) => {
  const { programId, title, subtitle, description, ageGroup, highlights, subjects, icon, order } = req.body;
  try {
    const updated = await Program.findByIdAndUpdate(
      req.params.id,
      { programId, title, subtitle, description, ageGroup, highlights, subjects, icon, order },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Program not found.' });
    }
    res.json({
      id: updated._id,
      programId: updated.programId,
      title: updated.title,
      subtitle: updated.subtitle,
      description: updated.description,
      ageGroup: updated.ageGroup,
      highlights: updated.highlights,
      subjects: updated.subjects,
      icon: updated.icon,
      order: updated.order
    });
  } catch (err) {
    console.error('Error updating program:', err.message);
    res.status(500).json({ error: 'Database error updating program' });
  }
});

app.delete('/api/programs/:id', async (req, res) => {
  try {
    const deleted = await Program.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Program not found.' });
    }
    res.json({ success: true, message: 'Program deleted successfully' });
  } catch (err) {
    console.error('Error deleting program:', err.message);
    res.status(500).json({ error: 'Database error deleting program' });
  }
});

// --- ADMISSION STEPS ENDPOINTS ---
app.get('/api/admission-steps', async (req, res) => {
  try {
    const list = await AdmissionStep.find().sort({ order: 1 });
    res.json(list.map(item => ({
      id: item._id,
      num: item.num,
      title: item.title,
      desc: item.desc,
      icon: item.icon,
      details: item.details,
      order: item.order
    })));
  } catch (err) {
    console.error('Error fetching admission steps:', err.message);
    res.status(500).json({ error: 'Database error fetching admission steps' });
  }
});

app.post('/api/admission-steps', async (req, res) => {
  const { num, title, desc, icon, details, order } = req.body;
  if (!num || !title || !desc) {
    return res.status(400).json({ error: 'Missing required admission step fields.' });
  }
  try {
    let stepOrder = order;
    if (stepOrder === undefined) {
      const maxStep = await AdmissionStep.findOne().sort({ order: -1 });
      stepOrder = maxStep ? maxStep.order + 1 : 1;
    }
    const fresh = new AdmissionStep({
      num,
      title,
      desc,
      icon: icon || 'ClipboardList',
      details: details || [],
      order: stepOrder
    });
    const saved = await fresh.save();
    res.status(201).json({
      id: saved._id,
      num: saved.num,
      title: saved.title,
      desc: saved.desc,
      icon: saved.icon,
      details: saved.details,
      order: saved.order
    });
  } catch (err) {
    console.error('Error creating admission step:', err.message);
    res.status(500).json({ error: 'Database error creating admission step' });
  }
});

app.put('/api/admission-steps/:id', async (req, res) => {
  const { num, title, desc, icon, details, order } = req.body;
  try {
    const updated = await AdmissionStep.findByIdAndUpdate(
      req.params.id,
      { num, title, desc, icon, details, order },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Admission step not found.' });
    }
    res.json({
      id: updated._id,
      num: updated.num,
      title: updated.title,
      desc: updated.desc,
      icon: updated.icon,
      details: updated.details,
      order: updated.order
    });
  } catch (err) {
    console.error('Error updating admission step:', err.message);
    res.status(500).json({ error: 'Database error updating admission step' });
  }
});

app.delete('/api/admission-steps/:id', async (req, res) => {
  try {
    const deleted = await AdmissionStep.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Admission step not found.' });
    }
    res.json({ success: true, message: 'Admission step deleted successfully' });
  } catch (err) {
    console.error('Error deleting admission step:', err.message);
    res.status(500).json({ error: 'Database error deleting admission step' });
  }
});

// --- SCHOOL OFFICIALS / TEAM MEMBERS ---
app.get('/api/officials', async (req, res) => {
  try {
    const list = await Official.find({}).sort({ order: 1 });
    res.json(list);
  } catch (err) {
    console.error('Error fetching officials:', err.message);
    res.status(500).json({ error: 'Database error fetching officials' });
  }
});

app.post('/api/officials', async (req, res) => {
  try {
    const { name, position, category, image, email, qualification, experience, order } = req.body;
    if (!name || !position || !category || !image || !email || !qualification || !experience) {
      return res.status(400).json({ error: 'All fields except order are required.' });
    }
    const categoryLabels = {
      leadership: 'Leadership',
      teachers: 'Teaching Faculty',
      admin: 'Administration'
    };
    const created = await Official.create({
      name,
      position,
      category,
      categoryLabel: categoryLabels[category] || 'Staff',
      image,
      email,
      qualification,
      experience,
      order: order || 0
    });
    res.status(201).json(created);
  } catch (err) {
    console.error('Error creating official:', err.message);
    res.status(500).json({ error: 'Database error creating official' });
  }
});

app.put('/api/officials/:id', async (req, res) => {
  try {
    const { name, position, category, image, email, qualification, experience, order } = req.body;
    const categoryLabels = {
      leadership: 'Leadership',
      teachers: 'Teaching Faculty',
      admin: 'Administration'
    };
    
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (position !== undefined) updateData.position = position;
    if (category !== undefined) {
      updateData.category = category;
      updateData.categoryLabel = categoryLabels[category] || 'Staff';
    }
    if (image !== undefined) updateData.image = image;
    if (email !== undefined) updateData.email = email;
    if (qualification !== undefined) updateData.qualification = qualification;
    if (experience !== undefined) updateData.experience = experience;
    if (order !== undefined) updateData.order = order;

    const updated = await Official.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Official not found.' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating official:', err.message);
    res.status(500).json({ error: 'Database error updating official' });
  }
});

app.delete('/api/officials/:id', async (req, res) => {
  try {
    const deleted = await Official.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Official not found.' });
    }
    res.json({ success: true, message: 'Official deleted successfully' });
  } catch (err) {
    console.error('Error deleting official:', err.message);
    res.status(500).json({ error: 'Database error deleting official' });
  }
});

// --- ADMISSION FAQS ENDPOINTS ---
app.get('/api/admission-faqs', async (req, res) => {
  try {
    const list = await AdmissionFaq.find().sort({ order: 1 });
    res.json(list.map(item => ({
      id: item._id,
      q: item.q,
      a: item.a,
      order: item.order
    })));
  } catch (err) {
    console.error('Error fetching admission FAQs:', err.message);
    res.status(500).json({ error: 'Database error fetching admission FAQs' });
  }
});

app.post('/api/admission-faqs', async (req, res) => {
  const { q, a, order } = req.body;
  if (!q || !a) {
    return res.status(400).json({ error: 'Question and answer are required.' });
  }
  try {
    let faqOrder = order;
    if (faqOrder === undefined) {
      const maxFaq = await AdmissionFaq.findOne().sort({ order: -1 });
      faqOrder = maxFaq ? maxFaq.order + 1 : 1;
    }
    const fresh = new AdmissionFaq({ q, a, order: faqOrder });
    const saved = await fresh.save();
    res.status(201).json({
      id: saved._id,
      q: saved.q,
      a: saved.a,
      order: saved.order
    });
  } catch (err) {
    console.error('Error creating admission FAQ:', err.message);
    res.status(500).json({ error: 'Database error creating admission FAQ' });
  }
});

app.put('/api/admission-faqs/:id', async (req, res) => {
  const { q, a, order } = req.body;
  try {
    const updated = await AdmissionFaq.findByIdAndUpdate(
      req.params.id,
      { q, a, order },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Admission FAQ not found.' });
    }
    res.json({
      id: updated._id,
      q: updated.q,
      a: updated.a,
      order: updated.order
    });
  } catch (err) {
    console.error('Error updating admission FAQ:', err.message);
    res.status(500).json({ error: 'Database error updating admission FAQ' });
  }
});

app.delete('/api/admission-faqs/:id', async (req, res) => {
  try {
    const deleted = await AdmissionFaq.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Admission FAQ not found.' });
    }
    res.json({ success: true, message: 'Admission FAQ deleted successfully' });
  } catch (err) {
    console.error('Error deleting admission FAQ:', err.message);
    res.status(500).json({ error: 'Database error deleting admission FAQ' });
  }
});

// --- TRIVIA QUESTIONS ENDPOINTS ---
app.get('/api/trivia-questions', async (req, res) => {
  try {
    const list = await TriviaQuestion.find().sort({ order: 1 });
    res.json(list.map(item => ({
      id: item._id,
      question: item.question,
      options: item.options,
      answer: item.answer,
      order: item.order
    })));
  } catch (err) {
    console.error('Error fetching trivia questions:', err.message);
    res.status(500).json({ error: 'Database error fetching trivia questions' });
  }
});

app.post('/api/trivia-questions', async (req, res) => {
  const { question, options, answer, order } = req.body;
  if (!question || !options || options.length === 0 || answer === undefined) {
    return res.status(400).json({ error: 'Question, options, and correct answer index are required.' });
  }
  try {
    let qOrder = order;
    if (qOrder === undefined) {
      const maxQ = await TriviaQuestion.findOne().sort({ order: -1 });
      qOrder = maxQ ? maxQ.order + 1 : 1;
    }
    const fresh = new TriviaQuestion({ question, options, answer, order: qOrder });
    const saved = await fresh.save();
    res.status(201).json({
      id: saved._id,
      question: saved.question,
      options: saved.options,
      answer: saved.answer,
      order: saved.order
    });
  } catch (err) {
    console.error('Error creating trivia question:', err.message);
    res.status(500).json({ error: 'Database error creating trivia question' });
  }
});

app.put('/api/trivia-questions/:id', async (req, res) => {
  const { question, options, answer, order } = req.body;
  try {
    const updated = await TriviaQuestion.findByIdAndUpdate(
      req.params.id,
      { question, options, answer, order },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Trivia question not found.' });
    }
    res.json({
      id: updated._id,
      question: updated.question,
      options: updated.options,
      answer: updated.answer,
      order: updated.order
    });
  } catch (err) {
    console.error('Error updating trivia question:', err.message);
    res.status(500).json({ error: 'Database error updating trivia question' });
  }
});

app.delete('/api/trivia-questions/:id', async (req, res) => {
  try {
    const deleted = await TriviaQuestion.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Trivia question not found.' });
    }
    res.json({ success: true, message: 'Trivia question deleted successfully' });
  } catch (err) {
    console.error('Error deleting trivia question:', err.message);
    res.status(500).json({ error: 'Database error deleting trivia question' });
  }
});


// --- GAME SCORE LEADERBOARD ROUTES ---
app.get('/api/game-scores', async (req, res) => {
  const { gameType } = req.query;
  try {
    const filter = gameType ? { gameType } : {};
    const scores = await GameScore.find(filter)
      .sort({ score: -1, playedAt: -1 })
      .limit(10);
    res.json(scores);
  } catch (err) {
    console.error('Error fetching game scores:', err.message);
    res.status(500).json({ error: 'Database error fetching game scores' });
  }
});

app.post('/api/game-scores', async (req, res) => {
  const { playerName, gameType, score, maxScore } = req.body;
  if (!playerName || !gameType || score === undefined || maxScore === undefined) {
    return res.status(400).json({ error: 'Missing required score fields: playerName, gameType, score, maxScore.' });
  }

  try {
    const newScore = new GameScore({ playerName, gameType, score, maxScore });
    await newScore.save();
    res.status(201).json({ success: true, score: newScore });
  } catch (err) {
    console.error('Error saving game score:', err.message);
    res.status(500).json({ error: 'Database error saving game score' });
  }
});


// --- BACKUP MANAGEMENT ROUTES ---
app.get('/api/admin/backups', (req, res) => {
  try {
    const list = getBackupsList();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve backups list.' });
  }
});

app.post('/api/admin/backups/create', async (req, res) => {
  try {
    const result = await createBackup();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create manual backup.' });
  }
});

app.post('/api/admin/backups/restore', async (req, res) => {
  const { filename } = req.body;
  if (!filename) {
    return res.status(400).json({ error: 'Filename is required for restoration.' });
  }

  if (!filename.startsWith('backup-') || !filename.endsWith('.json') || filename.includes('..')) {
    return res.status(400).json({ error: 'Invalid backup file requested.' });
  }

  try {
    const result = await restoreBackup(filename);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to restore database from backup.' });
  }
});

app.get('/api/admin/backups/download/:filename', (req, res) => {
  const { filename } = req.params;
  if (!filename.startsWith('backup-') || !filename.endsWith('.json') || filename.includes('..')) {
    return res.status(400).json({ error: 'Invalid backup file requested.' });
  }

  const filePath = path.join(__dirname, 'backups', filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Backup file not found.' });
  }

  res.download(filePath, filename);
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  startDailyBackupSchedule();
});
