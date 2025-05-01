const db = require("../db/models");
const { chemicalTrackerClient } = db;

const getChemicalByWellId = async (idWell) => {
  try {
    const result = await chemicalTrackerClient.findAll({
      where: { idWell, active: true },
      order: [["date", "DESC"]],
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const addChemicalTrackerClient = async (client, well, path, fileName) => {
  try {
    const result = await chemicalTrackerClient.create({
      idClient: client.id,
      idWell: well.id,
      customName: fileName,
      path,
      date: new Date(),
      active: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteChemicalTrackerClient = async ({ id }) => {
  try {
    const result = await chemicalTrackerClient.update(
      {
        active: false,
      },
      {
        where: { id },
      },
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getChemicalByWellId,
  addChemicalTrackerClient,
  deleteChemicalTrackerClient,
};
