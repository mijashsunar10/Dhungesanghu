import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Notice, CalendarEvent, ContactMessage, Admin, Service, GalleryImage, GalleryCategory, Testimonial, PrincipalMessage, Alumni, Milestone, Rule, Program, AdmissionStep, Official, AdmissionFaq, TriviaQuestion, GameScore } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backupDir = path.join(__dirname, 'backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Function to generate a backup
export async function createBackup() {
  try {
    const data = {
      notices: await Notice.find(),
      calendarEvents: await CalendarEvent.find(),
      contactMessages: await ContactMessage.find(),
      admins: await Admin.find(),
      services: await Service.find(),
      galleryImages: await GalleryImage.find(),
      galleryCategories: await GalleryCategory.find(),
      testimonials: await Testimonial.find(),
      principalMessages: await PrincipalMessage.find(),
      alumni: await Alumni.find(),
      milestones: await Milestone.find(),
      rules: await Rule.find(),
      programs: await Program.find(),
      admissionSteps: await AdmissionStep.find(),
      officials: await Official.find(),
      admissionFaqs: await AdmissionFaq.find(),
      triviaQuestions: await TriviaQuestion.find(),
      gameScores: await GameScore.find(),
      backupTime: new Date().toISOString()
    };

    const fileName = `backup-${Date.now()}.json`;
    const filePath = path.join(backupDir, fileName);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Backup created successfully: ${fileName}`);

    // Clean up old backups (keep last 7)
    cleanupOldBackups();

    return { success: true, fileName };
  } catch (err) {
    console.error('Failed to create backup:', err);
    throw err;
  }
}

// Keep only the last 7 backups
function cleanupOldBackups() {
  try {
    const files = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('backup-') && file.endsWith('.json'))
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(backupDir, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time); // newest first

    if (files.length > 7) {
      const toDelete = files.slice(7);
      toDelete.forEach(file => {
        fs.unlinkSync(path.join(backupDir, file.name));
        console.log(`Cleaned up old backup: ${file.name}`);
      });
    }
  } catch (err) {
    console.error('Failed to cleanup old backups:', err);
  }
}

// List all available backups
export function getBackupsList() {
  try {
    return fs.readdirSync(backupDir)
      .filter(file => file.startsWith('backup-') && file.endsWith('.json'))
      .map(file => {
        const stats = fs.statSync(path.join(backupDir, file));
        return {
          filename: file,
          size: stats.size,
          createdAt: stats.mtime
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // newest first
  } catch (err) {
    console.error('Failed to read backups directory:', err);
    return [];
  }
}

// Restore database from a backup file
export async function restoreBackup(fileName) {
  try {
    const filePath = path.join(backupDir, fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error('Backup file does not exist.');
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Restore collections (clear old and insert new)
    const restoreCollection = async (model, list) => {
      if (list && Array.isArray(list)) {
        await model.deleteMany({});
        if (list.length > 0) {
          await model.insertMany(list);
        }
      }
    };

    await restoreCollection(Notice, data.notices);
    await restoreCollection(CalendarEvent, data.calendarEvents);
    await restoreCollection(ContactMessage, data.contactMessages);
    await restoreCollection(Admin, data.admins);
    await restoreCollection(Service, data.services);
    await restoreCollection(GalleryImage, data.galleryImages);
    await restoreCollection(GalleryCategory, data.galleryCategories);
    await restoreCollection(Testimonial, data.testimonials);
    await restoreCollection(PrincipalMessage, data.principalMessages);
    await restoreCollection(Alumni, data.alumni);
    await restoreCollection(Milestone, data.milestones);
    await restoreCollection(Rule, data.rules);
    await restoreCollection(Program, data.programs);
    await restoreCollection(AdmissionStep, data.admissionSteps);
    await restoreCollection(Official, data.officials);
    await restoreCollection(AdmissionFaq, data.admissionFaqs);
    await restoreCollection(TriviaQuestion, data.triviaQuestions);
    await restoreCollection(GameScore, data.gameScores);

    console.log(`Database restored successfully from backup: ${fileName}`);
    return { success: true };
  } catch (err) {
    console.error('Failed to restore backup:', err);
    throw err;
  }
}

// Start daily backup schedule (runs every 24 hours)
export function startDailyBackupSchedule() {
  const ONE_DAY = 24 * 60 * 60 * 1000;
  setInterval(async () => {
    console.log('Running scheduled daily database backup...');
    try {
      await createBackup();
    } catch (err) {
      console.error('Scheduled backup failed:', err);
    }
  }, ONE_DAY);

  // Trigger one backup on startup to ensure we have a snapshot immediately
  setTimeout(async () => {
    try {
      await createBackup();
    } catch (err) {
      console.error('Initial backup failed:', err);
    }
  }, 5000);
}
