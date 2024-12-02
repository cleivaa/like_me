const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "like_me",
  allowExitOnIdle: true,
});

const getDate = async () => {
  const result = await pool.query("SELECT NOW()");
  console.log(result);
};
getDate();
