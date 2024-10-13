import  { Router } from "express";
import { studentGrades } from "../controllers/studentController";
import { authMiddleware } from "../middleware/authMiddleware";

const studentsRouter = Router();
studentsRouter.get("/student/grades",authMiddleware, studentGrades);


export default studentsRouter