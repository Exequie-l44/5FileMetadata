// index.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
require("dotenv").config();

const app = express();

// CORS para que freeCodeCamp pueda testear
app.use(cors({ optionsSuccessStatus: 200 }));

// Para servir archivos estáticos si usás /public
app.use("/public", express.static(path.join(__dirname, "public")));

// Página principal simple
app.get("/", (req, res) => {
  // Si tenés el index.html del boilerplate, podés usar esto:
  // res.sendFile(path.join(__dirname, "views/index.html"));
  res.send("File Metadata Microservice");
});

// Configuración de multer (en memoria, sin guardar en disco)
const upload = multer();

// ========= RUTA PRINCIPAL DEL PROYECTO =========
// Campo del archivo debe llamarse "upfile"
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    // freeCodeCamp en general siempre manda archivo,
    // pero igual devolvemos algo razonable.
    return res.json({ error: "No file uploaded" });
  }

  const { originalname, mimetype, size } = req.file;

  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});

// Puerto (Render usa process.env.PORT)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
