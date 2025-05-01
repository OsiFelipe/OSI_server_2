const db = require("../db/models");
const { proposalClient } = db;

const getProposalByWellId = async (idWell) => {
  try {
    const result = await proposalClient.findAll({
      where: { idWell, active: true },
      order: [["date", "DESC"]],
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const addProposalClient = async (client, well, path, fileName) => {
  try {
    const result = await proposalClient.create({
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

const deleteProposalClient = async ({ id }) => {
  try {
    const result = await proposalClient.update(
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
  getProposalByWellId,
  addProposalClient,
  deleteProposalClient,
};
