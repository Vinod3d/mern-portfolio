import express from "express";
import auth from "../middlewares/auth.js";
import { addProject, deleteProject, getAllProject, getSingleProject, updateProject } from "../controller/projectController.js";

const router = express.Router();

router.post("/add", auth, addProject);
router.delete("/delete/:id", auth, deleteProject );
router.put("/update/:id", auth, updateProject );
router.get("/getall", getAllProject );
router.get("/get/:id", getSingleProject );

export default router;

