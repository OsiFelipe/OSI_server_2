module.exports = (sequelize, Sequelize) => {
  const ChemicalTrackerClient = sequelize.define(
    "chemicalTrackerClient",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      idClient: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idWell: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      customName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      tableName: "tbChemicalTrackerClient",
    },
  );

  return ChemicalTrackerClient;
};
