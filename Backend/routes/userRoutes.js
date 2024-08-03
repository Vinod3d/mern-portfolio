import express from "express";
import { 
    login,
    register, 
    logout, 
    getUser, 
    updateProfile, 
    updatePassword,
    getUserPortfolio,
    forgotPassword,
    resetPassword
 } from "../controller/userController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/me", auth, getUser);
router.put("/update/me", auth, updateProfile);
router.put("/update/password", auth, updatePassword);
router.get("/me/portfolio", getUserPortfolio);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

export default router;

