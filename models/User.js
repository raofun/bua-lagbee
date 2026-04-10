import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name."],
    },
    email: {
        type: String,
        required: [true, "Please provide an email."],
        unique: true,
    },
    password: {
        type: String,

    },
    googleId: {
        type: String,
    },
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    nid: String,
    coverImage: String,

    role: {
        type: String,
        enum: ["user", "admin", "helper"],
        default: "user",
    },
    balance: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        default: "https://lh3.googleusercontent.com/yTjQUPgMhIsU_6XbLxNf4T6B5_M6X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X=s96-c",
    },
    hiredHelpers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Helper"
    }]
}, {
    timestamps: true,
});

UserSchema.index({ role: 1 });
UserSchema.index({ createdAt: -1 });

delete mongoose.models.User;
export default mongoose.model("User", UserSchema);
