import express from "express";
import projectLinkService from "../Services/ProjectLinkService.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post("/create/:projectId", authMiddleware, async function CreateProjectLink(req, res) {
    const data = { projectId: req.params.projectId };
    
    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await projectLinkService.CreateAsync(data);
    res.json(response);
});


router.get("/:projectId", async function GetAllProjectLinksByProjectId(req, res) {
    const response = await projectLinkService.GetAllByProjectIdAsync(req.params.projectId);
    res.json(response);
});


router.patch("/update/:projectLinkId", authMiddleware, async function UpdateProjectLink(req, res) {
    const data = { projectLinkId: req.params.projectLinkId };
    
    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await projectLinkService.UpdateAsync(data);
    res.json(response);
});


router.delete("/delete/:projectLinkId", authMiddleware, async function DeleteProjectLink(req, res) {
    const data = { projectLinkId: req.params.projectLinkId };
    const response = await projectLinkService.DeleteAsync(data);
    res.json(response);
});


export default router;