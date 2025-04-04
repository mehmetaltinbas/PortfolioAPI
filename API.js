import express from 'express';
import dotenv from "dotenv";
import { connectDb } from './data/db.js';
import fs from 'fs/promises';
import cors from 'cors';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import axios from 'axios';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static('uploads'));

async function loadControllers() {
    try {
        const files = await fs.readdir("./Controllers");
        console.log("\n\tLoaded Controllers");
        for (const file of files) {
            const route = file.replace("Controller.js", "").toLowerCase();
            const controller = await import(`./Controllers/${file}`);
            console.log(`/api/${route}`);
            app.use(`/api/${route}`, controller.default);
        }
        console.log("");
    } catch (err) {
        console.error("Error loading controllers:", err);
    }
}

(async () => {
    await connectDb();
    await loadControllers();
    
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
})();