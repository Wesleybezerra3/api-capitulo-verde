const { Sequelize, DataTypes } = require("sequelize");
const database = require("../config/db");

const usuario = database.define(
  "usuarios",
  {
    nome: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM,
      values: ["admin", "user"],
      allowNull: false,
      defaultValue:'user'
    },
  },
  {
    timestamps: false,
  }
);
module.exports = usuario;
