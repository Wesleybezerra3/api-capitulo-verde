require("dotenv").config();
const { Sequelize } = require("sequelize");

const database = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    dialect: "mysql",
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
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
