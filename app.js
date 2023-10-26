const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

var userRouter = require("./routes/users");
var friendRouter = require("./routes/friend");

const db = require("./database/index");
db.sequelize.sync();
//Import and Declare

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/HTML/DM.html");
});


io.on('connection', (socket) => {
  socket.on('join room', (roomName) => {
    socket.join(roomName);
  });

  socket.on('private message', (data) => {
    io.to(data.roomName).emit('chat message', data.message);
  });
});
//Socket.IO

server.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
//Check if API Is Up

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/friend", friendRouter);
//API Goes Here
