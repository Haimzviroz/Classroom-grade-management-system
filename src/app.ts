import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

connectDB();

// Routes
app.use("/api/auth", authRouter);


// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
