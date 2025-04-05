import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';
import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';

dotenv.config();

const CreateAsync = errorHandler(async function UserPhotoService_CreateAsync(data) {
    const userPhoto = new models.UserPhoto(data);
    await userPhoto.save();
    return { isSuccess: true, message: "User photo created successfully" };
});

const GetAllByUserIdAsync = errorHandler(async function UserPhotoService_GetAllByUserIdAsync(userId) {
    const userPhotos = await models.UserPhoto.find({ userId }).lean();
    userPhotos.forEach((userPhoto) => {
        userPhoto.value = `${process.env.BASE_URL}uploads/user/photo/${userPhoto.value}`;
    });
    return { isSuccess: true, message: "User photos associated with given userId read.", userPhotos };
});

const UpdateAsync = errorHandler(async function UserPhotoService_UpdateAsync(data) {
    const { userId, userPhotoId, ...updateFields } = data;
    const updatedUserPhoto = await models.UserPhoto.findOneAndUpdate(
        { _id: userPhotoId, userId },
        { $set: updateFields },
        { new: true }
    );

    if (!updatedUserPhoto) return { isSuccess: false, message: "User photo not found or unauthorized" };
    return { isSuccess: true, message: "User photo updated." };
});

const DeleteAsync = errorHandler(async function UserPhotoService_DeleteAsync(data) {
    const { userPhotoId } = data;
    const userPhoto = await models.UserPhoto.findById(userPhotoId);

    const deletedUserPhoto = await models.UserPhoto.findOneAndDelete({ _id: userPhotoId });
    if (!deletedUserPhoto) return { isSuccess: false, message: "User photo not found or unauthorized" };

    const filePath = path.join(process.cwd(), `uploads/user/photo/${userPhoto.value}`);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    return { isSuccess: true, message: "User photo deleted successfully" };
});

export default {
    CreateAsync,
    GetAllByUserIdAsync,
    UpdateAsync,
    DeleteAsync,
};