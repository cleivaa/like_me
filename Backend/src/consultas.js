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

module.exports = { getPosts, createPost };
