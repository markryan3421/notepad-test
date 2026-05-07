import express from 'express';
import notesRoutes from "./routes/notesRoutes.js";

const app = express();

// Routes
app.use("/api/notes", notesRoutes);

app.listen(5001, () => {
  console.log("Connected to port 5001");
});