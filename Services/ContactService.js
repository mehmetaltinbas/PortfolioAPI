import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';
import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})


const CreateAsync = errorHandler(async function ContactService_CreateAsync(data) {
    const contact = new models.Contact(data);
    await contact.save();
    return { isSuccess: true, message: "Contact created successfully" };
});


const GetAllByUserIdAsync = errorHandler(async function ContactService_GetAllByUserIdAsync(userId) {
    const contacts = await models.Contact.find({ userId });
    return { isSuccess: true, message: "Contacts associated with given userId read.", contacts };
});


const UpdateAsync = errorHandler(async function ContactService_UpdateAsync(data) {
    const { userId, contactId, ...updateFields } = data;
    const updatedContact = await models.Contact.findOneAndUpdate(
        { _id: contactId, userId },
        { $set: updateFields },
        { new: true }
    );

    if (!updatedContact) return { isSuccess: false, message: "Contact not found or unauthorized" };
    return { isSuccess: true, message: "Contact updated." };
});


const DeleteAsync = errorHandler(async function ContactService_DeleteAsync(data) {
    const { userId, contactId } = data;
    const deletedContact = await models.Contact.findOneAndDelete({ _id: contactId, userId });

    if (!deletedContact) return { isSuccess: false, message: "Contact not found or unauthorized" };
    return { isSuccess: true, message: "Contact deleted successfully" };
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

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully --> ', info.response);
            return { isSuccess: true, message: "Email sent successfully." };
        } catch (error) {
            console.error("Error --> ", error);
            return { isSuccess: false, message: "Email couldn't send." };
        }
});


export default {
    CreateAsync,
    GetAllByUserIdAsync,
    UpdateAsync,
    DeleteAsync,
    SendMailAsync,
}