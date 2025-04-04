import express from "express";
import skillService from '../Services/SkillService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post('/create', authMiddleware, async function CreateSkill(req, res) {
    const data = { 
        userId: req.user.userId
    };

    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await skillService.CreateAsync(data);
    res.json(response);
});


router.get('/:userId', async function GetAllSkillsByUserId(req, res) {
    const response = await skillService.GetAllByUserIdAsync(req.params.userId);
    res.json(response);
});


router.patch('/update/:skillId', authMiddleware, async function UpdateSkill(req, res) {
    const data = { 
        userId: req.user.userId,
        skillId: req.params.skillId
    };

    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await skillService.UpdateAsync(data);
    res.json(response);
});


router.delete('/delete/:skillId', authMiddleware, async function DeleteSkill(req, res) {
    const data = { userId: req.user.userId, skillId: req.params.skillId };
    const response = await skillService.DeleteAsync(data);
    res.json(response);
});


export default router;