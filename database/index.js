const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("chitchat", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../model/users")(sequelize, Sequelize);
db.friend = require("../model/friend")(sequelize, Sequelize);
db.friendreq = require("../model/friendreq")(sequelize, Sequelize);

db.user.hasMany(db.friend, { foreignKey: "UserId" });
db.user.hasMany(db.friend, { foreignKey: "FriendId", as: "UserFriends" });

db.user.hasMany(db.friendreq, { foreignKey: "SenderId", as: "SentRequests" });
db.user.hasMany(db.friendreq, {
  foreignKey: "ReceiverId",
  as: "ReceivedRequests",
});

module.exports = db;
