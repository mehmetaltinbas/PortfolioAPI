import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';


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


export default {
    CreateAsync,
    GetAllByUserIdAsync,
    UpdateAsync,
    DeleteAsync,

}