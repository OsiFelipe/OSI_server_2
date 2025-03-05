const jwt = require("jsonwebtoken");
const db = require("../db/models");
const { user: User, clientUser } = db;
require("dotenv").config();
const SEED = process.env.SEED || "este-es-el-seed";

// ==========================
// Verfy Token
// ==========================
let verificaToken = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      error: {
        message: "No valid token",
      },
    });
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer") {
    return error(res, STATUS_CODES.BAD_REQUEST, {
      success: false,
      message: "The authentication header is malformed.",
    });
  }
  jwt.verify(token, SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        error: {
          message: "No valid token",
        },
      });
    }
    req.user = decoded.user;
    req.userId = decoded.userId;
    User.findOne({ where: { email: req.user } })
      .then((userFound) => {
        if (!userFound) {
          return res.status(401).json({
            ok: false,
            error: {
              message: "Not Authorized",
            },
          });
        } else {
          next();
        }
      })
      .catch((error) => {
        return res.status(401).json({
          ok: false,
          error,
        });
      });
  });
};

// ==========================
// Verfy Token Client
// ==========================
let verificaTokenClient = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      error: {
        message: "No valid token",
      },
    });
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer") {
    return error(res, STATUS_CODES.BAD_REQUEST, {
      success: false,
      message: "The authentication header is malformed.",
    });
  }
  jwt.verify(token, SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        error: {
          message: "No valid token",
        },
      });
    }
    req.user = decoded.user;
    req.userId = decoded.userId;
    clientUser
      .findOne({ where: { key: req.user } })
      .then((userFound) => {
        if (!userFound) {
          return res.status(401).json({
            ok: false,
            error: {
              message: "Not Authorized",
            },
          });
        } else {
          next();
        }
      })
      .catch((error) => {
        return res.status(401).json({
          ok: false,
          error,
        });
      });
  });
};

// ==========================
// Verify Role
// ==========================
let verifyRole = (roles) => {
  return async (req, res, next) => {
    let user = req.userId;
    const userApp = await User.findByPk(user);
    req.idRol = userApp.dataValues.idRol;
    if (req.idRol === 0) {
      next();
    } else {
      if (roles.includes(req.idRol)) {
        next();
      } else {
        return res.status(401).json({
          ok: false,
          error: {
            message: "Not authorize for this resource!",
          },
        });
      }
    }
  };
};

// ==========================
// Verify Role
// ==========================
let verifyRoleClient = (roles) => {
  return async (req, res, next) => {
    let user = req.userId;
    const userApp = await clientUser.findByPk(user);
    req.idRol = userApp.dataValues.idRol;
    if (roles.includes(req.idRol)) {
      next();
    } else {
      return res.status(401).json({
        ok: false,
        error: {
          message: "Not authorize for this resource!",
        },
      });
    }
  };
};

module.exports = {
  verificaToken,
  verificaTokenClient,
  verifyRole,
  verifyRoleClient,
};
