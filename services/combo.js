const { Op } = require("sequelize");
const db = require("../db/models");
const { combo } = db;

const getCombo = async () => {
  try {
    const result = await combo.findAll({
      where: { active: true },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getComboPaginate = async ({
  page = undefined,
  perPage = undefined,
  search = null,
}) => {
  try {
    let productWhere = {};
    if (search !== null) {
      productWhere = {
        [Op.or]: [
          {
            partNumber: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }
    const result = await combo.findAndCountAll({
      offset: page && perPage ? page * perPage : undefined,
      limit: perPage,
      where: { ...productWhere, inUse: true },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const addCombo = async ({
  partNumber,
  name,
  topThreadConnection,
  bottomThreadConnection,
  maxOD,
  bodyOD,
  length,
  weight,
}) => {
  try {
    const result = await combo.create({
      partNumber,
      name,
      description: name,
      topThreadConnection,
      bottomThreadConnection,
      maxOD,
      bodyOD,
      length,
      weight,
      active: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const editCombo = async (
  idProduct,
  {
    partNumber,
    name,
    topThreadConnection,
    bottomThreadConnection,
    maxOD,
    bodyOD,
    length,
    weight,
  }
) => {
  try {
    const result = await product.update(
      {
        partNumber,
        name,
        description: name,
        topThreadConnection,
        bottomThreadConnection,
        maxOD,
        bodyOD,
        length,
        weight,
      },
      {
        where: { id: idProduct },
      }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteCombo = async (id) => {
  try {
    const result = await combo.update(
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
  getCombo,
  editCombo,
  addCombo,
  deleteCombo,
  getComboPaginate,
};
