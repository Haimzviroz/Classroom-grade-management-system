import  { Router } from "express";
import { addGradeForStudent } from "../controllers/teacherController";
import { authMiddleware } from "../middleware/authMiddleware";

const teacherRouter = Router();
teacherRouter.post("/teacher/addGrade",authMiddleware, addGradeForStudent);


export default teacherRouter