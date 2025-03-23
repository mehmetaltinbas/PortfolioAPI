import mongoose from "mongoose";

const user = new mongoose.Schema({
    userName: { type: String },
    password: { type: String },
});

export default user;