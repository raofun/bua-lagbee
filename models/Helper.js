import mongoose from "mongoose";

const HelperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this helper."],
  },
  location: {
    type: String,
    required: [true, "Please provide a location."],
  },
  nid: {
    type: String,
    default: "",
  },
  bnLocation: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  skills: {
    type: [String],
    default: [],
  },
  bnSkills: {
    type: [String],
    default: [],
  },
  monthlyRate: {
    type: Number,
    default: 0
  },
  tasks: [
    {
      name: String,
      bnName: String,
      price: Number
    }
  ],
  verified: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: [true, "Please provide an image URL."],
  },
  experience: {
    type: String,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  phone: {
    type: String,
  },
  category: {
    type: String, 
  },
  shift: {
    type: String, 
    enum: ["Morning", "Afternoon", "Evening", "Full Day"],
    default: "Morning"
  },
  workingHours: {
    type: String, 
  },
  workingDays: {
    type: String, 
    default: "Sat - Thu"
  }
}, {
  timestamps: true,
});

HelperSchema.pre('save', function() {
  if (this.tasks && this.tasks.length > 0) {
    this.monthlyRate = this.tasks.reduce((sum, task) => sum + (task.price || 0), 0);
  } else if (!this.monthlyRate) {
    this.monthlyRate = 0;
  }
});

delete mongoose.models.Helper;
export default mongoose.model("Helper", HelperSchema);
