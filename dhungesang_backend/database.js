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

// 4. Admin Schema & Model
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const Admin = mongoose.model('Admin', AdminSchema);

// 5. Service Schema & Model
const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  desc: { type: String, required: true }
});

export const Service = mongoose.model('Service', ServiceSchema);

// 6. Gallery Image Schema & Model
const GalleryImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  category: { type: String, required: true },
  caption: { type: String, required: true }
});

export const GalleryImage = mongoose.model('GalleryImage', GalleryImageSchema);

// 6b. Gallery Category Schema & Model
const GalleryCategorySchema = new mongoose.Schema({
  categoryId: { type: String, required: true, unique: true },
  name: { type: String, required: true }
});

export const GalleryCategory = mongoose.model('GalleryCategory', GalleryCategorySchema);

// 7. Testimonial Schema & Model
const TestimonialSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  parentName: { type: String, required: true },
  parentRelation: { type: String, required: true }
});

export const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

// 8. Principal Message Schema & Model
const PrincipalMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  qualifications: { type: String, required: true },
  experience: { type: String, required: true },
  email: { type: String, required: true },
  quote: { type: String, required: true },
  quoteAuthor: { type: String, required: true },
  messageIntro: { type: String, required: true },
  message: { type: String, required: true },
  closure: { type: String, required: true },
  signature: { type: String, required: true },
  signatureTitle: { type: String, required: true },
  signatureSchool: { type: String, required: true },
  coreTenets: { type: String, required: true }
});

export const PrincipalMessage = mongoose.model('PrincipalMessage', PrincipalMessageSchema);

// 9. Alumni Schema & Model
const AlumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  batch: { type: String, required: true },
  profession: { type: String, required: true },
  quote: { type: String, required: true },
  affiliation: { type: String, required: true },
  path: { type: String, required: true },
  image: { type: String, required: true }
});

export const Alumni = mongoose.model('Alumni', AlumniSchema);

// 10. Milestone Schema & Model
const MilestoneSchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true }
});

export const Milestone = mongoose.model('Milestone', MilestoneSchema);

// 11. Rule Schema & Model
const RuleSchema = new mongoose.Schema({
  text: { type: String, required: true },
  order: { type: Number, default: 0 }
});

export const Rule = mongoose.model('Rule', RuleSchema);

// 12. Program Schema & Model
const ProgramSchema = new mongoose.Schema({
  programId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  ageGroup: { type: String, required: true },
  highlights: [{ type: String }],
  subjects: [{ type: String }],
  icon: { type: String, default: 'BookOpen' }, // Sparkles, BookOpen, GraduationCap
  order: { type: Number, default: 0 }
});

export const Program = mongoose.model('Program', ProgramSchema);

// 13. Admission Step Schema & Model
const AdmissionStepSchema = new mongoose.Schema({
  num: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, default: 'ClipboardList' }, // ClipboardList, FileCheck, FileSpreadsheet, Compass
  details: [{ type: String }],
  order: { type: Number, default: 0 }
});

export const AdmissionStep = mongoose.model('AdmissionStep', AdmissionStepSchema);

// 14. Official Schema & Model
const OfficialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  category: { type: String, enum: ['leadership', 'teachers', 'admin'], required: true },
  categoryLabel: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: String, required: true },
  order: { type: Number, default: 0 }
});

export const Official = mongoose.model('Official', OfficialSchema);

// 15. Admission FAQ Schema & Model
const AdmissionFaqSchema = new mongoose.Schema({
  q: { type: String, required: true },
  a: { type: String, required: true },
  order: { type: Number, default: 0 }
});

export const AdmissionFaq = mongoose.model('AdmissionFaq', AdmissionFaqSchema);








