import express from "express";
import educationService from '../Services/EducationService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post('/create', authMiddleware, async function CreateEducation(req, res) {
    req.body.userId = req.user.userId;
    const response = await educationService.CreateAsync(req.body);
    res.json(response);
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
        fieldOfStudy: req.body.fieldOfStudy,
        websiteLink: req.body.websiteLink,
        description: req.body.description, 
        isCurrent: req.body.isCurrent,
        startDate: req.body.startDate, 
        endDate: req.body.endDate 
    };
    const response = await educationService.UpdateAsync(data);
    res.json(response);
});


router.delete('/delete/:educationId', authMiddleware, async function DeleteEducation(req, res) {
    const data = { userId: req.user.userId, educationId: req.params.educationId };
    const response = await educationService.DeleteAsync(data);
    res.json(response);
});


export default router;