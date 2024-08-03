import express from 'express';
import connectDB from './db/connectDB.js';
import { APP_PORT, DASHBOARD_URL, JWT_KEY, PORTFOLIO_URL } from './config/index.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cloudinary from './config/cloudinaryConfig.js';
import errorHandler from './middlewares/errorHandlers.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoutes.js'
import timelineRoutes from './routes/timelineRoutes.js'
import softwareApplicationRoutes from './routes/softwareApplicationRoutes.js'

const app = express();


const port = APP_PORT || 3000;

app.use(express.json());
app.use(cookieParser(JWT_KEY));
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
        origin: [PORTFOLIO_URL, DASHBOARD_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credential: true
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    })
);

// ROUTES

app.use('/api/message', messageRoutes)
app.use('/api/user', userRoutes)
app.use('/api/timeline', timelineRoutes)
app.use('/api/application', softwareApplicationRoutes)

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
