import express from "express";
import auth from "../middlewares/auth.js";
import { addApplication, deleteApplication, getAllApplication } from "../controller/softwareApplicationController.js";

const router = express.Router();

router.post("/add", auth, addApplication);
router.delete("/delete/:id", auth, deleteApplication );
router.get("/getall", getAllApplication );

export default router;

