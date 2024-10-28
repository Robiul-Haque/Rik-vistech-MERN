import express from "express";
import path from "path";
import https from "https";
import fs from "fs";
const app = express();
const PORT = process.env.PORT || 3300;

// Get the directory name using import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({ extended: true }));
// Handle all other routes by serving the index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
