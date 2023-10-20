const express = require("express");
const app = express();
const PORT = 3000;

var userRouter = require('./routes/users');

const db = require("./database/index")
db.sequelize.sync();
//Import and Declare

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
  });
//Check if API Is Up

app.use(express.json());
app.use('/users',userRouter);
//API Goes Here