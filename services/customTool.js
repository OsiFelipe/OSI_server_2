const db = require("../db/models");
const { customTool } = db;

const editCustomTool = async (
  idProduct,
  {
    name,
    description,
    topThreadConnection,
    bottomThreadConnection,
    maxOD,
    bodyOD,
    length,
    weight,
  }
) => {
  try {
    const result = await customTool.update(
      {
        name,
        description,
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

module.exports = {
  editCustomTool,
};
