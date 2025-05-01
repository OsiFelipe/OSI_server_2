module.exports = (sequelize, Sequelize) => {
  const ProposalClient = sequelize.define(
    "proposalClient",
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
      tableName: "tbProposalClient",
    },
  );

  return ProposalClient;
};
