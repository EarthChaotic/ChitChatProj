const db = require("../database/index");
const { friendreq, user } = db;
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const { email, uname, password } = req.body;

    if (!email || !uname || !password) {
      return res.status(400).json({ message: "Missing required data" });
    }

    const dupeuname = await user.findOne({ where: { UNAME: uname } });
    const dupeemail = await user.findOne({ where: { EMAIL: email } });

    if (dupeuname) {
      return res.status(400).json({ message: "Username has already been taken" });
    }
    if (dupeemail) {
      return res.status(400).json({ message: "Email has already been taken" });
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

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginuser = await user.findOne({ where: { EMAIL: email } });

    if (!loginuser) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const passwordMatch = await bcrypt.compare(password, loginuser.PASSWORD);

    if (passwordMatch) {
      res.status(200).json({ message: "Login Successful" });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.CurrentUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const currentuser = await user.findOne({ where: { EMAIL: email } });
    res.json(currentuser.UNAME);
  } catch (error) {
    throw error;
  }
};

exports.sendFriendRequest = async (req, res, next) => {
  try {
    const { senderuname, receiveruname } = req.body;

    const sender = await user.findOne({ where: { UNAME: senderuname } });
    const receiver = await user.findOne({ where: { UNAME: receiveruname } });

    if (!sender || !receiver || sender.UNAME == receiver.UNAME) {
      return res.status(400).json({ message: "User not found" });
    }

    const existingRequest = await friendreq.findOne({
      where: {
        SenderId: sender.id,
        ReceiverId: receiver.id,
      },
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    await friendreq.create({
      SenderId: sender.id,
      ReceiverId: receiver.id,
      status: "pending",
    });

    res.status(201).json({ message: "Friend request sent" });
  } catch (error) {
    next(error);
  }
};