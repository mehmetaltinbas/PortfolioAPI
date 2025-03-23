import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    school: { type: String },
    degree: { type: String },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
});

export default educationSchema;