import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    experienceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
        required: true,
    },
    activity: { type: String, required: true },
    order: { type: Number },
});

export default activitySchema;
