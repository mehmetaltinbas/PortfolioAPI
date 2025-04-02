import express from "express";
import contactService from '../Services/ContactService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();


router.post('/create', authMiddleware, async function CreateContact(req, res) {
    const data = { 
        userId: req.user.userId
    };

    // Dynamically add all req.body properties except for userId
    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

    const response = await contactService.CreateAsync(data);
    res.json(response);
});


router.get('/:userId', async function GetAllContactsByUserId(req, res) {
    const response = await contactService.GetAllByUserIdAsync(req.params.userId);
    res.json(response);
});


router.patch('/update/:contactId', authMiddleware, async function UpdateContact(req, res) {
    const data = { 
        userId: req.user.userId,
        contactId: req.params.contactId
    };

    // Dynamically add all req.body properties except for userId and contactId
    Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    });

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