import express from 'express';
import dotenv from "dotenv";
import { connectDb } from './data/db.js';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT;
console.log(`\n.env variables:\n
    ${process.env.PORT}\n
    ${process.env.DB_CONNECTION}
`);

app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
fs.readdir("./Controllers", (err, files) => {
    for (let i = 0; i < files.length; i++) {
        const file = files[i].replace("Controller.js", "");
        import(`./Controllers/${files[i]}`)
            .then((controller) => {
                console.log(`\nLoaded controller: /api/${file.toLowerCase()}\n`);
                app.use(`/api/${file.toLowerCase()}`, controller.default);
            })
            .catch((err) => console.error(err));
    }
});

await connectDb();

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});