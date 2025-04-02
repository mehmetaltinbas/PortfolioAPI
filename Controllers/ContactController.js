import express from "express";
import contactService from '../Services/ContactService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post('/create', authMiddleware, async function CreateContact(req, res) {
    req.body.userId = req.user.userId;
    const response = await contactService.CreateAsync(req.body);
    res.json(response);
});


router.get('/:userId', async function GetAllContactsByUserId(req, res) {
    const response = await contactService.GetAllByUserIdAsync(req.params.userId);
    res.json(response);
});


router.patch('/update/:contactId', authMiddleware, async function UpdateContact(req, res) {
    const data = { 
        userId: req.user.userId, 
        contactId: req.params.contactId, 
        type: req.body.type, 
        value: req.body.value 
    };
    const response = await contactService.UpdateAsync(data);
    res.json(response);
});


router.delete('/delete/:contactId', authMiddleware, async function DeleteContact(req, res) {
    const data = { userId: req.user.userId, contactId: req.params.contactId };
    const response = await contactService.DeleteAsync(data);
    res.json(response);
});


router.post('/sendmail', async function SendMail(req, res) {
    const response = await contactService.SendMailAsync(req.body);
    res.json(response);
});


export default router;