import express from "express";
import projectService from '../Services/ProjectService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post('/create', authMiddleware, async function CreateProject(req, res) {
    req.body.userId = req.user.userId;
    const creationResponse = await projectService.CreateAsync(req.body);
    res.json(creationResponse);
});


router.get('/:userId', async function GetAllProjectsByUserId(req, res) {
    const projects = await projectService.GetAllByUserIdAsync(req.params.userId);
    res.json(projects);
});


router.patch('/update/:projectId', authMiddleware, async function UpdateProject(req, res) {
    const data = { 
        userId: req.user.userId, 
        projectId: req.params.projectId, 
        title: req.body.title, 
        description: req.body.description, 
        repositoryLinks: req.body.repositoryLinks, 
        liveDemoLink: req.body.liveDemoLink, 
        technologies: req.body.technologies 
    };
    const updateResponse = await projectService.UpdateAsync(data);
    res.json(updateResponse);
});


router.delete('/delete/:projectId', authMiddleware, async function DeleteProject(req, res) {
    const data = { userId: req.user.userId, projectId: req.params.projectId };
    const deleteResponse = await projectService.DeleteAsync(data);
    res.json(deleteResponse);
});


export default router;