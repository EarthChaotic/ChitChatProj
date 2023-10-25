const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

var userRouter = require("./routes/users");
var friendRouter = require("./routes/friend");

const db = require("./database/index");
db.sequelize.sync();
//Import and Declare

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
//Check if API Is Up

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/friend", friendRouter);
//API Goes Here
