import express from "express";
import activityService from '../Services/ActivityService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post('/create/:experienceId', authMiddleware, async function CreateActivity(req, res) {
    const data = { 
        experienceId: req.params.experienceId
    };

    // Dynamically add all req.body properties except for experienceId
    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await activityService.CreateAsync(data);
    res.json(response);
});


router.get('/:experienceId', async function GetActivitiesByExperienceId(req, res) {
    const response = await activityService.GetAllByExperienceIdAsync(req.params.experienceId);
    res.json(response);
});


router.patch('/update/:activityId', authMiddleware, async function UpdateActivity(req, res) {
    const data = { 
        activityId: req.params.activityId
    };

    // Dynamically add all req.body properties except for activityId
    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await activityService.UpdateAsync(data);
    res.json(response);
});


router.delete('/delete/:activityId', authMiddleware, async function DeleteActivity(req, res) {
    const data = { 
        activityId: req.params.activityId 
    };
    const response = await activityService.DeleteAsync(data);
    res.json(response);
});


export default router;