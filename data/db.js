import mongoose from "mongoose";
import dotenv from "dotenv";
import user from "./entities/User.js";
import project from "./entities/Project.js";

dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

const models = {
    User: mongoose.model('User', user),
    Project: mongoose.model('Project', project),
}

export { connectDb, models };