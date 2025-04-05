import mongoose from "mongoose";

const user = new mongoose.Schema({
    userName: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    position: { type: String },
    bio: { type: String },
    about: { type: String },
    location: { type: String },
    dateOfBirth: { type: Date },
    age: { type: Number }
});

export default user;