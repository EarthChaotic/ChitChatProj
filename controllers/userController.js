const db = require("../database/index");
const { user } = db;

exports.getUsers = async (req, res, next) => {
  try {
    info = await user.findAll();
    res.json(info);
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    data = req.body.data;
    info = await user.create({
      EMAIL: data.email,
      UNAME: data.uname,
      PASSWORD: data.password,
    });
    if (!info) {
      res.sendStatus(500);
    } else {
      res.status(200).json(info);
    }
  } catch (error) {
    next(error);
  }
};
