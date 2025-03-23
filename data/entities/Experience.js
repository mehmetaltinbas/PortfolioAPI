import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: String },
    position: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
});

export default experienceSchema;