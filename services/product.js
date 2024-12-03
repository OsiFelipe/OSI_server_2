const { Op } = require("sequelize");
const db = require("../db/models");
const { product, image } = db;

const getProduct = async () => {
  try {
    const result = await product.findAll({
      where: { inUse: true },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (idProduct) => {
  try {
    const result = await product.findByPk(idProduct);
    return result;
  } catch (error) {
    throw error;
  }
};

const getProductPaginate = async ({
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
    const result = await product.findAndCountAll({
      offset: page && perPage ? page * perPage : undefined,
      limit: perPage,
      where: { ...productWhere, inUse: true },
      order: [["id", "ASC"]],
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addProduct = async ({
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
    const result = await product.create({
      partNumber,
      name,
      description: name,
      topThreadConnection,
      bottomThreadConnection,
      maxOD,
      bodyOD,
      length,
      weight,
      inUse: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const editProduct = async (idProduct, body) => {
  try {
    let updates = {};
    Object.entries(body).forEach(([key, value]) => {
      updates[key] = value;
    });
    const result = await product.update(updates, {
      where: { id: idProduct },
    });
    console.log(result);
    return true;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const result = await product.update(
      {
        inUse: false,
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
  getProduct,
  getProductById,
  editProduct,
  addProduct,
  deleteProduct,
  getProductPaginate,
};
