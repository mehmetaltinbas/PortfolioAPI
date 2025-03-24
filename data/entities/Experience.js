import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    isCurrent: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
});

export default experienceSchema;