import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ["student"],
        default: "student"
    }
}, { timestamps: true })

export const Student = mongoose.model("Student", studentSchema);