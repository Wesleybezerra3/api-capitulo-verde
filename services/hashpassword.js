const usuario = require("../model/usuario");
const bcrypt = require("bcrypt");

const users = [];
const getDataUser = async () => {
  return await usuario.findAll();
};

const main = async () => {
  await getDataUser();
  users.push(...data);
};
main()

()
