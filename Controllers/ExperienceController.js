import express from "express";
import experienceService from '../Services/ExperienceService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post('/create', authMiddleware, async function CreateExperience(req, res) {
    req.body.userId = req.user.userId;
    const response = await experienceService.CreateAsync(req.body);
    res.json(response);
});

router.get('/:userId', async function GetAllExperiencesByUserId(req, res) {
    const response = await experienceService.GetAllByUserIdAsync(req.params.userId);
    res.json(response);
});

router.patch('/update/:experienceId', authMiddleware, async function UpdateExperience(req, res) {
    const data = { 
        userId: req.user.userId,
        experienceId: req.params.experienceId,
        company: req.body.company,
        websiteLink: req.body.websiteLink,
        linkedinLink: req.body.linkedinLink,
        position: req.body.position,
        isCurrent: req.body.isCurrent,
        tasks: req.body.tasks,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    };
    const response = await experienceService.UpdateAsync(data);
    res.json(response);
});

router.delete('/delete/:experienceId', authMiddleware, async function DeleteExperience(req, res) {
    const data = { userId: req.user.userId, experienceId: req.params.experienceId };
    const response = await experienceService.DeleteAsync(data);
    res.json(response);
});

export default router;