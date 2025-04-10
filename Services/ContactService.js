import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const CreateAsync = errorHandler(async function ContactService_CreateAsync(data) {
    const contact = new models.Contact(data);
    await contact.save();
    return { isSuccess: true, message: 'Contact created successfully' };
});

const GetAllByUserIdAsync = errorHandler(
    async function ContactService_GetAllByUserIdAsync(userId) {
        const contacts = await models.Contact.find({ userId });
        return {
            isSuccess: true,
            message: 'Contacts associated with given userId read.',
            contacts,
        };
    },
);

const UpdateAsync = errorHandler(async function ContactService_UpdateAsync(data) {
    const { userId, contactId, ...updateFields } = data;
    const updatedContact = await models.Contact.findOneAndUpdate(
        { _id: contactId, userId },
        { $set: updateFields },
        { new: true },
    );

    if (!updatedContact)
        return {
            isSuccess: false,
            message: 'Contact not found or unauthorized',
        };
    return { isSuccess: true, message: 'Contact updated.' };
});

const DeleteAsync = errorHandler(async function ContactService_DeleteAsync(data) {
    const { userId, contactId } = data;
    const deletedContact = await models.Contact.findOneAndDelete({
        _id: contactId,
        userId,
    });

    if (!deletedContact)
        return {
            isSuccess: false,
            message: 'Contact not found or unauthorized',
        };
    return { isSuccess: true, message: 'Contact deleted successfully' };
});

const SendMailAsync = errorHandler(async function ContactService_SendMailAsync(data) {
    const mailOptions = {
        from: data.email,
        to: process.env.EMAIL,
        subject: 'Portfolio Website Contact',
        text: `
            Name: ${data.name}
            E-mail: ${data.email}
            Message: ${data.message}
        `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully --> ', info.response);
    return { isSuccess: true, message: 'Email sent successfully.' };
});

const GetCVPathByUserIdAsync = errorHandler(
    async function ContactService_GetCVPathByUserIdAsync(userId) {
        const contacts = await models.Contact.find({ userId }).lean();
        const cvContact = contacts.find((contact) => contact.type == 'cv');
        return `uploads/user/cv/${cvContact.value}`;
    },
);

const UpdateCVAsync = errorHandler(async function ContactService_UpdateCVAsync(data) {
    if (!data.value) return { isSuccess: true, message: 'No File provided.' };
    const contacts = await models.Contact.find({
        userId: data.userId,
    }).lean();
    const cvContact = contacts.find((contact) => contact.type == 'cv');
    console.log(cvContact);
    if (!cvContact) {
        const contact = new models.Contact(data);
        await contact.save();
        return { isSuccess: true, message: 'CV updated successfully.0' };
    }
    const filePath = path.join(process.cwd(), `uploads/user/cv/${cvContact.value}`);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    const updatedCVContact = await models.Contact.findOneAndUpdate(
        { _id: cvContact._id, userId: data.userId },
        { $set: { value: data.value } },
        { new: true },
    );
    if (!updatedCVContact) return { isSuccess: false, message: "CV couldn't updated." };
    return { isSuccess: true, message: 'CV updated successfully.1' };
});

export default {
    CreateAsync,
    GetAllByUserIdAsync,
    UpdateAsync,
    DeleteAsync,
    SendMailAsync,
    GetCVPathByUserIdAsync,
    UpdateCVAsync,
};
