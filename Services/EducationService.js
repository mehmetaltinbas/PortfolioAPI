import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';

const CreateAsync = errorHandler(async function EducationService_CreateAsync(data) {
    if (data.isCurrent) data.endDate = null;
    const education = new models.Education(data);
    await education.save();
    return {
        isSuccess: true,
        message: 'Education record created successfully',
    };
});

const GetAllByUserIdAsync = errorHandler(
    async function EducationService_GetAllByUserIdAsync(userId) {
        const educations = await models.Education.find({ userId });

        const formatDate = (isoString) => {
            const date = new Date(isoString);
            return date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        };
        const endDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/; // "2025-03-01T00:00:00.000Z" format
        educations.forEach((education) => {
            education.startDate = new Date(education.startDate).toLocaleDateString();
            education.startDate = formatDate(education.startDate);
            if (endDateFormat.test(education.endDate)) {
                education.endDate = new Date(education.endDate).toLocaleDateString();
                education.endDate = formatDate(education.endDate);
            }
        });
        return {
            isSuccess: true,
            message: 'Education records associated with given userId read.',
            educations,
        };
    },
);

const UpdateAsync = errorHandler(async function EducationService_UpdateAsync(data) {
    const { userId, educationId, ...updateFields } = data;
    if (updateFields.isCurrent) updateFields.endDate = null;
    const updatedEducation = await models.Education.findOneAndUpdate(
        { _id: educationId, userId },
        { $set: updateFields },
        { new: true },
    );

    if (!updatedEducation)
        return {
            isSuccess: false,
            message: 'Education record not found or unauthorized',
        };
    return { isSuccess: true, message: 'Education record updated.' };
});

const DeleteAsync = errorHandler(async function EducationService_DeleteAsync(data) {
    const { userId, educationId } = data;
    const deletedEducation = await models.Education.findOneAndDelete({
        _id: educationId,
        userId,
    });

    if (!deletedEducation)
        return {
            isSuccess: false,
            message: 'Education record not found or unauthorized',
        };
    return {
        isSuccess: true,
        message: 'Education record deleted successfully',
    };
});

export default {
    CreateAsync,
    GetAllByUserIdAsync,
    UpdateAsync,
    DeleteAsync,
};
