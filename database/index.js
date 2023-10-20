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

module.exports = db;