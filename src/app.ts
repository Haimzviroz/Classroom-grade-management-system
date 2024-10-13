import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";
import studentsRouter from "./routes/studentRoutes";
import teacherRouter from "./routes/teacherRoutes";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Class Room Project",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

connectDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api", studentsRouter);
app.use("/api", teacherRouter)

// Error handling middleware
app.use(errorHandler);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
