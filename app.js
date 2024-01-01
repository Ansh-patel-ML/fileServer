const express = require("express");
const fs = require("fs");
const app = express();

app.get("/files", (req, res) => {
  fs.readdir("files", (err, files) => {
    if (err) {
      res.status(500).json({
        error: "Internal Server Error!",
      });
    } else {
      res.status(200).json({
        data: files,
      });
    }
  });
});

app.get("/file/:filename", (req, res) => {
  const fileName = req.params.filename;
  fs.readdir("files", (err, files) => {
    if (err) {
      res.status(500).json({
        error: "Internal Server Error!",
      });
    } else {
      const queryFileName = files.find((file) => file === fileName);
      if (queryFileName) {
        fs.readFile(`files/${queryFileName}`, "utf-8", (err, data) => {
          if (err) {
            res.status(500).json({
              error: "Internal Server Error!",
            });
          }
          res.status(200).json({
            data: data,
          });
        });
      } else {
        res.status(200).json({
          data: "No file found",
        });
      }
    }
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found!",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
