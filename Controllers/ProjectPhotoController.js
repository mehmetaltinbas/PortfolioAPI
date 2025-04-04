import express from "express";
import projectPhotoService from "../Services/ProjectPhotoService.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import multerMiddleware from "../middlewares/MulterMiddleware.js";

const router = express.Router();


router.post("/create/:projectId", authMiddleware, multerMiddleware.upload.single('file'), async function CreateProjectPhoto(req, res) {
    const data = { 
        projectId: req.params.projectId,
        value: req.file.filename
     };

    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await projectPhotoService.CreateAsync(data);
    res.json(response);
});


router.get("/:projectId", async function GetAllProjectPhotosByProjectId(req, res) {
    const response = await projectPhotoService.GetAllByProjectIdAsync(req.params.projectId);
    res.json(response);
});


router.patch("/update/:projectPhotoId", authMiddleware, async function UpdateProjectPhoto(req, res) {
    const data = { projectPhotoId: req.params.projectPhotoId };

    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await projectPhotoService.UpdateAsync(data);
    res.json(response);
});


router.delete("/delete/:projectPhotoId", authMiddleware, async function DeleteProjectPhoto(req, res) {
    const data = { projectPhotoId: req.params.projectPhotoId };
    const response = await projectPhotoService.DeleteAsync(data);
    res.json(response);
});


export default router;