module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "product",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      partNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      inUse: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      topThreadConnection: {
        type: Sequelize.STRING,
      },
      bottomThreadConnection: {
        type: Sequelize.STRING,
      },
      maxOD: {
        type: Sequelize.STRING,
      },
      bodyOD: {
        type: Sequelize.STRING,
      },
      length: {
        type: Sequelize.FLOAT,
      },
      weight: {
        type: Sequelize.FLOAT,
      },
      imagePath: {
        type: Sequelize.STRING,
        default: null,
      },
      size: {
        type: Sequelize.INTEGER,
        default: null,
      },
      toolRichText: {
        type: Sequelize.TEXT,
        default: null,
      },
      osi: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
    },
    {
      tableName: "tbProduct",
    }
  );

  return Product;
};
