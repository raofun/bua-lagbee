import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["Recharge", "Release", "Tip"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Successful", "Failed"],
    default: "Successful",
  },
  date: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

TransactionSchema.index({ type: 1 });
TransactionSchema.index({ date: -1 });

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
