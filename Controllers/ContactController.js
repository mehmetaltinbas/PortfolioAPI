import express from "express";
import contactService from '../Services/ContactService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post('/create', authMiddleware, async function CreateContact(req, res) {
    req.body.userId = req.user.userId;
    const creationResponse = await contactService.CreateAsync(req.body);
    res.json(creationResponse);
});


router.get('/:userId', async function GetAllContactsByUserId(req, res) {
    const contacts = await contactService.GetAllByUserIdAsync(req.params.userId);
    res.json(contacts);
});


router.patch('/update/:contactId', authMiddleware, async function UpdateContact(req, res) {
    const data = { 
        userId: req.user.userId, 
        contactId: req.params.contactId, 
        type: req.body.type, 
        value: req.body.value 
    };
    const updateResponse = await contactService.UpdateAsync(data);
    res.json(updateResponse);
});


router.delete('/delete/:contactId', authMiddleware, async function DeleteContact(req, res) {
    const data = { userId: req.user.userId, contactId: req.params.contactId };
    const deleteResponse = await contactService.DeleteAsync(data);
    res.json(deleteResponse);
});


export default router;