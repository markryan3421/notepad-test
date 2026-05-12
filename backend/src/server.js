import express from 'express';
import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
import authMiddleware from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';

// Use the variables in the env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS
app.use(cors({
  origin: "http://localhost:5175"
}));

// Middleware to parse JSON bodies, data won't be stored to db without this
app.use(express.json());

// Rate limiter
app.use(rateLimiter);

// Example custom middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(cookieParser());

// Routes
app.use("/api/notes", authMiddleware, notesRoutes);
app.use("/api/auth", authRoutes);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
  });
});