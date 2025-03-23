import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


const SignUpAsync = errorHandler(async function UserService_SignUpAsync(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new models.User({
        userName: data.userName,
        passwordHash: hashedPassword
    });
    await user.save();
    return { isSuccess: true, message: "Signed up."};
});


const SignInAsync = errorHandler(async function UserService_SignInAsync(data) {
    const user = await models.User.findOne({ userName: data.userName });
    if (!user) return { isSuccess: false, message: "Invalid userName." };

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) return { isSuccess: false, message: "Invalid password." };

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SIGNATURE,
        { expiresIn: "1h" }
    );

    return { isSuccess: true, message: "Signed in.", jwt: token };
});


const AuthorizeAsync = errorHandler(async function UserService_AuthorizeAsync(data) {
    return { isSuccess: true, message: "User authorized." };
});


const GetAllAsync = errorHandler(async function UserService_GetAllAsync() {
    const users = await models.User.find();
    return { isSuccess: true, message: "All users read.", users };
});


const GetByIdAsync = errorHandler(async function UserService_GetByIdAsync(userId) {
    const user = await models.User.findById(userId);
    if (!user) return { isSuccess: false, message: "User not found." };
    return { isSuccess: true, message: "User read for given userId.", user };
});


const UpdateAsync = errorHandler(async function UserService_UpdateAsync(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const updatedUser = await models.User.findByIdAndUpdate(
        data.id,
        {
            userName: data.userName,
            passwordHash: hashedPassword,
        },
        { new: true }
    )

    if (!updatedUser) return { isSuccess: false, message: "No user found." };
    return { isSuccess: true, message: "User updated." };
});


export default {
    SignUpAsync,
    SignInAsync,
    AuthorizeAsync,
    GetAllAsync,
    GetByIdAsync,
    UpdateAsync,

}