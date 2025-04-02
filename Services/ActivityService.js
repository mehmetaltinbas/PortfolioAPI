import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';


const CreateAsync = errorHandler(async function ActivityService_CreateAsync(data) {
    const activity = new models.Activity(data);
    await activity.save();
    return { isSuccess: true, message: "Activity created successfully" };
});


const GetAllByExperienceIdAsync = errorHandler(async function ActivityService_GetAllByExperienceIdAsync(experienceId) {
    const activities = await models.Activity.find({ experienceId });
    return { isSuccess: true, message: "Activities associated with given experienceId read.", activities };
});


const UpdateAsync = errorHandler(async function ActivityService_UpdateAsync(data) {
    const { activityId, experienceId, ...updateFields } = data;
    const updatedActivity = await models.Activity.findOneAndUpdate(
        { _id: activityId, experienceId },
        { $set: updateFields },
        { new: true }
    );

    if (!updatedActivity) return { isSuccess: false, message: "Activity not found or unauthorized" };
    return { isSuccess: true, message: "Activity updated." };
});


const DeleteAsync = errorHandler(async function ActivityService_DeleteAsync(data) {
    const { activityId } = data;
    const deletedActivity = await models.Activity.findOneAndDelete({ _id: activityId });

    if (!deletedActivity) return { isSuccess: false, message: "Activity not found or unauthorized" };
    return { isSuccess: true, message: "Activity deleted successfully" };
});


export default {
    CreateAsync,
    GetAllByExperienceIdAsync,
    UpdateAsync,
    DeleteAsync,
};