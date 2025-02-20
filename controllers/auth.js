const userModel = require("../model/usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { json } = require("sequelize");

const SECRET_KEY =process.env.JWT_KEY;

const generateToken = (user) => {
  return jwt.sign({ id: user.id, nome: user.nome }, SECRET_KEY, {
    expiresIn: "24h",
  });
};

exports.register = async (req, res) => {
  try {
    const { nome, senha } = req.body;

    const existingUser = await userModel.findOne({ where: { nome } });
    if (existingUser) {
      return res.status(409).json({ message: "Usuário já cadastrado!" });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    await userModel.create({ nome, senha: hashedPassword });
    return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao cadastrar usuário", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { nome, senha } = req.body;
    const user = await userModel.findOne({ where: { nome } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha inválida!" });
    }

    const token = generateToken(user);
    return res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao realizar login!" });
  }
};

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado! Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    console.log(json(decoded));
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido ou expirado!" });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await userModel.findByPk(req.user.id, {
      attributes: ["id", "nome"],
    });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar usuário!" });
  }
};

// exports.users = async (req, res) => {
//   try {
//     const users = await userModel.findAll({
// attributes:['id,'nome']});
//     return res.status(200).json(users);
//   } catch (error) {
//     return res.status(500).json({ message: "Erro ao buscar usuários!", error });
//   }
// };
