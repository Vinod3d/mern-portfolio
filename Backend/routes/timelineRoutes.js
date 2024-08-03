import express from "express";
import auth from "../middlewares/auth.js";
import { postTimeline, deleteTimeline, getAllTimeline } from "../controller/timelineController.js";

const router = express.Router();

router.post("/add", auth, postTimeline);
router.delete("/delete/:id", auth, deleteTimeline );
router.get("/getall", getAllTimeline );

export default router;

