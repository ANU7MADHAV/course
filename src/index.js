const express = require("express");
const connect = require("../config/db");
const app = express();

const userRouter = require("../routes/index");
const port = 3000;

app.use(express.json());
app.use(userRouter);

connect();
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
