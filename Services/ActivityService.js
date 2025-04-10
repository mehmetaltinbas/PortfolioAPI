import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';

const CreateAsync = errorHandler(async function ActivityService_CreateAsync(data) {
    const { experienceId } = data;
    const count = await models.Activity.countDocuments({ experienceId });

    const activity = new models.Activity({ ...data, order: count });
    await activity.save();

    return { isSuccess: true, message: 'Activity created successfully' };
});

const GetAllByExperienceIdAsync = errorHandler(
    async function ActivityService_GetAllByExperienceIdAsync(experienceId) {
        const activities = await models.Activity.find({ experienceId }).sort({
            order: 1,
        });
        return {
            isSuccess: true,
            message: 'Activities associated with given experienceId read.',
            activities,
        };
    },
);

const GetByIdAsync = errorHandler(async function ActivityService_GetAllByIdAsync(activityId) {
    const activity = await models.Activity.findById(activityId);
    if (!activity) return { isSuccess: false, message: 'Activity not found.' };
    return {
        isSuccess: true,
        message: 'Activity read for given activityId.',
        activity,
    };
});

const UpdateAsync = errorHandler(async function ActivityService_UpdateAsync(data) {
    const { activityId, experienceId, order: newOrder, ...updateFields } = data;

    const activity = await models.Activity.findOne({
        _id: activityId,
        experienceId,
    });
    if (!activity)
        return {
            isSuccess: false,
            message: 'Activity not found or unauthorized',
        };

    const oldOrder = activity.order;
    if (newOrder !== undefined && newOrder !== oldOrder) {
        if (newOrder > oldOrder) {
            await models.Activity.updateMany(
                { experienceId, order: { $gt: oldOrder, $lte: newOrder } },
                { $inc: { order: -1 } },
            );
        } else {
            await models.Activity.updateMany(
                { experienceId, order: { $gte: newOrder, $lt: oldOrder } },
                { $inc: { order: 1 } },
            );
        }
        activity.order = newOrder;
    }

    Object.assign(activity, updateFields);
    await activity.save();

    return { isSuccess: true, message: 'Activity updated.' };
});

const DeleteAsync = errorHandler(async function ActivityService_DeleteAsync(data) {
    const { activityId } = data;

    const experienceId = (await GetByIdAsync(activityId)).activity.experienceId;
    const activity = await models.Activity.findOneAndDelete({
        _id: activityId,
        experienceId,
    });
    if (!activity)
        return {
            isSuccess: false,
            message: 'Activity not found or unauthorized',
        };

    await models.Activity.updateMany(
        { experienceId, order: { $gt: activity.order } },
        { $inc: { order: -1 } },
    );

    return { isSuccess: true, message: 'Activity deleted successfully' };
});

export default {
    CreateAsync,
    GetAllByExperienceIdAsync,
    GetByIdAsync,
    UpdateAsync,
    DeleteAsync,
};
