import express from "express";
import projectService from '../Services/ProjectService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post('/create', authMiddleware, async function CreateProject(req, res) {
    req.body.userId = req.user.userId;
    const response = await projectService.CreateAsync(req.body);
    res.json(response);
});


router.get('/getallbyuserid/:userId', async function GetAllProjectsByUserId(req, res) {
    const response = await projectService.GetAllByUserIdAsync(req.params.userId);
    res.json(response);
});


router.patch('/update/:projectId', authMiddleware, async function UpdateProject(req, res) {
    const data = { 
        userId: req.user.userId, 
        projectId: req.params.projectId, 
        title: req.body.title, 
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription, 
        repositoryLinks: req.body.repositoryLinks, 
        liveDemoLink: req.body.liveDemoLink, 
        technologies: req.body.technologies 
    };
    const response = await projectService.UpdateAsync(data);
    res.json(response);
});


router.delete('/delete/:projectId', authMiddleware, async function DeleteProject(req, res) {
    const data = { userId: req.user.userId, projectId: req.params.projectId };
    const response = await projectService.DeleteAsync(data);
    res.json(response);
});


export default router;