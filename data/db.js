import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import contactSchema from './entities/Contact.js';
import educationSchema from './entities/Education.js';
import experienceSchema from "./entities/Experience.js";
import projectSchema from "./entities/Project.js";
import skillSchema from './entities/Skill.js';
import userSchema from "./entities/User.js";
import activitySchema from './entities/Activity.js'
import projectSkillSchema from "./entities/ProjectSkill.js";
import projectLinkSchema from "./entities/ProjectLink.js";
import projectPhotoSchema from './entities/ProjectPhoto.js';
import userPhotoSchema from "./entities/UserPhoto.js";

dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

const models = {
    Contact: mongoose.model('Contact', contactSchema),
    Education: mongoose.model('Education', educationSchema),
    Experience: mongoose.model('Experience', experienceSchema),
    Project: mongoose.model('Project', projectSchema),
    Skill: mongoose.model('Skill', skillSchema),
    User: mongoose.model('User', userSchema),
    Activity: mongoose.model('Activity', activitySchema),
    ProjectSkill: mongoose.model('ProjectSkill', projectSkillSchema),
    ProjectLink: mongoose.model('ProjectLink', projectLinkSchema),
    ProjectPhoto: mongoose.model('ProjectPhoto', projectPhotoSchema),
    UserPhoto: mongoose.model('UserPhoto', userPhotoSchema)
}

export { connectDb, models };