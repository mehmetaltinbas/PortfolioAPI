import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: [
            'cv',
            'email',
            'phone',
            'linkedin',
            'github',
            'twitter',
            'upwork',
            'instagram',
            'youtube',
        ],
        required: true,
    },
    value: { type: String, required: true },
});

export default contactSchema;
