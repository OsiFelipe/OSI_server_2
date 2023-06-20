const { Op } = require('sequelize');
const db = require("../db/models");
const { client, well } = db;

const getClient = async () => {
  try {
    const result = await client.findAll({
      where: { active: true },
      attributes: ["id", "name"],
      order: [["name", "ASC"]],
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getClientDetail = async (id) => {
  try {
    const result = await client.findOne({
      where: { id },
      include: {
        model: well,
        order: [["name", "ASC"]],
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getClientPaginate = async ({
  page = undefined,
  perPage = undefined,
  search = null,
}) => {
  try {
    let clientWhere = {};
    if (search !== null) {
      clientWhere = {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
        ]
      }
    }
    const result = await client.findAndCountAll({
      offset: page && perPage ? page * perPage : undefined,
      limit: perPage,
      where: { ...clientWhere, active: true },
      attributes: ["id", "name"],
      order: [["name", "ASC"]],
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const addClient = async ({ name }) => {
  try {
    const result = await client.create({
      name,
      active: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const editClient = async (idClient, { name }) => {
  try {
    const result = await client.update(
      {
        name,
      },
      { where: { id: idClient } }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteClient = async (id) => {
  try {
    const result = await client.update(
      {
        active: false,
      },
      { where: { id: idClient } }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getClient,
  editClient,
  addClient,
  deleteClient,
  getClientPaginate,
  getClientDetail
};
