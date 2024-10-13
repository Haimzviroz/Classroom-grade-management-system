import  { Router } from "express";
import { addGradeForStudent, gettAllStudents } from "../controllers/teacherController";
import { authMiddleware } from "../middleware/authMiddleware";

const teacherRouter = Router();
teacherRouter.post("/teacher/addGrade",authMiddleware, addGradeForStudent);
teacherRouter.get("/teacher/getAllStudents",authMiddleware, gettAllStudents);


export default teacherRouter