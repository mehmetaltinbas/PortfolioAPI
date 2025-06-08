import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    order: {
        type: Number,
    },
    type: {
        type: [String],
        enum: ['web', 'mobile', 'desktop'],
        required: true,
    },
    title: { type: String, required: true },
    shortDescription: { type: String },
    longDescription: { type: String },
});

export default projectSchema;
