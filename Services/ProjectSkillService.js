import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';


const CreateAsync = errorHandler(async function ProjectSkillService_CreateAsync(data) {
    const projectSkill = new models.ProjectSkill(data);
    await projectSkill.save();
    return { isSuccess: true, message: "Project skill created successfully" };
});


const GetAllByProjectIdAsync = errorHandler(async function ProjectSkillService_GetAllByProjectIdAsync(projectId) {
    const projectSkills = await models.ProjectSkill.find({ projectId });
    return { isSuccess: true, message: "Project skills associated with given projectId read.", projectSkills };
});


const UpdateAsync = errorHandler(async function ProjectSkillService_UpdateAsync(data) {
    const { projectId, projectSkillId, ...updateFields } = data;
    const updatedProjectSkill = await models.ProjectSkill.findOneAndUpdate(
        { _id: projectSkillId, projectId },
        { $set: updateFields },
        { new: true }
    );

    if (!updatedProjectSkill) return { isSuccess: false, message: "Project skill not found or unauthorized" };
    return { isSuccess: true, message: "Project skill updated." };
});


const DeleteAsync = errorHandler(async function ProjectSkillService_DeleteAsync(data) {
    const { projectId, projectSkillId } = data;
    const deletedProjectSkill = await models.ProjectSkill.findOneAndDelete({ _id: projectSkillId, projectId });

    if (!deletedProjectSkill) return { isSuccess: false, message: "Project skill not found or unauthorized" };
    return { isSuccess: true, message: "Project skill deleted successfully" };
});


export default {
    CreateAsync,
    GetAllByProjectIdAsync,
    UpdateAsync,
    DeleteAsync,
};