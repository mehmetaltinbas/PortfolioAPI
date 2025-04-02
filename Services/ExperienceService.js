import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';
import activityService from './ActivityService.js';

const CreateAsync = errorHandler(async function ExperienceService_CreateAsync(data) {
    if (data.isCurrent) data.endDate = null;
    const experience = new models.Experience(data);
    await experience.save();
    return { isSuccess: true, message: "Experience created successfully" };
});


const GetAllByUserIdAsync = errorHandler(async function ExperienceService_GetAllByUserIdAsync(userId) {
    const experiences = await models.Experience.find({ userId }).lean();

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const experiencesWithActivities = await Promise.all(experiences.map(async (experience) => {
        experience.startDate = formatDate(experience.startDate);
        experience.endDate = experience.isCurrent ? "Present" : formatDate(experience.endDate);
        
        const activitiesResponse = await activityService.GetAllByExperienceIdAsync(experience._id);
        experience.activities = activitiesResponse.activities; // Activities ekleniyor

        return experience;
    }));

    experiencesWithActivities.sort((a, b) => {
        if (a.isCurrent && !b.isCurrent) return -1;
        if (!a.isCurrent && b.isCurrent) return 1;

        const dateA = new Date(a.endDate || a.startDate);
        const dateB = new Date(b.endDate || b.startDate);

        if (dateA.getTime() === dateB.getTime()) {
            return new Date(a.startDate) - new Date(b.startDate);
        }

        return dateB - dateA;
    });

    return { isSuccess: true, message: "Experiences associated with given userId read.", experiences: experiencesWithActivities };
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