import { Request, Response, NextFunction } from "express";
import Teacher, { ITeacher } from "../models/teacherModel";
import { generateToken } from "../utils/auth";
import { createStudent, createTeacher } from "../services/authService";
import studentModel from "../models/studentModel";
import teacherModel from "../models/teacherModel";
import { log } from "console";
import { AuthRequest } from "../middleware/authMiddleware";

export const studentGrades = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user?.userId;
    if (!studentId) res.status(400).json({ message: "משתמש לא קיים" });
    const student = await studentModel.findById(studentId);
    if (!student) res.status(400).json({ message: "משתמש לא קיים" });
    res.status(200).json({ grades: student?.grades });
  } catch (err) {
    res.status(500).json({ message: "משתמש לא קיים" });
  }
};
