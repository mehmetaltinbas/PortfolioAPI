import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';

const CreateAsync = errorHandler(async function ExperienceService_CreateAsync(data) {
    if (data.isCurrent) data.endDate = null;
    const experience = new models.Experience(data);
    await experience.save();
    return { isSuccess: true, message: "Experience created successfully" };
});

const GetAllByUserIdAsync = errorHandler(async function ExperienceService_GetAllByUserIdAsync(userId) {
    const experiences = await models.Experience.find({ userId });
    return { isSuccess: true, message: "Experiences associated with given userId read.", experiences };
});

const UpdateAsync = errorHandler(async function ExperienceService_UpdateAsync(data) {
    const { userId, experienceId, ...updateFields } = data;
    if (updateFields.isCurrent) updateFields.endDate = null;
    const updatedExperience = await models.Experience.findOneAndUpdate(
        { _id: experienceId, userId },
        { $set: updateFields },
        { new: true }
    );

    if (!updatedExperience) return { isSuccess: false, message: "Experience not found or unauthorized" };
    return { isSuccess: true, message: "Experience updated." };
});

const DeleteAsync = errorHandler(async function ExperienceService_DeleteAsync(data) {
    const { userId, experienceId } = data;
    const deletedExperience = await models.Experience.findOneAndDelete({ _id: experienceId, userId });

    if (!deletedExperience) return { isSuccess: false, message: "Experience not found or unauthorized" };
    return { isSuccess: true, message: "Experience deleted successfully" };
});

export default {
    CreateAsync,
    GetAllByUserIdAsync,
    UpdateAsync,
    DeleteAsync,
}