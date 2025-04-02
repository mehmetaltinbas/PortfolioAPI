import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    school: { type: String, required: true },
    degree: { type: String },
    fieldOfStudy: { type: String },
    websiteLink: { type: String },
    description: { type: String },
    isCurrent: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
});

export default educationSchema;