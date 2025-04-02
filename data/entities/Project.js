import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: [String], enum: ['web', 'mobile', 'desktop'], required: true },
    title: { type: String, required: true },
    shortDescription: { type: String },
    longDescription: { type: String },
    repositoryLinks: { type: [String] },
    liveDemoLink: { type: String },
    technologies: { type: [String] },
});

export default projectSchema;