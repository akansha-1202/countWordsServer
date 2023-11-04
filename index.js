
const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// const { exec } = require("child_process");
const fs = require("fs");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json()); //work as a body parser

app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "An error occurred while counting words." });
    }

    // Split the content into words and count them
    const words = data.split(/\s+/).filter(word => word !== ""); // Filter out empty strings
    const wordCount = words.length;

    res.json({ wordCount });
  });
//   exec(`type ${filePath} | find /c /v ""`, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`);
//       return res.status(500).json({ error: "An error occurred while counting words." });
//     }
//     // const wordCount = stdout.trim().split(" ")[0];
//     const wordCount = stdout.trim();

//     res.json({wordCount});
//   });
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is starting on port number: ${PORT}`);
});




