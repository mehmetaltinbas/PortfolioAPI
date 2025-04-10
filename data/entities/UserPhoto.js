import mongoose from 'mongoose';

const userPhotoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['profile', 'about'],
        required: true,
    },
    order: { type: Number },
    value: { type: String, required: true },
});

export default userPhotoSchema;
