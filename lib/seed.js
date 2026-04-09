const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
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
    monthlyRate: 8500,
    verified: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDce2iccjxH57EwkdVn-QtCNllmmkzGGQ7IdkIoOXk9r_jsJRoBTwnl84myxtz6-xW2hnM7raau8j0Jggc0F8FX00XbiEXzYXGUcIa0s8syX2Be_mIul-SERRCoZyfG5rxSDh2tKEl7zYsgifVGonww5io9BnywH5K4HBR9HQF3L5vTjDnYVo2o-6npPstAprJLdhhAcamficiS3cVyDdIqVdMEEX5dOTzvSt6yR4mF7iq7UPQYuLkDLS282Zqj3lBgLzNBEcx7jtNM",
    experience: "5 Years",
    reviews: 24,
    category: "Chef"
  },
  {
    name: "Shabana Begum",
    location: "Gulshan 2, Dhaka",
    bnLocation: "গুলশান ২, ঢাকা",
    rating: 4.8,
    skills: ["Housekeeping", "Laundry"],
    bnSkills: ["গৃহকর্মী", "ধোয়ামোছা"],
    monthlyRate: 7200,
    verified: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkg-1sI1nrmh5SUnibNb3GRmqIrTvWI6l1H1ovRcTbsFQinC2V9SWt2B2EI32PisFmhRU4ww-AJCzGl_G70CN3jDlQTGlSk3b3xb0EsQC_1Cv3Ue5IRKPcGN2j8G8pI-p9qxE71G0xyxE2dZugjIItahKe7XoTi0ztdbKqOwwQ_l_GbVMKIjpgZskdFN9mjUpWiKICYtGEGcwxTW59ERuf5gkyDTI9XkPePfrmdmuuMiTLorCcMfjd8TLIT4kI1s8Ld3r_aWEpx6Qh",
    experience: "3 Years",
    reviews: 18,
    category: "Housekeeping"
  },
  {
    name: "Md. Jahangir",
    location: "Baridhara, Dhaka",
    bnLocation: "বারিধারা, ঢাকা",
    rating: 5.0,
    skills: ["Executive Chef", "Continental"],
    bnSkills: ["প্রধান বাবুর্চি", "কন্টিনেন্টাল"],
    monthlyRate: 12000,
    verified: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0LMxMhO7uREFaBnuezPwOUhGGSEZv7puqMWfhNAeRFDorB5GGwCtqZ-6ceRbRT388Nt_BV7nskOSmnliZG3vUPJ7h-SchsvmhLZOSeWE7fL5o_gB5uX8W8OpyLqo1NevMamJRFigraLGTh4mfzXyMih25jiwi5jpGIkLui84kn71LqPawCZ5E4AiT2RljHimiv05Zg17tsyaNz_4HVpSztI24piuCX7qCjAPNfLBfbvguOHI5hWfhoNAD0DSXxyeoV_TGC1WeM3wI",
    experience: "8 Years",
    reviews: 42,
    category: "Chef"
  }
];

// Define Schema for Seeding (avoiding ES modules complexity in script)
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
    category: String
}, { timestamps: true });

const Helper = mongoose.models.Helper || mongoose.model('Helper', HelperSchema);

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected! Cleaning old records...");
    await Helper.deleteMany({});
    console.log("Seeding helpers...");
    await Helper.insertMany(helpers);
    console.log("Seeding complete! Successfully added 3 helpers.");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seed();
