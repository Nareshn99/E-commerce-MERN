import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    addressCity: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export default mongoose.model("User", userSchema);