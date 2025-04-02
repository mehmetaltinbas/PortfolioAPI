import express from "express";
import educationService from '../Services/EducationService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post('/create', authMiddleware, async function CreateEducation(req, res) {
    const data = { 
        userId: req.user.userId
    };

    // Dynamically add all req.body properties except for userId
    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await educationService.CreateAsync(data);
    res.json(response);
});


router.get('/:userId', async function GetAllEducationByUserId(req, res) {
    const educationRecords = await educationService.GetAllByUserIdAsync(req.params.userId);
    res.json(educationRecords);
});


router.patch('/update/:educationId', authMiddleware, async function UpdateEducation(req, res) {
    const data = { 
        userId: req.user.userId,
        educationId: req.params.educationId
    };

    // Dynamically add all req.body properties except for userId and educationId
    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await educationService.UpdateAsync(data);
    res.json(response);
});


router.delete('/delete/:educationId', authMiddleware, async function DeleteEducation(req, res) {
    const data = { userId: req.user.userId, educationId: req.params.educationId };
    const response = await educationService.DeleteAsync(data);
    res.json(response);
});


export default router;