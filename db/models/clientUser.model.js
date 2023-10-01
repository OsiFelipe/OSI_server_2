module.exports = (sequelize, Sequelize) => {
  const ClientUser = sequelize.define(
    "clientUser",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idClient: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idRol: {
        type: Sequelize.INTEGER,
        default: 3,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      lastLogin: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "tbClientUser",
    }
  );

  return ClientUser;
};
