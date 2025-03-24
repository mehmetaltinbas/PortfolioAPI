import express from "express";
import experienceService from '../Services/ExperienceService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post('/create', authMiddleware, async function CreateExperience(req, res) {
    req.body.userId = req.user.userId;
    const creationResponse = await experienceService.CreateAsync(req.body);
    res.json(creationResponse);
});

router.get('/:userId', async function GetAllExperiencesByUserId(req, res) {
    const experiences = await experienceService.GetAllByUserIdAsync(req.params.userId);
    res.json(experiences);
});

router.patch('/update/:experienceId', authMiddleware, async function UpdateExperience(req, res) {
    const data = { 
        userId: req.user.userId, 
        experienceId: req.params.experienceId, 
        company: req.body.company, 
        position: req.body.position, 
        isCurrent: req.body.isCurrent,
        startDate: req.body.startDate, 
        endDate: req.body.endDate 
    };
    const updateResponse = await experienceService.UpdateAsync(data);
    res.json(updateResponse);
});

router.delete('/delete/:experienceId', authMiddleware, async function DeleteExperience(req, res) {
    const data = { userId: req.user.userId, experienceId: req.params.experienceId };
    const deleteResponse = await experienceService.DeleteAsync(data);
    res.json(deleteResponse);
});

export default router;