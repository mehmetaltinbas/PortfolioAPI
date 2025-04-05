import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { 
        type: String,
        enum: ['email', 'phone', 'linkedin', 'github', 'twitter'],
        required: true,
     },
    value: { type: String, required: true },
});

export default contactSchema;