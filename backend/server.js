// import express from 'express';
const express = require("express");

const app = express();

// Routes
app.get("/api/notes", (req, res) => {
  res.send("Note fetched");
});

app.listen(5001, () => {
  console.log("Connected to port 5001");
});