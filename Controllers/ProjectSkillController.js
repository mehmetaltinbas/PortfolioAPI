import express from "express";
import projectSkillService from "../Services/ProjectSkillService.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post("/create/:projectId", authMiddleware, async (req, res) => {
    const data = { projectId: req.params.projectId };
    
    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await projectSkillService.CreateAsync(data);
    res.json(response);
});


router.get("/:projectId", async (req, res) => {
    const response = await projectSkillService.GetAllByProjectIdAsync(req.params.projectId);
    res.json(response);
});


router.patch("/update/:projectSkillId", authMiddleware, async (req, res) => {
    const data = { projectSkillId: req.params.projectSkillId };
    
    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await projectSkillService.UpdateAsync(data);
    res.json(response);
});


router.delete("/delete/:projectSkillId", authMiddleware, async (req, res) => {
    const data = { projectSkillId: req.params.projectSkillId };
    const response = await projectSkillService.DeleteAsync(data);
    res.json(response);
});


export default router;