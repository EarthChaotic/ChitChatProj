//Import and Declare
const mysql = require("mysql2");
const express = require("express");
const app = express();
const PORT = 8000;

var userRouter = require("./routes/users");
//Import and Declare

//Reminder
app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
//Reminder

//MySQL Connect
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "chitchat",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.message);
    return;
  }
  console.log("Connected to the database");
});

//MySQL Connect

//API Goes Here

app.use("/users", userRouter);

//API Goes Here

module.exports = app;
