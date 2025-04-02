import express from "express";
import userService from '../Services/UserService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post('/signup', async function SignUp(req, res) {
    const response = await userService.SignUpAsync(req.body);
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
    req.body.id = req.user.userId;
    const response = await userService.UpdateAsync(req.body);
    res.json(response);
});


export default router;