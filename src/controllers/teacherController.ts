import { Request, Response, NextFunction } from "express";
import studentModel from "../models/studentModel";
import teacherModel from "../models/teacherModel";
import { AuthRequest } from "../middleware/authMiddleware";

export const addGradeForStudent = async (req: AuthRequest, res: Response) => {
  try {
    const { studentId, grade } = req.body;
    const teacherId = req.user?.userId;
    console.log(teacherId);
    if (!teacherId){ res.status(400).json({ message: "משתמש לא קיים" }); return};
    const teacher = await teacherModel.findById(teacherId);
    const student = await studentModel.findById(studentId);
    if (!teacher || !student){
      res.status(400).json({ message: "תלמיד או מורה לא קיים" });
    return;}
    if (teacher?.classId?.toString() != student?.classId?.toString()){
      res.status(400).json({ message: "אתה לא המורה שלו" });
      return;
    }
    const updatedStudent = await studentModel.findByIdAndUpdate(
      studentId,
      { $push: { grades: grade } },
      { new: true }
    );
    res.status(200).json({ student: updatedStudent });
  } catch (err) {
    res.status(500).json({ message: "משתמש לא קיים" });
  }
};
