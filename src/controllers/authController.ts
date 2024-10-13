import { Request, Response } from "express";
import Teacher, { ITeacher } from "../models/teacherModel";
import { generateToken } from "../utils/auth";
import { createStudent, createTeacher } from "../services/authService";
import studentModel from "../models/studentModel";
import teacherModel from "../models/teacherModel";



// פונקציה להרשמה של משתמש חדש
export const teacherRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const classId = await createTeacher(req.body);
    res.status(201).json({ classId: classId });
  } catch (error) {
    console.log(error);
    res.status(400).json("תקלה בהרשמה");
  }
};
export const studentRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const studentId = await createStudent(req.body);
    res.status(201).json({ studentId: studentId });
  } catch (error) {
    console.log(error);
    res.status(400).json("תקלה בהרשמה");
  }
};

// התחברות של משתמש קיים
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const Student = await studentModel.findOne({ email });
    const Teacher = await studentModel.findOne({ email });

    if (!Student && !Teacher) {
      res.status(404).json({ message: "משתמש לא קיים" });
    }
    if (Student) {
      const isMatch = await Student.comparePassword(password);
      if (!isMatch) {
        res.status(401).json({ message: "סיסמא שגויה" });
      }
      const token = generateToken(Student.id, "student");
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60, // 1 hour
      });
      res.status(201).json({ message: " התחברת בהצלחה תלמיד" });
    } else if (Teacher) {
      const isMatch = await Teacher.comparePassword(password);
      if (!isMatch) {
        res.status(400).json({ message: "סיסמא שגויה" });
      }
      const token = generateToken(Teacher.id, "teacher");
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60, // 1 hour
      });
      res.status(201).json({ message: "התחברת בהצלחה מורה" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("תקלה בהתחברות");
  }
};
