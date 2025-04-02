import { models } from '../data/db.js';
import { errorHandler } from '../utilities/ErrorHandler.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import contactService from './ContactService.js';
import educationService from './EducationService.js';
import experienceService from './ExperienceService.js';
import projectService from './ProjectService.js';
import skillService from './SkillService.js';


const SignUpAsync = errorHandler(async function UserService_SignUpAsync(data) {
    const { password, ...creationFields } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new models.User({
        ...creationFields,
        passwordHash: hashedPassword,
        emailPasswordHash: hashedEmailPassword,
    });
    await user.save();
    return { isSuccess: true, message: "Signed up."};
});


const SignInAsync = errorHandler(async function UserService_SignInAsync(data) {
    const user = await models.User.findOne({ userName: data.userName });
    if (!user) return { isSuccess: false, message: "Invalid userName." };

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) return { isSuccess: false, message: "Invalid password." };

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SIGNATURE,
        { expiresIn: "1h" }
    );

    return { isSuccess: true, message: "Signed in.", jwt: token };
});


const AuthorizeAsync = errorHandler(async function UserService_AuthorizeAsync(data) {
    return { isSuccess: true, message: "User authorized." };
});


const GetAllAsync = errorHandler(async function UserService_GetAllAsync() {
    const users = await models.User.find();
    return { isSuccess: true, message: "All users read.", users };
});


const GetByIdAsync = errorHandler(async function UserService_GetByIdAsync(userId) {
    const user = await models.User.findById(userId);
    if (!user) return { isSuccess: false, message: "User not found." };
    const contactsResponse = await contactService.GetAllByUserIdAsync(user._id);
    const educationsResponse = await educationService.GetAllByUserIdAsync(user._id);
    const experiencesResponse = await experienceService.GetAllByUserIdAsync(user._id);
    const projectsResponse = await projectService.GetAllByUserIdAsync(user._id);
    const skillsResponse = await skillService.GetAllByUserIdAsync(user._id);
    const birthdate = new Date(user.dateOfBirth);
    user.age = new Date().getFullYear() - birthdate.getFullYear();
    return { 
        isSuccess: true, 
        message: "User read for given userId.", 
        user: {
            ...user.toObject(),
            contacts: contactsResponse.contacts,
            educations: educationsResponse.educations,
            experiences: experiencesResponse.experiences,
            projects: projectsResponse.projects,
            skills: skillsResponse.skills
        }
    };
});


const UpdateAsync = errorHandler(async function UserService_UpdateAsync(data) {
    const { id, password, ...updateFields } = data;

    if (password) updateFields.passwordHash = await bcrypt.hash(password, 10);

    const updatedUser = await models.User.findOneAndUpdate(
        { _id: id },
        { $set: updateFields },
        { new: true }
    );

    if (!updatedUser) return { isSuccess: false, message: "User not found." };
    return { isSuccess: true, message: "User updated." };
});


export default {
    SignUpAsync,
    SignInAsync,
    AuthorizeAsync,
    GetAllAsync,
    GetByIdAsync,
    UpdateAsync,
}