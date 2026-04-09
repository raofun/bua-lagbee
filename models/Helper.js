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
    required: [true, "Please provide a monthly rate."],
  },
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
    type: String, // Chef, Housekeeping, Nanny, etc.
  }
}, {
  timestamps: true,
});

export default mongoose.models.Helper || mongoose.model("Helper", HelperSchema);
