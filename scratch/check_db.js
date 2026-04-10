const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function checkAdmin() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error("MONGODB_URI missing");
    
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");
    
    const UserSchema = new mongoose.Schema({ email: String, role: String });
    const User = mongoose.models.User || mongoose.model('User', UserSchema);
    
    const admin = await User.findOne({ role: 'admin' });
    if (admin) {
      console.log("Admin found:", admin.email);
    } else {
      console.log("NO ADMIN FOUND IN DATABASE.");
    }
    
    const allUsers = await User.find({});
    console.log("Total Users in DB:", allUsers.length);
    console.log("Users:", allUsers.map(u => u.email));

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

checkAdmin();
