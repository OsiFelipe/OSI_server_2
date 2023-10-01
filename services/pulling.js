const db = require("../db/models");
const { pulling } = db;

const getPullingByWellId = async (idWell) => {
  try {
    const result = await pulling.findAll({ where: { idWell, active: true } });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPullingByWellId,
};
