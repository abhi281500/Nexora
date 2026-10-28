import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"

const app = express();


app.use(helmet());


app.use(express.json());


app.use(cookieParser());


app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Work OS API is running",
  });
});

app.use("/api/v1/auth", authRoutes);

export default app;