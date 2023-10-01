const jwt = require("jsonwebtoken");
const db = require("../db/models");
const sequelize = require("sequelize");
require("dotenv").config();
const { clientUser, user } = db;

const SEED = process.env.SEED || "este-es-el-seed";
const CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || "48h";

const login = async (username, password) => {
  try {
    const result = await user.findOne({
      where: {
        email: username.toLowerCase(),
        password: sequelize.fn("crypt", password, sequelize.col("password")),
        active: true,
      },
      raw: true,
    });
    let token = null;
    if (result) {
      token = jwt.sign(
        {
          userId: result.id,
          name: result.name,
          user: result.email,
          idRol: result.idRol,
          client: false,
        },
        SEED,
        {
          expiresIn: CADUCIDAD_TOKEN,
        }
      );
    }
    return token;
  } catch (error) {
    throw error;
  }
};

const loginClient = async (username, password) => {
  try {
    const result = await clientUser.findOne({
      where: {
        key: username.toLowerCase(),
        password: sequelize.fn("crypt", password, sequelize.col("password")),
        active: true,
      },
      raw: true,
    });
    let token = null;
    if (result) {
      token = jwt.sign(
        {
          userId: result.id,
          name: result.name,
          user: result.key,
          idRol: 3,
          client: true,
          clientId: result.idClient,
        },
        SEED,
        {
          expiresIn: CADUCIDAD_TOKEN,
        }
      );
    }
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
  loginClient,
};
