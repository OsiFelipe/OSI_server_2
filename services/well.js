const db = require("../db/models");
const { well, client, proposal, tally } = db;

const getWell = async () => {
  try {
    const result = await well.findAll({
      where: { active: true },
      include: client,
      order: [["name", "ASC"]],
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getWellDetail = async (id) => {
  try {
    const result = await well.findOne({
      where: { id, active: true },
      include: [
        {
          model: proposal,
        },
        { model: tally },
      ],
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getWellPaginate = async ({
  page = undefined,
  perPage = undefined,
  search = null,
}) => {
  try {
    const result = await well.findAndCountAll({
      where: { active: true },
      offset: page && perPage ? page * perPage : undefined,
      limit: perPage,
      include: client,
      order: [["name", "ASC"]],
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getWellByClientId = async (clientId) => {
  try {
    const result = await well.findAll({
      where: { clientId, active: true },
      order: [["name", "ASC"]],
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const addWell = async ({ name, client: { id }, contact, phoneNumber }) => {
  try {
    const newWell = await well.create({
      name,
      contact,
      phoneNumber,
      clientId: id,
      active: true,
    });
    return newWell;
  } catch (error) {
    throw error;
  }
};

const editWell = async (idWell, { name, idClient, contact, phoneNumber }) => {
  try {
    const result = await well.update(
      {
        name,
        idClient,
        contact,
        phoneNumber,
      },
      { where: { id: idWell } }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteWell = async ({ id }) => {
  try {
    const result = await well.update(
      {
        active: false,
      },
      { where: { id } }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getWell,
  getWellByClientId,
  editWell,
  addWell,
  deleteWell,
  getWellPaginate,
  getWellDetail,
};
