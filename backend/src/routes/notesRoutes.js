import express from "express";
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/notesController.js";
import attachOwnerFilter from "../middleware/attachOwnerFilter.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Every note route needs a logged-in user, and we want the owner filter ready
router.use(authMiddleware, attachOwnerFilter);

router.get("/", getAllNotes);
router.post("/", createNote);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;