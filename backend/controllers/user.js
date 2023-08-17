const jwt = require("jsonwebtoken");
const User = require("../models/user");

const bcrypt = require("bcrypt");
exports.signUp = async (req, resp) => {
  const { username, email, password } = req.body;
  const x = validateInput(username, email, password);
  if (!x) {
    resp.status(400).json({ message: "missing fields" });
    return;
  }

  try {
    const hashed_password = await bcrypt.hash(password, 10);
    const new_user = {
      username: username,
      password: hashed_password,
      email: email,
    };
    const ans = await User.create(new_user);
    resp.status(200).json({ message: "user created" });
  } catch (error) {
    console.log(error);
    resp.status(400).json({ message: "user already exists" });
  }
};

exports.logIn = async (req, resp) => {
  const { username, password } = req.body;
  if (!validateInput(username, password)) {
    resp.status(400).json({ message: "missing params" });
  }

  try {
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = await jwt.sign({ userId: user.id }, process.env.JWT_KEY);
        resp.status(200).json({ token: token });
      } else {
        resp.status(400).json({ message: "password incorrect!" });
      }
    } else {
      resp.status(404).json({ message: "user not found" });
    }
  } catch (error) {}
};

function validateInput(...inputs) {
  let x = true;
  inputs.forEach((input) => {
    if (!input || input == "") {
      x = false;
    }
  });

  return x;
}
