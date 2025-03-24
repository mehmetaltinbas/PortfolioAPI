import express from "express";
import educationService from '../Services/EducationService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post('/create', authMiddleware, async function CreateEducation(req, res) {
    req.body.userId = req.user.userId;
    const creationResponse = await educationService.CreateAsync(req.body);
    res.json(creationResponse);
});


router.get('/:userId', async function GetAllEducationByUserId(req, res) {
    const educationRecords = await educationService.GetAllByUserIdAsync(req.params.userId);
    res.json(educationRecords);
});


router.patch('/update/:educationId', authMiddleware, async function UpdateEducation(req, res) {
    const data = { 
        userId: req.user.userId, 
        educationId: req.params.educationId, 
        school: req.body.school, 
        degree: req.body.degree, 
        description: req.body.description, 
        isCurrent: req.body.isCurrent,
        startDate: req.body.startDate, 
        endDate: req.body.endDate 
    };
    const updateResponse = await educationService.UpdateAsync(data);
    res.json(updateResponse);
});


router.delete('/delete/:educationId', authMiddleware, async function DeleteEducation(req, res) {
    const data = { userId: req.user.userId, educationId: req.params.educationId };
    const deleteResponse = await educationService.DeleteAsync(data);
    res.json(deleteResponse);
});


export default router;