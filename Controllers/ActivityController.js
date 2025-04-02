import express from "express";
import activityService from '../Services/ActivityService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post('/create/:experienceId', authMiddleware, async function CreateActivity(req, res) {
    const data = {
        experienceId: req.params.experienceId,
        activity: req.body.activity,
        order: req.body.order
    };
    const response = await activityService.CreateAsync(data);
    res.json(response);
});


router.get('/:experienceId', async function GetActivitiesByExperienceId(req, res) {
    const response = await activityService.GetAllByExperienceIdAsync(req.params.experienceId);
    res.json(response);
});


router.patch('/update/:activityId', authMiddleware, async function UpdateActivity(req, res) {
    const data = {
        activityId: req.params.activityId,
        experienceId: req.body.experienceId,
        activity: req.body.activity,
        order: req.body.order
    };
    const response = await activityService.UpdateAsync(data);
    res.json(response);
});


router.delete('/delete/:activityId', authMiddleware, async function DeleteActivity(req, res) {
    const data = { activityId: req.params.activityId };
    const response = await activityService.DeleteAsync(data);
    res.json(response);
});


export default router;
