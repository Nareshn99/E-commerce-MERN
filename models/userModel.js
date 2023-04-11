import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    question: {
        type: String,
        require: true
    },
    addressCity: {
        type: String,
        require: true
    },
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export default mongoose.model("User", userSchema);