import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String },
    value: { type: String },
    visibility: { type: String, enum: ['public', 'private'], default: 'public' },
});

export default contactSchema;