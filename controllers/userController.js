const db = require("../database/index");
const { user } = db;
const bcrypt = require("bcrypt");

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
    const { email, uname, password } = req.body;

    if (!email || !uname || !password) {
      return res.status(400).json({ message: "Missing required data" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      EMAIL: email,
      UNAME: uname,
      PASSWORD: hashedPassword,
    });

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};
