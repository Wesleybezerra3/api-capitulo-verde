require("dotenv").config();
const { Sequelize } = require("sequelize");

const database = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
  }
);

async function connectDB() {
  try {
    await database.authenticate();
    console.log("✅ Banco de dados conectado com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao conectar no banco de dados:", err);
  }
}

connectDB();

module.exports = database;
