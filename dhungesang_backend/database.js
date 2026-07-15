import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI env variable is missing.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas.');
    seedDatabase();
  })
  .catch((err) => {
    console.error('MongoDB Atlas connection error:', err.message);
  });

// 1. Notice Schema & Model
const NoticeSchema = new mongoose.Schema({
  date: { type: String, required: true },
  month: { type: String, required: true },
  day: { type: String, required: true },
  category: { type: String, required: true },
  categoryLabel: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  fullContent: { type: String },
  author: { type: String }
});

export const Notice = mongoose.model('Notice', NoticeSchema);

// 2. Calendar Event Schema & Model
const CalendarEventSchema = new mongoose.Schema({
  monthName: { type: String, required: true },
  day: { type: Number, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

export const CalendarEvent = mongoose.model('CalendarEvent', CalendarEventSchema);

// 3. Contact Message Schema & Model
const ContactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const ContactMessage = mongoose.model('ContactMessage', ContactMessageSchema);

// Initial Seeding Logic
async function seedDatabase() {
  try {
    // Seed Notices
    const noticesCount = await Notice.countDocuments();
    if (noticesCount === 0) {
      const mockNotices = [
        {
          date: '2026-07-10',
          month: 'JUL',
          day: '10',
          category: 'exams',
          categoryLabel: 'Exams & Academics',
          title: 'First Term Examination Schedule Released',
          desc: 'The first term exam begins on Shrawan 15. Students can collect their admit cards from the account desk.',
          fullContent: 'This is to inform all students and parents that the First Terminal Examinations for the academic year 2083 (2026) will commence on Shrawan 15. Detailed subject-wise schedules have been posted on classroom bulletin boards and sent via school SMS. Admit cards are mandatory to enter the examination hall. Admit cards will be distributed from Shrawan 10 onwards, subject to fee clearance of the first term. Please contact the administrative department for any queries.',
          author: 'Examination Controller'
        },
        {
          date: '2026-06-25',
          month: 'JUN',
          day: '25',
          category: 'events',
          categoryLabel: 'Events & Holiday',
          title: 'Parent-Teacher Meeting (PTM) Notice',
          desc: 'PTM for Grades PG to 10 has been scheduled for Saturday, Ashad 20, from 11:00 AM onwards.',
          fullContent: 'Dear Parents and Guardians, you are cordially invited to the first Parent-Teacher Meeting (PTM) of this term scheduled for Saturday, Ashad 20. The meeting will run from 11:00 AM to 3:00 PM. Teachers will discuss student academics progress, behavioral observations, and creative achievements. We highly value your feedback and request your mandatory presence to review test performance sheets.',
          author: 'Academic Coordinator'
        },
        {
          date: '2026-06-15',
          month: 'JUN',
          day: '15',
          category: 'admin',
          categoryLabel: 'Administrative',
          title: 'Admission Notice: Re-openings for Grade 11',
          desc: 'A few scholarship seats are available for outstanding students in Science and Management streams.',
          fullContent: 'Dhungesanghu Boarding School announces open registration for the remaining few scholarship seats in Grade 11 (Science and Management Streams) for the session 2083/84. Deserving candidates with a minimum GPA of 3.2 in SEE are eligible to sit for the scholarship testing exam scheduled for Ashad 10. Forms can be collected from the administration office during working hours.',
          author: 'Admissions Desk'
        },
        {
          date: '2026-05-18',
          month: 'MAY',
          day: '18',
          category: 'events',
          categoryLabel: 'Events & Holiday',
          title: 'Inter-House Sports Meet Postponement',
          desc: 'Due to forecasted heavy rainfalls, the Inter-House Athletics meet has been postponed to Jestha 12.',
          fullContent: 'This is to notify all house captains, sports coaches, and students that the Annual Inter-House Athletics and Track meet originally scheduled for Jestha 5 has been postponed to Jestha 12 due to predictions of heavy rainfall. Routine classroom teachings will continue as normal on Jestha 5. Modified training schedules for participants will be active in morning shifts.',
          author: 'Sports Committee Head'
        }
      ];
      await Notice.insertMany(mockNotices);
      console.log('Seeded notices to MongoDB Atlas.');
    }

    // Seed Calendar Events
    const eventsCount = await CalendarEvent.countDocuments();
    if (eventsCount === 0) {
      const mockEvents = [
        { monthName: 'Baishakh', day: 1, type: 'holiday', title: "New Year's Day", description: "Bikram Sambat New Year 2083 celebration. School closed." },
        { monthName: 'Baishakh', day: 15, type: 'meeting', title: 'PTM & Report Cards', description: 'Parents-teacher meet to distribute previous final exam result reports.' },
        { monthName: 'Jestha', day: 10, type: 'activity', title: 'Inter-House Football', description: 'Football selection and league match series starts on school playground.' },
        { monthName: 'Jestha', day: 12, type: 'activity', title: 'Sports Meet Day 2', description: 'Athletics, high jump, and relay running races.' },
        { monthName: 'Jestha', day: 25, type: 'exam', title: 'First Unit Test Starts', description: 'Unit examinations for Grades 1 to 10. Test shifts run for 1 hour.' },
        { monthName: 'Ashad', day: 12, type: 'activity', title: 'Science Fair & Exhibition', description: 'Students from Grade 5 to 10 display customized working science models.' },
        { monthName: 'Ashad', day: 20, type: 'meeting', title: 'Parent-Teacher Meeting', description: 'Detailed review of academic performance and unit test evaluations.' },
        { monthName: 'Ashad', day: 29, type: 'holiday', title: 'Bhanu Jayanti Celebration', description: 'Poetry and cultural celebrations on the occasion of Bhanu Jayanti. Half day holiday.' },
        { monthName: 'Shrawan', day: 10, type: 'meeting', title: 'Admit Card Distribution', description: 'Distribution of First Term Examination admit cards at the account desk.' },
        { monthName: 'Shrawan', day: 15, type: 'exam', title: 'First Term Exam Starts', description: 'First Terminal examinations commence for PG to Grade 10.' },
        { monthName: 'Shrawan', day: 26, type: 'exam', title: 'Term Exam Ends', description: 'Conclusion of examinations. Routine regular classes resume.' },
        { monthName: 'Shrawan', day: 30, type: 'meeting', title: 'First Term Result Day', description: 'Parents review and card collection for the First Terminal Exam.' },
        { monthName: 'Bhadra', day: 8, type: 'holiday', title: 'Teej Festival Holiday', description: 'School remains closed on the occasion of Haritalika Teej.' },
        { monthName: 'Bhadra', day: 22, type: 'activity', title: 'Teachers Day Celebrations', description: 'Special student performance, songs, and cards honoring teachers.' },
        { monthName: 'Ashoj', day: 10, type: 'holiday', title: 'Dashain Vacation Begins', description: 'Festival holidays start for Dashain. School closed.' },
        { monthName: 'Ashoj', day: 28, type: 'holiday', title: 'School Re-opens', description: 'Re-opening of school after Dashain festival vacation. Standard timing.' }
      ];
      await CalendarEvent.insertMany(mockEvents);
      console.log('Seeded calendar events to MongoDB Atlas.');
    }
  } catch (err) {
    console.error('Error seeding MongoDB Atlas:', err.message);
  }
}
