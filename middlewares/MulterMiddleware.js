import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsFolderPath = path.join(__dirname, "../uploads/");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsFolderPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Set file size limit to 10MB
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export default {
    uploadsFolderPath,
    upload,
};