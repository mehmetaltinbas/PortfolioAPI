import mongoose from "mongoose";

const user = new mongoose.Schema({
    userName: { type: String, unique: true },
    passwordHash: { type: String },
});

export default user;