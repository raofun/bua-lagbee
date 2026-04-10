const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

const helpers = [
  {
    name: "Rahima Khatun",
    location: "Banani, Dhaka",
    bnLocation: "বনানী, ঢাকা",
    rating: 4.9,
    skills: ["Chef", "Bengali Cuisine"],
    bnSkills: ["বাবুর্চি", "বাঙালি খাবার"],
    category: "Chef",
    tasks: [
      { name: "Cooking", bnName: "রান্না করা", price: 5000 },
      { name: "Grocery", bnName: "বাজার করা", price: 3500 }
    ],
    monthlyRate: 8500
  },
  {
    name: "Shabana Begum",
    location: "Gulshan 2, Dhaka",
    bnLocation: "গুলশান ২, ঢাকা",
    rating: 4.8,
    skills: ["Housekeeping", "Laundry"],
    bnSkills: ["গৃহকর্মী", "ধোয়ামোছা"],
    verified: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkg-1sI1nrmh5SUnibNb3GRmqIrTvWI6l1H1ovRcTbsFQinC2V9SWt2B2EI32PisFmhRU4ww-AJCzGl_G70CN3jDlQTGlSk3b3xb0EsQC_1Cv3Ue5IRKPcGN2j8G8pI-p9qxE71G0xyxE2dZugjIItahKe7XoTi0ztdbKqOwwQ_l_GbVMKIjpgZskdFN9mjUpWiKICYtGEGcwxTW59ERuf5gkyDTI9XkPePfrmdmuuMiTLorCcMfjd8TLIT4kI1s8Ld3r_aWEpx6Qh",
    experience: "3 Years",
    reviews: 18,
    category: "Housekeeping",
    shift: "Afternoon",
    workingHours: "1 PM - 5 PM",
    tasks: [
      { name: "Cleaning", bnName: "ঘর পরিষ্কার", price: 4000 },
      { name: "Laundry", bnName: "কাপড় ধোয়া", price: 3200 }
    ],
    monthlyRate: 7200
  },
  {
    name: "Md. Jahangir",
    location: "Baridhara, Dhaka",
    bnLocation: "বারিধারা, ঢাকা",
    rating: 5.0,
    skills: ["Executive Chef", "Continental"],
    bnSkills: ["প্রধান বাবুর্চি", "কন্টিনেন্টাল"],
    verified: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0LMxMhO7uREFaBnuezPwOUhGGSEZv7puqMWfhNAeRFDorB5GGwCtqZ-6ceRbRT388Nt_BV7nskOSmnliZG3vUPJ7h-SchsvmhLZOSeWE7fL5o_gB5uX8W8OpyLqo1NevMamJRFigraLGTh4mfzXyMih25jiwi5jpGIkLui84kn71LqPawCZ5E4AiT2RljHimiv05Zg17tsyaNz_4HVpSztI24piuCX7qCjAPNfLBfbvguOHI5hWfhoNAD0DSXxyeoV_TGC1WeM3wI",
    experience: "8 Years",
    reviews: 42,
    category: "Chef",
    shift: "Evening",
    workingHours: "6 PM - 10 PM",
    tasks: [
      { name: "Specialized Cooking", bnName: "বিশেষ রান্না", price: 12000 }
    ],
    monthlyRate: 12000
  }
];


const HelperSchema = new mongoose.Schema({
    name: String,
    location: String,
    bnLocation: String,
    rating: Number,
    skills: [String],
    bnSkills: [String],
    monthlyRate: Number,
    verified: Boolean,
    image: String,
    experience: String,
    reviews: Number,
    category: String,
    shift: String,
    workingHours: String,
    tasks: [
      { name: String, bnName: String, price: Number }
    ]
}, { timestamps: true });

const Helper = mongoose.models.Helper || mongoose.model('Helper', HelperSchema);

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    balance: { type: Number, default: 0 }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected! Cleaning old records...");
    await Helper.deleteMany({});
    await User.deleteMany({});

    console.log("Seeding helpers...");
    await Helper.insertMany(helpers);

    console.log("Seeding a test user...");
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('password123', 10);
    await User.create({
        name: "Test User",
        email: "user@example.com",
        password: hashedPassword,
        balance: 5000,
        role: "user"
    });

    console.log("Seeding an admin user...");
    await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        balance: 100000,
        role: "admin"
    });

    console.log("Seeding complete! Successfully added 3 helpers and 2 users.");
    console.log("--------------------------------------------------");
    console.log("Admin Login -> Email: admin@example.com, Password: password123");
    console.log("User Login  -> Email: user@example.com, Password: password123");
    console.log("--------------------------------------------------");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seed();
