const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "likeme",
  allowExitOnIdle: true,
});

const getPosts = async () => {
  const result = await pool.query("SELECT * FROM posts;");
  return result.rows;
};

const createPost = async (titulo, url, descripcion) => {
  const result =
    await pool.query(`INSERT INTO posts (titulo, img, descripcion, likes)
VALUES ('${titulo}', '${url}', '${descripcion}', 0); `);
};

const updatePosts = async (id, titulo, url, descripcion) => {
  let query = "";
  if (titulo) {
    query = `titulo = '${titulo}'`;
  }
  if (url) {
    query = `${query}, img = '${url}'`;
  }
  if (descripcion) {
    query = `${query}, descripcion = '${descripcion}'`;
  }
  sentence = `UPDATE posts SET ${query} WHERE id = ${id}`;
  const result = await pool.query(sentence);
  return result
};

const deletePost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1"
  const values = [id]
  const result = await pool.query(consulta, values)
  return result
  }
  

module.exports = { getPosts, createPost, updatePosts, deletePost};
