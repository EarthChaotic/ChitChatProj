module.exports = (sequelize, Sequelize) => {
    const FriendRequest = sequelize.define(
      "FriendRequest",
      {
        SenderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ReceiverId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM("pending", "accepted", "rejected"),
          allowNull: false,
          defaultValue: "pending",
        },
      },
      {
        tableName: "FriendRequests",
      }
    );
    return FriendRequest;
  };
  