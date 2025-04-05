import express from "express";
import userService from '../Services/UserService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";
import multerMiddleware from "../middlewares/MulterMiddleware.js";

const router = express.Router();


router.get('/keepalive', async function KeepAlive(req, res) {
    const response = { isSuccess: true, message: "kept alive" };
    res.json(response);
});


router.post('/signup', async function SignUp(req, res) {
    const data = { 
        ...req.body
    };

    const response = await userService.SignUpAsync(data);
    res.json(response);
});


router.post('/signin', async function SignIn(req, res) {
    const response = await userService.SignInAsync(req.body);
    if (!response.isSuccess) return res.json(response);

    res.cookie('jwt', response.jwt, {
        httpOnly: true,
        secure: process.env.IS_COOKIE_SECURE,
        sameSite: process.env.COOKIE_SAME_SITE_MODE,
        maxAge: 3600000
    });
    
    res.json(response);
});


router.get('/authorize', authMiddleware, async function AuthorizeUser(req, res) {
    const response = await userService.AuthorizeAsync();
    res.json(response);
});


router.get("/", async function GetAllUsers(req, res) {
    const response = await userService.GetAllAsync();
    res.json(response);
});


router.get("/:userId", async function GetUserById(req, res) {
    const response = await userService.GetByIdAsync(req.params.userId);
    res.json(response);
});


router.patch('/update', authMiddleware, async function UpdateUser(req, res) {
    const data = { 
        userId: req.user.userId
    };

    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await userService.UpdateAsync(data);
    res.json(response);
});


router.patch('/update/profilephoto', authMiddleware, multerMiddleware.upload.single("file"), async function UpdatePhoto(req, res) {
    const data = {
        userId: req.user.userId,
        file: req.file,
    };
    const response = await userService.UpdateProfilePhotoAsync(data);
    res.json(response);
});


router.delete('/delete/profilephoto', authMiddleware, async function UpdatePhoto(req, res) {
    const response = await userService.DeleteProfilePhotoAsync(req.user.userId);
    res.json(response);
});


router.patch('/update/aboutmephoto', authMiddleware, multerMiddleware.upload.single("file"), async function UpdatePhoto(req, res) {
    const data = {
        userId: req.user.userId,
        file: req.file
    };
    const response = await userService.UpdateAboutMePhotoAsync(data);
    res.json(response);
});


router.delete('/delete/aboutmephoto', authMiddleware, async function UpdatePhoto(req, res) {
    const response = await userService.DeleteAboutMePhotoAsync(req.user.userId);
    res.json(response);
});


export default router;