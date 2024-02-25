const db = require("../db/models");
const { pulling } = db;

const getPullingByWellId = async (idWell) => {
  try {
    const result = await pulling.findAll({
      where: { idWell, active: true },
      order: [["date", "DESC"]],
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const addPulling = async (client, well, customName, path, fileName) => {
  try {
    const result = await pulling.create({
      idClient: client.id,
      idWell: well.id,
      customName: customName + "-" + fileName,
      path,
      date: new Date(),
      active: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const deletePulling = async ({ id }) => {
  try {
    const result = await pulling.update(
      {
        active: false,
      },
      {
        where: { id },
      }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPullingByWellId,
  addPulling,
  deletePulling,
};
