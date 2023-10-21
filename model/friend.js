module.exports = (sequelize, Sequelize) => {
    const Friend = sequelize.define(
      "Friend",
      {
        UserId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        FriendId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: "Friends",
      }
    );
    return Friend;
  };