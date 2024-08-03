import { config } from "dotenv";
config();
export const {
    APP_PORT,
    MONGO_URI,
    PORTFOLIO_URL,
    DASHBOARD_URL,
    JWT_KEY,
    JWT_EXPIRES,
    COOKIE_EXPIRES,
    CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_SECRET,
    DEBUG_MODE,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SERVICE,
    SMTP_MAIL,
    SMTP_PASSWORD,
} = process.env;