// Initial Seeding Logic
async function seedDatabase() {
  try {
    // Seed Principal Message
    const principalMessageCount = await PrincipalMessage.countDocuments();
    if (principalMessageCount === 0) {
      await PrincipalMessage.create({
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
      console.log('Seeded default principal message to MongoDB.');
    }

    // Seed Admin Accounts
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({
        username: 'admin',
        password: 'admin123'
      });
      console.log('Seeded default admin account to MongoDB.');
    }

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

    // Seed Services
    const servicesCount = await Service.countDocuments();
    if (servicesCount === 0) {
      const mockServices = [
        {
          title: 'Modern Science Laboratory',
          image: 'https://images.unsplash.com/photo-1562774053-4ab90860b94c?q=80&w=400',
          desc: 'Fully equipped Physics, Chemistry, and Biology labs to support hands-on experimentations.'
        },
        {
          title: 'Computer Lab with High-Speed Internet',
          image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400',
          desc: 'Modern computer systems loaded with modern educational software and guided programming courses.'
        },
        {
          title: 'Rich School Library',
          image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=400',
          desc: 'A vast collection of reference manuals, literature, newspapers, and quiet research chambers.'
        },
        {
          title: 'Creative Art & Music Room',
          image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=400',
          desc: 'Encouraging musical skills and imaginative drawings with direct mentorship and high-quality instruments.'
        },
        {
          title: 'Hygienic Cafeteria',
          image: 'https://images.unsplash.com/photo-1576972405668-2d020a01cbfa?q=80&w=400',
          desc: 'Nutritious, fresh, and organic meal plans prepared under certified hygiene regulations.'
        },
        {
          title: 'Secure Transport',
          image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=400',
          desc: 'A dedicated fleet of school buses covering all major transport routes in the Pokhara region.'
        }
      ];
      await Service.insertMany(mockServices);
      console.log('Seeded default school services to MongoDB Atlas.');
    }

    // Seed Gallery Images
    const galleryCount = await GalleryImage.countDocuments();
    if (galleryCount === 0) {
      const mockGallery = [
        {
          url: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/01/dbs6.jpg',
          category: 'activities',
          caption: 'Student Presentation & Group Activities'
        },
        {
          url: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/726495301_27214325098227711_5095630771598862657_n.jpeg',
          category: 'classroom',
          caption: 'Modern Classroom Fun and Engaged Learnings'
        },
        {
          url: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/724005185_1657741765516585_8558043736622738972_n.jpeg',
          category: 'classroom',
          caption: 'Dedicated Science Experiments and Study Time'
        },
        {
          url: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/721951060_2878261705852991_6275585639119925637_n.jpeg',
          category: 'activities',
          caption: 'Creative Indoor Drawing & Arts Craft Play'
        },
        {
          url: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/711814583_1619901360136900_4141375761681313767_n.jpg',
          category: 'activities',
          caption: 'Outdoor Playground and Collaborative Team Exercises'
        },
        {
          url: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/709708868_1615055323954837_6000510963209356473_n.jpg',
          category: 'events',
          caption: 'Annual Cultural Festival and Happy Performances'
        },
        {
          url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600',
          category: 'classroom',
          caption: 'Junior Chemistry & Biology Science Lab Experiments'
        },
        {
          url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600',
          category: 'classroom',
          caption: 'Primary Level Language Studies Classroom Deskwork'
        },
        {
          url: 'https://images.unsplash.com/photo-1577896851231-70ee18881754?q=80&w=600',
          category: 'events',
          caption: 'Annual Track & Field Sports Meet Running Events'
        },
        {
          url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600',
          category: 'activities',
          caption: 'Advanced Information Technology and Keyboard Skills'
        },
        {
          url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600',
          category: 'classroom',
          caption: 'Hobby Book Reading in Quiet Campus Study Library'
        },
        {
          url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600',
          category: 'events',
          caption: 'Pre-Primary Kindergarten Play Ground and Toys Activity'
        }
      ];
      await GalleryImage.insertMany(mockGallery);
      console.log('Seeded default gallery images to MongoDB Atlas.');
    }

    // Seed Gallery Categories
    const categoryCount = await GalleryCategory.countDocuments();
    if (categoryCount === 0) {
      const mockCategories = [
        { categoryId: 'classroom', name: 'Classroom & Study' },
        { categoryId: 'activities', name: 'Student Activities' },
        { categoryId: 'events', name: 'Events & Sports' }
      ];
      await GalleryCategory.insertMany(mockCategories);
      console.log('Seeded default gallery categories to MongoDB Atlas.');
    }
    // Seed Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      const mockTestimonials = [
        {
          quote: "Dhungesanghu has provided a fantastic environment for my son. The teachers are very attentive, and the focus on moral values and discipline has helped him grow into a responsible student.",
          parentName: "Kiran Parajuli",
          parentRelation: "Parent of Grade 8 Student"
        },
        {
          quote: "We are highly impressed with the digital communication system. We receive homework, bulletins, and exams updates on the school app. The educational quality is excellent.",
          parentName: "Sita Gurung",
          parentRelation: "Parent of Grade 3 Student"
        },
        {
          quote: "The sports and extracurricular activities are wonderful. My daughter participates in debate and drawing classes, which has boosted her self-confidence immensely.",
          parentName: "Ramesh Baral",
          parentRelation: "Parent of Grade 10 Student"
        }
      ];
      await Testimonial.insertMany(mockTestimonials);
      console.log('Seeded default parent testimonials to MongoDB Atlas.');
    }

    // Seed Alumni
    const alumniCount = await Alumni.countDocuments();
    if (alumniCount === 0) {
      const mockAlumni = [
        {
          name: "Dr. Sandesh Rijal",
          batch: "2012",
          profession: "Medical Doctor / Resident",
          quote: "The solid academic foundation and the regular science lab experiments at Dhungesanghu gave me the interest and drive to pursue medical school. I am forever grateful to my teachers.",
          affiliation: "Tribhuvan University Teaching Hospital, Kathmandu",
          path: "SEE (Dhungesanghu) -> +2 Science -> MBBS (IOM)",
          image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400"
        },
        {
          name: "Er. Sneha Baral",
          batch: "2014",
          profession: "Software Engineer",
          quote: "Dhungesanghu's early coding classes and computer lab assignments were where my tech journey began. The school helped build my self-belief and logic.",
          affiliation: "F1Soft Technologies, Lalitpur",
          path: "SEE (Dhungesanghu) -> +2 Computer Science -> B.E. in Software Engineering",
          image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400"
        },
        {
          name: "Abhishek Thapa",
          batch: "2016",
          profession: "Chartered Accountant (CA)",
          quote: "The mathematical training and analytical tests at school trained my brain for speed and logic. It made clearing my professional CA papers much easier.",
          affiliation: "Deloitte Nepal, Kathmandu",
          path: "SEE (Dhungesanghu) -> +2 Commerce -> Chartered Accountancy (ICAN)",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400"
        }
      ];
      await Alumni.insertMany(mockAlumni);
      console.log('Seeded default alumni to MongoDB.');
    }

    // Seed Milestones
    const milestoneCount = await Milestone.countDocuments();
    if (milestoneCount === 0) {
      const mockMilestones = [
        {
          year: "2006",
          title: "Foundation of School",
          desc: "Dhungesanghu Boarding School was established in Pokhara-17, Mahatgaunda, with primary classes and a commitment to excellence."
        },
        {
          year: "2012",
          title: "Secondary Upgrade & Labs",
          desc: "Expanded classrooms to include secondary grades up to SEE and opened custom-designed physics, chemistry, and biology labs."
        },
        {
          year: "2018",
          title: "100% SEE Passing Rate",
          desc: "Achieved the milestone of 100% passing rates in SEE with multiple students obtaining distinction ranks."
        },
        {
          year: "2022",
          title: "Veda Digital Integration",
          desc: "Partnered with Veda to launch the school smartphone apps for real-time exams, bulletins, and digital homework updates."
        }
      ];
      await Milestone.insertMany(mockMilestones);
      console.log('Seeded default milestones to MongoDB.');
    }

    // Seed Rules & Policies
    const ruleCount = await Rule.countDocuments();
    if (ruleCount === 0) {
      const mockRules = [
        { text: "Students must wear the proper school uniform neatly and tidily and enter the school premises only between 9:30 A.M. and 9:55 A.M.", order: 1 },
        { text: "Students must make every attempt to keep their classroom neat and tidy and free from litter.", order: 2 },
        { text: "Students must use English as means of communication within the school premises.", order: 3 },
        { text: "\"Please\", \"Thank you\", \"Excuse me\", \"Sorry\" should be part of every student's vocabulary and used at appropriate times.", order: 4 },
        { text: "Abusive or fool language and disrespect behavior to anyone will not be tolerated at any time under any circumstances.", order: 5 },
        { text: "Regular attendance is mandatory. Any absence must be supported by a leave application signed by parents or guardians.", order: 6 },
        { text: "Students must respect school property. Damaging desks, walls, books, or laboratory equipment is strictly prohibited and subject to fines.", order: 7 },
        { text: "Mobile phones, smartwatches, and other personal electronic gadgets are strictly prohibited inside the school premises.", order: 8 },
        { text: "Assignments, homework, and projects must be completed and submitted on time as directed by the subject teachers.", order: 9 },
        { text: "During exams, academic integrity is paramount. Any form of cheating, copying, or malpractice will result in immediate suspension.", order: 10 }
      ];
      await Rule.insertMany(mockRules);
      console.log('Seeded default rules & regulations to MongoDB.');
    }

    // Seed Academic Programs
    const programCount = await Program.countDocuments();
    if (programCount === 0) {
      const mockPrograms = [
        {
          programId: 'pre-primary',
          title: 'Pre-Primary Level',
          subtitle: 'Play Group (PG) to Upper Kindergarten (UKG)',
          description: 'Our Pre-Primary program focuses on sensory learning, motor skills development, basic language skills, and foundational numeracy. We utilize interactive play-way methods, storytellings, and audio-visual sessions in a colorful, child-friendly environment to spark early curiosity.',
          ageGroup: '2.5 to 5 Years',
          highlights: [
            'Sensory-based learning materials',
            'Montessori activity room exercises',
            'Audio-Visual storytelling & music classes',
            'Focus on motor skills and social communication',
            'Caring, highly-trained female faculties'
          ],
          subjects: ['English Alphabets', 'Nepali Letters', 'Numeracy & Basic Maths', 'Drawing & Crafting', 'General Awareness', 'Good Habits & Manners'],
          icon: 'Sparkles',
          order: 1
        },
        {
          programId: 'primary',
          title: 'Primary Level',
          subtitle: 'Grade 1 to Grade 5',
          description: 'The primary years focus on building critical foundational knowledge. We transition students into deeper academic concepts in science, language arts, and basic math while cultivating creative thinking, personal discipline, and active team participation.',
          ageGroup: '6 to 10 Years',
          highlights: [
            'Interactive learning classrooms',
            'Weekly spelling & creative drawing tasks',
            'Basic computer usage introduction',
            'Practical science exhibits & collections',
            'Value-based moral education sessions'
          ],
          subjects: ['English Language & Grammar', 'Mathematics', 'Science & Environment', 'Nepali & Social Studies', 'Computer Studies', 'Moral Science', 'Art & Craft'],
          icon: 'BookOpen',
          order: 2
        },
        {
          programId: 'secondary',
          title: 'Secondary Level',
          subtitle: 'Grade 6 to Grade 10 (SEE Preparation)',
          description: 'Designed to equip students for higher secondary learning and the national Secondary Education Examination (SEE). We focus heavily on logical reasoning, analytical abilities, advanced computer operations, laboratory research, and structured competitive exams prep.',
          ageGroup: '11 to 16 Years',
          highlights: [
            'Intensive Secondary Education Examination (SEE) drills',
            'Hands-on Physics, Chemistry & Biology laboratory experiments',
            'Advanced computer programming & coding basics',
            'Leadership programs & public speaking classes',
            'Inter-school sports tournaments coaching'
          ],
          subjects: ['Compulsory English', 'Compulsory Mathematics', 'Science & Technology', 'Social Studies (Nepali Medium)', 'Nepali Language', 'Optional Mathematics / Env. Science', 'Computer Science'],
          icon: 'GraduationCap',
          order: 3
        }
      ];
      await Program.insertMany(mockPrograms);
      console.log('Seeded default academic programs to MongoDB.');
    }

    // Seed Admission Steps
    const stepCount = await AdmissionStep.countDocuments();
    if (stepCount === 0) {
      const mockSteps = [
        {
          num: "01",
          title: "Online Registration",
          desc: "Fill and submit the online application form to register your child's inquiry.",
          icon: "ClipboardList",
          details: [
            "Provide accurate candidate and guardian information.",
            "Choose appropriate grade level and academic term.",
            "Double-check contact numbers and emails before submission.",
            "Keep the generated registration reference number safe."
          ],
          order: 1
        },
        {
          num: "02",
          title: "Document Submission",
          desc: "Provide necessary educational certificates, photos, and birth registration.",
          icon: "FileCheck",
          details: [
            "Photocopy of birth certificate.",
            "Transfer certificate and character certificate from prior school.",
            "Marksheet/Report card of the last terminal/final examination.",
            "Three recent passport-sized color photographs of the student."
          ],
          order: 2
        },
        {
          num: "03",
          title: "Entrance Assessment",
          desc: "Mandatory entrance examination covering English, Mathematics, Science, and Nepali.",
          icon: "FileSpreadsheet",
          details: [
            "Entrance exams are compulsory for all grades starting from Prep-Class to Grade 9.",
            "Questions check understanding of basic concepts from the preceding grade.",
            "Exam duration is approximately 2 hours.",
            "Results are announced within 2 days of testing."
          ],
          order: 3
        },
        {
          num: "04",
          title: "Interview & Enrollment",
          desc: "A brief student and parent interaction with the Principal followed by fee settlement.",
          icon: "Compass",
          details: [
            "Both parents/guardians are recommended to accompany the child during interview.",
            "Review and sign the school discipline agreement forms.",
            "Deposit admission, security, and first terminal fees at the accountant desk.",
            "Collect textbooks list, notebooks list, and custom uniforms details."
          ],
          order: 4
        }
      ];
      await AdmissionStep.insertMany(mockSteps);
      console.log('Seeded default admission journey steps to MongoDB.');
    }

    // Seed Officials
    const officialsCount = await Official.countDocuments();
    if (officialsCount === 0) {
      const mockOfficials = [
        {
          name: 'Bishnu GC',
          position: 'Principal',
          category: 'leadership',
          categoryLabel: 'Leadership',
          image: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01910-scaled.jpg',
          email: 'bishnugc@dhungesanghu.edu.np',
          qualification: 'M.Ed. in Educational Leadership',
          experience: '18+ Years Experience',
          order: 1
        },
        {
          name: 'D Daya Sagar Paudel',
          position: 'Academic Coordinator',
          category: 'leadership',
          categoryLabel: 'Leadership',
          image: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-11-at-3.41.57-PM.jpeg',
          email: 'dayasagar@dhungesanghu.edu.np',
          qualification: 'M.Sc. in Mathematics',
          experience: '12+ Years Experience',
          order: 2
        },
        {
          name: 'Dhruba Bandhu Rijal',
          position: 'Senior School Incharge',
          category: 'leadership',
          categoryLabel: 'Leadership',
          image: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01902-scaled.jpg',
          email: 'dhrubarijal@dhungesanghu.edu.np',
          qualification: 'M.A. in English Literature',
          experience: '15+ Years Experience',
          order: 3
        },
        {
          name: 'Sunita Bhujel',
          position: 'Senior Accountant',
          category: 'admin',
          categoryLabel: 'Administration',
          image: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01609-scaled.jpg',
          email: 'sunitabhujel@dhungesanghu.edu.np',
          qualification: 'M.B.S. in Finance',
          experience: '8+ Years Experience',
          order: 4
        },
        {
          name: 'Ramesh Bhandari',
          position: 'Senior Mathematics Faculty',
          category: 'teachers',
          categoryLabel: 'Teaching Faculty',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400',
          email: 'rameshbhandari@dhungesanghu.edu.np',
          qualification: 'B.Sc. B.Ed. in Mathematics',
          experience: '6+ Years Experience',
          order: 5
        },
        {
          name: 'Sita Gurung Thapa',
          position: 'Physics & Chemistry Faculty',
          category: 'teachers',
          categoryLabel: 'Teaching Faculty',
          image: 'https://images.unsplash.com/photo-1580894732444-8fecef2271d4?q=80&w=400',
          email: 'sitathapa@dhungesanghu.edu.np',
          qualification: 'M.Sc. in Physics',
          experience: '7+ Years Experience',
          order: 6
        },
        {
          name: 'Anju Gurung',
          position: 'English Language Expert',
          category: 'teachers',
          categoryLabel: 'Teaching Faculty',
          image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400',
          email: 'anjugurung@dhungesanghu.edu.np',
          qualification: 'B.A. in English & Education',
          experience: '5+ Years Experience',
          order: 7
        },
        {
          name: 'Krishna Raj GC',
          position: 'Social Studies & Moral values Faculty',
          category: 'teachers',
          categoryLabel: 'Teaching Faculty',
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400',
          email: 'krishnagc@dhungesanghu.edu.np',
          qualification: 'M.A. in Sociology',
          experience: '10+ Years Experience',
          order: 8
        }
      ];
      await Official.insertMany(mockOfficials);
      console.log('Seeded default school officials to MongoDB.');
    }

    // Seed Admission FAQs
    const faqsCount = await AdmissionFaq.countDocuments();
    if (faqsCount === 0) {
      const mockFaqs = [
        {
          q: "What is the age criteria for Kindergarten admissions?",
          a: "Children should be 2.5+ years old for Nursery, 3.5+ years for LKG, and 4.5+ years for UKG admissions. Age validation is done using their birth certificate.",
          order: 1
        },
        {
          q: "Is transportation facility available for all routes in Pokhara?",
          a: "Yes, our transport covers almost all major routes in Pokhara-17, Mahatgaunda, Birauta, Damside, Chorepatan, and adjoining areas. You can register for transportation during final admission.",
          order: 2
        },
        {
          q: "Are scholarship schemes available for deserving students?",
          a: "Dhungesanghu Boarding School provides scholarships based on merit (entrance exam toppers, terminal toppers) and need-based scholarships for underprivileged or marginalized students. Details can be requested from the administration desk.",
          order: 3
        },
        {
          q: "Can I pay the school fee in installments?",
          a: "Yes, fees can be paid in installments corresponding to the four academic terms (Shrawan, Kartika, Magh, Baisakh). Term fees should be cleared before terminal examinations begin.",
          order: 4
        }
      ];
      await AdmissionFaq.insertMany(mockFaqs);
      console.log('Seeded default admission FAQs to MongoDB.');
    }
  } catch (err) {
    console.error('Error seeding MongoDB Atlas:', err.message);
  }
}

