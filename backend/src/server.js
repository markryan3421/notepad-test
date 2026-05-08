import express from 'express';
import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";

// Use the variables in the env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; 

connectDb();

// Middleware to parse JSON bodies, data won't be stored to db without this
app.use(express.json()); 

// Routes
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log("Connected to port ", PORT);
});