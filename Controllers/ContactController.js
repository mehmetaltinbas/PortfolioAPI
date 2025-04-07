import express from "express";
import contactService from '../Services/ContactService.js';
import authMiddleware from "../middlewares/AuthMiddleware.js";
import multerMiddleware from '../middlewares/MulterMiddleware.js';
import fs from 'fs';

const router = express.Router();


router.post('/create', authMiddleware, async function CreateContact(req, res) {
    const data = { 
        userId: req.user.userId
    };

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
    console.log("hit");
    const data = { 
        userId: req.user.userId,
        contactId: req.params.contactId
    };

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


router.get('/cv/download', authMiddleware, async function DownloadCV(req, res) {
    const userId = req.user.userId;

    const filePath = await contactService.GetCVPathByUserIdAsync(userId);
    console.log(filePath);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'CV not found' });
    }

    res.download(filePath, 'cv.pdf');
});


router.patch('/cv/update', authMiddleware, (req, res, next) => {
    req.uploadFolder = 'user/cv',
    next();
}, multerMiddleware.upload.single("file"), async function UpdateCV(req, res) {
    const data = { 
        userId: req.user.userId,
        type: 'cv',
        value: req.file?.filename,
    };

    const response = await contactService.UpdateCVAsync(data);
    res.json(response);
});


export default router;