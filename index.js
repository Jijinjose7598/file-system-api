const express = require("express");
const httpServer = express();
const fs = require("fs");
const path = require("path");

//task 1

httpServer.get("/", (req, res) => {
  const timestamp = new Date().toISOString();
  const filename = `${timestamp}.txt`.replace(/:/g, "-");

  fs.writeFile(filename, timestamp, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error writing file", error: err });
    }
    res.status(200).json({ message: "File created successfully" });
  });
});
httpServer.listen(3000, "0.0.0.0", () => {
  console.log("server started");
});

// task 2

httpServer.get("/filter", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to scan directory" });
    }

    const textFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".txt"
    );

    if (files) {
      console.log(textFiles);
      return res.status(200).json({ success: "file filtered successfully" });
    }
  });
});

