import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';
import projectSkillService from './ProjectSkillService.js';
import projectLinkService from './ProjectLinkService.js';


const CreateAsync = errorHandler(async function ProjectService_CreateAsync(data) {
    const project = new models.Project(data);
    await project.save();
    return { isSuccess: true, message: "Project created successfully" };
});


const GetAllByUserIdAsync = errorHandler(async function ProjectService_GetAllByUserIdAsync(userId) {
    const projects = await models.Project.find({ userId }).lean();
    await Promise.all(projects.map(async (project) => {
        const projectLinksResponse = await projectLinkService.GetAllByProjectIdAsync(project._id);
        project.projectLinks = projectLinksResponse.projectLinks;
        const projectSkillsResponse = await projectSkillService.GetAllByProjectIdAsync(project._id);
        project.projectSkills = projectSkillsResponse.projectSkills;
    }));
    return { isSuccess: true, message: "Projects associated with given userId read.", projects };
});


const UpdateAsync = errorHandler(async function ProjectService_UpdateAsync(data) {
    const { userId, projectId, ...updateFields } = data;
    const updatedProject = await models.Project.findOneAndUpdate(
        { _id: projectId, userId },
        { $set: updateFields },
        { new: true }
    );

    if (!updatedProject) return { isSuccess: false, message: "Project not found or unauthorized" };
    return { isSuccess: true, message: "Project updated." };
});


const DeleteAsync = errorHandler(async function ProjectService_DeleteAsync(data) {
    const { userId, projectId } = data;
    const deletedProject = await models.Project.findOneAndDelete({ _id: projectId, userId });

    if (!deletedProject) return { isSuccess: false, message: "Project not found or unauthorized" };
    return { isSuccess: true, message: "Project deleted successfully" };
});


export default {
    CreateAsync,
    GetAllByUserIdAsync,
    UpdateAsync,
    DeleteAsync,
};