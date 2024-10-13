import { Request, Response } from "express";
import User from "../models/userModel";
import { generateToken } from "../utils/auth";

// פונקציה להרשמה של משתמש חדש
export const register = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({ message: "signed up successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json("תקלה בהרשמה");
  }
};

// התחברות של משתמש קיים
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "שם משתמש או סיסמה שגויים" });
      return;
    }

    const token = generateToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60, // 1 hour
    });
    res.status(201).json({ message: "התחברת בהצלחה" });
  } catch (error) {
    console.log(error);
    res.status(400).json("תקלה בהתחברות");
  }
};
