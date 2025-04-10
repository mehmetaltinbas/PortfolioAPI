import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const CreateAsync = errorHandler(async function ProjectPhotoService_CreateAsync(data) {
    const projectPhoto = new models.ProjectPhoto(data);
    await projectPhoto.save();
    return {
        isSuccess: true,
        message: 'Project photo created successfully',
    };
});

const GetAllByProjectIdAsync = errorHandler(
    async function ProjectPhotoService_GetAllByProjectIdAsync(projectId) {
        const projectPhotos = await models.ProjectPhoto.find({
            projectId,
        }).lean();
        projectPhotos.forEach((projectphoto) => {
            projectphoto.value = `${process.env.BASE_URL}uploads/project/photo/${projectphoto.value}`;
        });
        return {
            isSuccess: true,
            message: 'Project photos associated with given projectId read.',
            projectPhotos,
        };
    },
);

const UpdateAsync = errorHandler(async function ProjectPhotoService_UpdateAsync(data) {
    const { projectId, projectPhotoId, ...updateFields } = data;
    const updatedProjectPhoto = await models.ProjectPhoto.findOneAndUpdate(
        { _id: projectPhotoId, projectId },
        { $set: updateFields },
        { new: true },
    );

    if (!updatedProjectPhoto)
        return {
            isSuccess: false,
            message: 'Project photo not found or unauthorized',
        };
    return { isSuccess: true, message: 'Project photo updated.' };
});

const DeleteAsync = errorHandler(async function ProjectPhotoService_DeleteAsync(data) {
    const { projectPhotoId } = data;
    const projectPhoto = await models.ProjectPhoto.findById(projectPhotoId);

    const deletedProjectPhoto = await models.ProjectPhoto.findOneAndDelete({
        _id: projectPhotoId,
    });
    if (!deletedProjectPhoto)
        return {
            isSuccess: false,
            message: 'Project photo not found or unauthorized',
        };

    const filePath = path.join(process.cwd(), `uploads/project/photo/${projectPhoto.value}`);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    return {
        isSuccess: true,
        message: 'Project photo deleted successfully',
    };
});

export default {
    CreateAsync,
    GetAllByProjectIdAsync,
    UpdateAsync,
    DeleteAsync,
};
