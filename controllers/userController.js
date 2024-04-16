const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const singup = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, firstName, lastName } = req.body;
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.send("User is already exist");
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      firstName,
      lastName,
      hashPassword,
    });
    const newUserCreated = await newUser.save();

    if (!newUserCreated) {
      return res.send("user is not created");
    }

    const token = generateToken(username);
    res.cookie("token", token);
    res.send("Signed sucessfully!");
  } catch (error) {
    console.log(error, "Something wrong");
  }
};

const singin = async (req, res) => {
  const body = req.body;
  const { username, password } = body;

  const user = await User.findOne({ username });

  console.log(user);
  if (!user) {
    res.send("user is not found");
  }
  const matchPassword = await bcrypt.compare(password, user.hashPassword);
  if (!matchPassword) {
    return res.send("password is not match");
  }
  console.log(matchPassword);
  const token = generateToken(username);
  res.cookie("token", token);
  res.send("Logged in!");
};

module.exports = {
  singin,
  singup,
};
