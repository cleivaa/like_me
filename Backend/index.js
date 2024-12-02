const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const { Pool } = require("pg");
const { getPosts, createPost } = require("./src/consultas");

// Iniciar el servidor con el el valor de puerto 3000 establecido al inicio de la declaracion de variables
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Middleware para manejar datos en formato JSON
app.use(express.json());

//Habilitamos cors
app.use(cors());

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static("public"));

// 1. Obtener posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error al leer los post");
  }
});

// 2. Agrega un post
app.post("/posts", (req, res) => {
  try {
    const {titulo, url, descripcion} = req.body;
    createPost(titulo, url, descripcion);
    res.status(201).send("Post agregada correctamente");
  } catch (error) {
    res.status(500).send("Error al agregar el post");
  }
});

module.exports;
