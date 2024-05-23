const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "10mb" }));

app.post("/upload", (req, res) => {
  const imageData = req.body.image.replace(/^data:image\/png;base64,/, "");
  const imagePath = path.join(__dirname, "uploads", `score-${Date.now()}.png`);

  fs.writeFile(imagePath, imageData, "base64", (err) => {
    if (err) {
      console.error("Error saving image:", err);
      return res.status(500).json({ error: "Failed to save image" });
    }

    res.json({
      url: `${process.env.BASE_URL}/uploads/${path.basename(imagePath)}`,
    });
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
