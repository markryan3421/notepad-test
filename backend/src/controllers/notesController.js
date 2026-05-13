import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ ...req.ownerFilter }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content, ...req.ownerFilter }); // userId from "..req.ownerFilter" is auto-attached

    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error occured while creating note", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, ...req.ownerFilter });
    if (!note) return res.status(404).json({ message: "Note not found." });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findOneAndUpdate(
      { _id: req.params.id, ...req.ownerFilter },
      { title, content },
      { new: true }
    );

    if (!updateNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note updated successfully." });
  } catch (error) {
    console.error("Error occured while updating note.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function deleteNote(req, res) {
  try {
    const deleteNote = await Note.findOneAndDelete({ _id: req.params.id, ...req.ownerFilter });

    if (!deleteNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error occured while deleting note.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}