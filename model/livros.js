const {Sequelize, DataTypes} = require('sequelize');
const database = require('../config/db');

const livro = database.define("livros", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    editora: {
      type: DataTypes.STRING(100),
    },
    ano_de_publicacao: {
      type: DataTypes.INTEGER(4),
    },
    genero: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    arquivo_livro_url: {
      type: DataTypes.STRING,
    },
    capa_livro_url: {
      type: DataTypes.STRING,
    },
    status:{
      type: DataTypes.ENUM('pendente', 'aprovado', 'rejeitado'),
      allowNull:false
    }
  },
  {
      timestamps: false
  }
  
  );

module.exports = livro