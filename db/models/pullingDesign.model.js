module.exports = (sequelize, Sequelize) => {
  const PullingDesign = sequelize.define(
    "pullingDesign",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      customName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pullingName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      installationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      pullingDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      details: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      recomendations: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      tableName: "tbPullingDesign",
    }
  );

  return PullingDesign;
};
