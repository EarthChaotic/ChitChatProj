module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      EMAIL: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      UNAME: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      PASSWORD: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "User",
    }
  );
  return User;
};
