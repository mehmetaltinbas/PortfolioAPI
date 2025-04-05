import mongoose from "mongoose";

const projectSkillSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true },
    level: { type: String },
});

export default projectSkillSchema;