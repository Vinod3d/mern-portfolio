import express from 'express';
import connectDB from './db/connectDB.js';
import { APP_PORT, DASHBOARD_URL, JWT_KEY, PORTFOLIO_URL } from './config/index.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import errorHandler from './middlewares/errorHandlers.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoutes.js'
import timelineRoutes from './routes/timelineRoutes.js'
import softwareApplicationRoutes from './routes/softwareApplicationRoutes.js'
import skillRoutes from './routes/skillRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import cloudinary from './config/cloudinaryConfig.js';
import path from 'path';

import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = APP_PORT || 3000;
app.use(express.json());
app.use(cookieParser(JWT_KEY));
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
        origin: [PORTFOLIO_URL, DASHBOARD_URL],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true
    })
);
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    })
);

// ROUTES
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/message', messageRoutes);
app.use('/api/user', userRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/application', softwareApplicationRoutes);
app.use('/api/skill', skillRoutes);
app.use('/api/project', projectRoutes);

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Health Check Route
app.get('/check', (req, res) => {
    res.send('app is running');
});
app.use(errorHandler);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running on port port`);
        });
    } catch (error) {
        console.log(error);
    }
};
start();
