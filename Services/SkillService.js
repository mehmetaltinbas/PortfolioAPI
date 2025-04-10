import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';


const CreateAsync = errorHandler(async function SkillService_CreateAsync(data) {
    const skill = new models.Skill(data);
    await skill.save();
    return { isSuccess: true, message: "Skill created successfully" };
});


const GetAllByUserIdAsync = errorHandler(async function SkillService_GetAllByUserIdAsync(userId) {
    const skills = await models.Skill.find({ userId });
    return { isSuccess: true, message: "Skills associated with given userId read.", skills };
});


const UpdateAsync = errorHandler(async function SkillService_UpdateAsync(data) {
    const { userId, skillId, ...updateFields } = data;
    const updatedSkill = await models.Skill.findOneAndUpdate(
        { _id: skillId, userId },
        { $set: updateFields },
        { new: true }
    );

    if (!updatedSkill) return { isSuccess: false, message: "Skill not found or unauthorized" };
    return { isSuccess: true, message: "Skill updated." };
});


const DeleteAsync = errorHandler(async function SkillService_DeleteAsync(data) {
    const { userId, skillId } = data;
    const deletedSkill = await models.Skill.findOneAndDelete({ _id: skillId, userId });

    if (!deletedSkill) return { isSuccess: false, message: "Skill not found or unauthorized" };
    return { isSuccess: true, message: "Skill deleted successfully" };
});


export default {
    CreateAsync,
    GetAllByUserIdAsync,
    UpdateAsync,
    DeleteAsync,
};