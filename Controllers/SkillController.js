import express from "express";
import skillService from '../Services/SkillService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post('/create', authMiddleware, async function CreateSkill(req, res) {
    req.body.userId = req.user.userId;
    const creationResponse = await skillService.CreateAsync(req.body);
    res.json(creationResponse);
});


router.get('/:userId', async function GetAllSkillsByUserId(req, res) {
    const skills = await skillService.GetAllByUserIdAsync(req.params.userId);
    res.json(skills);
});


router.patch('/update/:skillId', authMiddleware, async function UpdateSkill(req, res) {
    const data = { 
        userId: req.user.userId, 
        skillId: req.params.skillId, 
        name: req.body.name, 
        level: req.body.level 
    };
    const updateResponse = await skillService.UpdateAsync(data);
    res.json(updateResponse);
});


router.delete('/delete/:skillId', authMiddleware, async function DeleteSkill(req, res) {
    const data = { userId: req.user.userId, skillId: req.params.skillId };
    const deleteResponse = await skillService.DeleteAsync(data);
    res.json(deleteResponse);
});


export default router;