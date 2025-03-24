import express from "express";
import userService from '../Services/UserService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post('/signup', async function SignUp(req, res) {
    const signUpResponse = await userService.SignUpAsync(req.body);
    res.json(signUpResponse);
});


router.post('/signin', async function SignIn(req, res) {
    const signInResponse = await userService.SignInAsync(req.body);
    res.json(signInResponse);
});


router.get('/authorize', authMiddleware, async function AuthorizeUser(req, res) {
    const authorizationResponse = await userService.AuthorizeAsync();
    res.json(authorizationResponse);
});


router.get("/", async function GetAllUsers(req, res) {
    const usersResponse = await userService.GetAllAsync();
    res.json(usersResponse);
});


router.get("/:userId", async function GetUserById(req, res) {
    const userResponse = await userService.GetByIdAsync(req.params.userId);
    res.json(userResponse);
});


router.patch('/update', authMiddleware, async function UpdateUser(req, res) {
    req.body.id = req.user.userId;
    const updateResponse = await userService.UpdateAsync(req.body);
    res.json(updateResponse);
});


export default router;