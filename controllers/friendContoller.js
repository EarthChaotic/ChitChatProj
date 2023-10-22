const db = require("../database/index");
const { friendreq, user } = db;
const bcrypt = require("bcrypt");

exports.sendFriendRequest = async (req, res, next) => {
    try {
      const { senderuname, receiveruname } = req.body;
  
      const sender = await user.findOne({ where: { UNAME: senderuname } });
      const receiver = await user.findOne({ where: { UNAME: receiveruname } });
  
      if (!sender || !receiver || sender.UNAME == receiver.UNAME) {
        return res.status(400).json({ message: "User not found" });
      }
  
      const existingRequest1 = await friendreq.findOne({
        where: {
          SenderId: sender.id,
          ReceiverId: receiver.id,
          status: "pending"
        },
      });
      if (existingRequest1) {
        return res.status(400).json({ message: "Friend request already sent" });
      }
      const existingRequest2 = await friendreq.findOne({
        where: {
          SenderId: receiver.id,
          ReceiverId: sender.id,
          status: "pending"
        },
      });
      if (existingRequest2) {
        return res.status(400).json({ message: "This user already sent you a friend request" });
      }
      //existingRequest

      const alreadyfriend1 = await friendreq.findOne({
        where: {
          SenderId: sender.id,
          ReceiverId: receiver.id,
          status: "accepted"
        },
      });
  
      if (alreadyfriend1) {
        return res.status(400).json({ message: "You are already Friend with that user" });
      }

      const alreadyfriend2 = await friendreq.findOne({
        where: {
          SenderId: receiver.id,
          ReceiverId: sender.id,
          status: "accepted"
        },
      });
  
      if (alreadyfriend2) {
        return res.status(400).json({ message: "You are already Friend with that user" });
      }
      //alreadyFriend

  
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
  
  exports.PendingRequests = async (req, res, next) => {
    try {
      const { email } = req.body;
  
      const currentUser = await user.findOne({ where: { EMAIL: email } });
  
      const pendingRequests = await friendreq.findAll({
        where: {
          SenderId: currentUser.id,
          status: "pending",
        },
      });
  
      res.status(200).json(pendingRequests);
    } catch (error) {
      next(error);
    }
  };
  
  exports.PendingUsernames = async (req, res, next) => {
    try {
      const { email } = req.body;
  
      const currentUser = await user.findOne({ where: { EMAIL: email } });
  
      const pendingRequests = await friendreq.findAll({
        where: {
          SenderId: currentUser.id,
          status: "pending",
        },
      });
  
      const pendingUsernames = [];
      for (const request of pendingRequests) {
        const receiver = await user.findOne({ where: { id: request.ReceiverId } });
        pendingUsernames.push(receiver.UNAME);
      }
  
      res.status(200).json(pendingUsernames);
    } catch (error) {
      next(error);
    }
  };
  
  exports.IncomingRequests = async (req, res, next) => {
    try {
      const { email } = req.body;
  
      const currentUser = await user.findOne({ where: { EMAIL: email } });
  
      const IncomingRequests = await friendreq.findAll({
        where: {
          ReceiverId: currentUser.id,
          status: "pending",
        },
      });
  
      res.status(200).json(IncomingRequests);
    } catch (error) {
      next(error);
    }
  };
  
  exports.incomingUsernames = async (req, res, next) => {
    try {
      const { email } = req.body;
  
      const currentUser = await user.findOne({ where: { EMAIL: email } });
  
      const incomingRequests = await friendreq.findAll({
        where: {
          ReceiverId: currentUser.id,
          status: "pending",
        },
      });
  
      const incomingUsernames = [];
      for (const request of incomingRequests) {
        const sender = await user.findOne({ where: { id: request.SenderId } });
        incomingUsernames.push(sender.UNAME);
      }
  
      res.status(200).json(incomingUsernames);
    } catch (error) {
      next(error);
    }
  };

  exports.AcceptRequest = async (req, res, next) => {
    try {
      const { email, senderuname } = req.body;
  
      const currentUser = await user.findOne({ where: { EMAIL: email } });
  
      if (!currentUser) {
        return res.status(400).json({ message: "User not found" });
      }
  
      const sender = await user.findOne({ where: { UNAME: senderuname } });
  
      if (!sender) {
        return res.status(400).json({ message: "Sender not found" });
      }
  
      const existingRequest = await friendreq.findOne({
        where: {
          SenderId: sender.id,
          ReceiverId: currentUser.id,
          status: "pending",
        },
      });
  
      if (!existingRequest) {
        return res.status(400).json({ message: "Friend request not found" });
      }
  
      await existingRequest.update({ status: "accepted" });
  
      res.status(200).json({ message: "Friend request accepted" });
    } catch (error) {
      next(error);
    }
  };

  exports.DeclineRequest = async (req, res, next) => {
    try {
      const { email, senderuname } = req.body;
  
      const currentUser = await user.findOne({ where: { EMAIL: email } });
  
      if (!currentUser) {
        return res.status(400).json({ message: "User not found" });
      }
  
      const sender = await user.findOne({ where: { UNAME: senderuname } });
  
      if (!sender) {
        return res.status(400).json({ message: "Sender not found" });
      }
  
      const existingRequest = await friendreq.findOne({
        where: {
          SenderId: sender.id,
          ReceiverId: currentUser.id,
          status: "pending",
        },
      });
  
      if (!existingRequest) {
        return res.status(400).json({ message: "Friend request not found" });
      }
  
      await existingRequest.update({ status: "rejected" });
  
      res.status(200).json({ message: "Friend request declined" });
    } catch (error) {
      next(error);
    }
  };