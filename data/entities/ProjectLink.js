import mongoose from "mongoose";

const projectLinkSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    type: { type: String },
    value: { type: String },
});

export default projectLinkSchema;