import express from "express";
import experienceService from '../Services/ExperienceService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post('/create', authMiddleware, async function CreateExperience(req, res) {
    const data = { 
        userId: req.user.userId
    };

    // Dynamically add all req.body properties except for userId
    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await experienceService.CreateAsync(data);
    res.json(response);
});


router.get('/:userId', async function GetAllExperiencesByUserId(req, res) {
    const response = await experienceService.GetAllByUserIdAsync(req.params.userId);
    res.json(response);
});


router.patch('/update/:experienceId', authMiddleware, async function UpdateExperience(req, res) {
    const data = { 
        userId: req.user.userId,
        experienceId: req.params.experienceId
    };

    // Dynamically add all req.body properties
    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await experienceService.UpdateAsync(data);
    res.json(response);
});


router.delete('/delete/:experienceId', authMiddleware, async function DeleteExperience(req, res) {
    const data = { userId: req.user.userId, experienceId: req.params.experienceId };
    const response = await experienceService.DeleteAsync(data);
    res.json(response);
});


export default router;