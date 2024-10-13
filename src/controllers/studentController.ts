import { Request, Response, NextFunction } from "express";
import studentModel from "../models/studentModel";
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
