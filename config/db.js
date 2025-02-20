require('dotenv').config();
const env = process.env;
const Sequelize = require("sequelize");
const database = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  dialect: "mysql",
  port: env.DB_PORT,
  host: env.DB_HOST,
  logging: false,
});
const connectDB = async () => {
  try {
    await database.authenticate();
    console.log("✅ Banco de dados conectado com sucesso!");
  } catch (err) {
    console.log("❌ Erro ao conectar no banco de dados:", err);
  }
};

connectDB();

module.exports = database;
