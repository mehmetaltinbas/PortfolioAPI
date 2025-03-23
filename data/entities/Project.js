import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String },
    description: { type: String },
    repositoryLinks: { type: [String] },
    liveDemoLink: { type: String },
    technologies: { type: [String] },
});

export default projectSchema;