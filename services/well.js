const db = require("../db/models");
const { well, client } = db;

const getWell = async () => {
  try {
    const result = await well.findAll({
      include: client,
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
      offset: page && perPage ? page * perPage : undefined,
      limit: perPage,
      include: client,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getWellByClientId = async (clientId) => {
  try {
    const result = await well.findAll({ where: { clientId } });
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

const deleteWell = async (id) => {
  try {
    const result = await well.update(
      { id },
      {
        active: false,
      }
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
  getWellPaginate
};
