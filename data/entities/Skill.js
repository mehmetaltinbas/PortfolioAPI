import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String },
    level: { type: String },
});

export default skillSchema;