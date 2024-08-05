import express from "express";
import auth from "../middlewares/auth.js";
import { addSkill, deleteSkill, getAllSkill, updateSkill } from "../controller/skillController.js";

const router = express.Router();

router.post("/add", auth, addSkill);
router.delete("/delete/:id", auth, deleteSkill );
router.put("/update/:id", auth, updateSkill );
router.get("/getall", getAllSkill );

export default router;

