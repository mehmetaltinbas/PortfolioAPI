import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';

const CreateAsync = errorHandler(async function ProjectLinkService_CreateAsync(data) {
    const projectLink = new models.ProjectLink(data);
    await projectLink.save();
    return { isSuccess: true, message: "Project link created successfully" };
});

const GetAllByProjectIdAsync = errorHandler(async function ProjectLinkService_GetAllByProjectIdAsync(projectId) {
    const projectLinks = await models.ProjectLink.find({ projectId });
    return { isSuccess: true, message: "Project links associated with given projectId read.", projectLinks };
});

const UpdateAsync = errorHandler(async function ProjectLinkService_UpdateAsync(data) {
    const { projectId, projectLinkId, ...updateFields } = data;
    const updatedProjectLink = await models.ProjectLink.findOneAndUpdate(
        { _id: projectLinkId, projectId },
        { $set: updateFields },
        { new: true }
    );

    if (!updatedProjectLink) return { isSuccess: false, message: "Project link not found or unauthorized" };
    return { isSuccess: true, message: "Project link updated." };
});

const DeleteAsync = errorHandler(async function ProjectLinkService_DeleteAsync(data) {
    const { projectId, projectLinkId } = data;
    const deletedProjectLink = await models.ProjectLink.findOneAndDelete({ _id: projectLinkId, projectId });

    if (!deletedProjectLink) return { isSuccess: false, message: "Project link not found or unauthorized" };
    return { isSuccess: true, message: "Project link deleted successfully" };
});

export default {
    CreateAsync,
    GetAllByProjectIdAsync,
    UpdateAsync,
    DeleteAsync,
};