import mongoose from "mongoose";

const user = new mongoose.Schema({
    userName: String,
    password: String,
});

export default user;