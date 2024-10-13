import { Router } from "express";
import { teacherRegister,studentRegister,login } from "../controllers/authController";

const authRouter = Router();

/**
 * @swagger
 * /auth/register/teacher:
 *   post:
 *     summary: רישום מורה חדש
 *     description: פונקציה להרשמה של מורה חדש
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - className
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               className:
 *                 type: string
 *     responses:
 *       201:
 *         description: המורה נרשם בהצלחה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 classId:
 *                   type: string
 *       400:
 *         description: שגיאה בנתונים שהוזנו
 */
authRouter.post("/register/teacher", teacherRegister);
/**
 * @swagger
 * /auth/register/student:
 *   post:
 *     summary: רישום סטודנט חדש
 *     description:  פונקציה להרשמה של סטודנט חדש
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - classId
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               classId:
 *                 type: string
 *                 format: objectId
 *     responses:
 *       201:
 *         description: הסטודנט נרשם בהצלחה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 studentId:
 *                   type: string
 *                   format: objectId
 *       400:
 *         description: שגיאה בנתונים שהוזנו
 */
authRouter.post("/register/student", studentRegister);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: התחברות למערכת
 *     description: מחזיר טוקן אם המשמתמש קיים והסיסמה תקינה
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: התחברות הצליחה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: string
 *                   enum: [student, teacher]
 *                 
 *                 userId:
 *                   type: string
 *                   format: objectId
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: token=abcde12345; HttpOnly; Secure; SameSite=Strict
 *       401:
 *         description: שם משתמש או סיסמה שגויים
 */
authRouter.post("/login", login);

export default authRouter;
