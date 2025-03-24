import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';


const CreateAsync = errorHandler(async function EducationService_CreateAsync(data) {
    if (data.isCurrent) data.endDate = null;
    const education = new models.Education(data);
    await education.save();
    return { isSuccess: true, message: "Education record created successfully" };
});


const GetAllByUserIdAsync = errorHandler(async function EducationService_GetAllByUserIdAsync(userId) {
    const educationRecords = await models.Education.find({ userId });
    return { isSuccess: true, message: "Education records associated with given userId read.", educationRecords };
});


const UpdateAsync = errorHandler(async function EducationService_UpdateAsync(data) {
    const { userId, educationId, ...updateFields } = data;
    if (updateFields.isCurrent) updateFields.endDate = null;
    const updatedEducation = await models.Education.findOneAndUpdate(
        { _id: educationId, userId },
        { $set: updateFields },
        { new: true }
    );

    if (!updatedEducation) return { isSuccess: false, message: "Education record not found or unauthorized" };
    return { isSuccess: true, message: "Education record updated." };
});


const DeleteAsync = errorHandler(async function EducationService_DeleteAsync(data) {
    const { userId, educationId } = data;
    const deletedEducation = await models.Education.findOneAndDelete({ _id: educationId, userId });

    if (!deletedEducation) return { isSuccess: false, message: "Education record not found or unauthorized" };
    return { isSuccess: true, message: "Education record deleted successfully" };
});


export default {
    CreateAsync,
    GetAllByUserIdAsync,
    UpdateAsync,
    DeleteAsync,
};
