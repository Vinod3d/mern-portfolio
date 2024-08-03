import { COOKIE_EXPIRES } from "../config/index.js";

export const JwtService = (user, message, statusCode, res)=>{
    const token = user.getJWTToken();
    res.status(statusCode).cookie("token", token, {
        expires: new Date(
            Date.now() + COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }).json({
        success: true,
        message,
        token,
        user
    })
}  