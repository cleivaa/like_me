const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;
const cors = require ('cors')
const { Pool } = require('pg')



 // Iniciar el servidor con el el valor de puerto 3000 establecido al inicio de la declaracion de variables
 app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Middleware para manejar datos en formato JSON
app.use(express.json());

 //Habilitamos cors
app.use(cors())

// Ruta del archivo JSON local
const likeMePath = "./posts";

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static("public"));

// Función para leer el archivo JSON
const leerPostLikes = () => {
  const data = fs.readFileSync(likeMePath, "utf8");
  return JSON.parse(data);
};

// Función para escribir en el archivo JSON
const guardarPost = (data) => {
    fs.writeFileSync(likeMePath, JSON.stringify(data, null, 2));
  };

  // Rutas

// 1. GET /PostLikes - Devuelve los registros

const obtenerPost = async () => {
  const { rows } = await pool.query("SELECT * FROM posts")
  console.log(rows)
  return rows
  }
  obtenerPost()

  
app.get("/posts", (req, res) => {
    try {
      const PostLikes = leerPostLikes();
      res.json(PostLikes);
    } catch (error) {
      res.status(500).send("Error al leer los post");
    }
  });
  
  // 2. POST /PostLikes - Agrega un post
    
  app.post("/posts", (req, res) => {
    try {
      const nuevoPost = req.body;
      const PostLikes = leerPostLikes();
      PostLikes.push(nuevoPost);
      guardarPost(PostLikes);
      res.status(201).send("Post agregada correctamente");
    } catch (error) {
      res.status(500).send("Error al agregar el post");
    }
  });

module.exports 