import express from "express";
import userPhotoService from "../Services/UserPhotoService.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import multerMiddleware from "../middlewares/MulterMiddleware.js";

const router = express.Router();

router.post("/create/:userId", authMiddleware, (req, res, next) => {
    req.uploadFolder = 'user/photo',
    next();
}, multerMiddleware.upload.single('file'), async function CreateUserPhoto(req, res) {
    const data = {
        userId: req.params.userId,
        value: req.file.filename
    };

    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await userPhotoService.CreateAsync(data);
    res.json(response);
});

router.get("/:userId", async function GetAllUserPhotosByUserId(req, res) {
    const response = await userPhotoService.GetAllByUserIdAsync(req.params.userId);
    res.json(response);
});

router.patch("/update/:userPhotoId", authMiddleware, async function UpdateUserPhoto(req, res) {
    const data = { userPhotoId: req.params.userPhotoId };

    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await userPhotoService.UpdateAsync(data);
    res.json(response);
});

router.delete("/delete/:userPhotoId", authMiddleware, async function DeleteUserPhoto(req, res) {
    const data = { userPhotoId: req.params.userPhotoId };
    const response = await userPhotoService.DeleteAsync(data);
    res.json(response);
});

export default router;