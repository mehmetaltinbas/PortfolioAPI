import mongoose from "mongoose";

const project = new mongoose.Schema({
    title: { type: String },
    description: { type: String},
    gihubLink: { type: String},
    liveDemoLink: { type: String},
    techStack: { type: String},
});

export default project;