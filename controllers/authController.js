const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("namr", name);
  if (!name || !email || !password) {
    res.status(400).json({ msg: "please enter all the details" });
  }
  console.log("all the users", User[0]);
  try {
    const existingUser = await User.findOne({ email });
    console.log("isexist", existingUser);
    if (existingUser) {
      return res.status(400).json({ msg: "user already exists" });
    }

    const newUser = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, config.get("jwtsecret"), {
      expiresIn: 3600,
    });

    res.json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "pls enter the Credentials" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ msg: "user does not exist" });
    }

    bcrypt.compare(password, existingUser.password).then((isMatch) => {
      if (!isMatch) res.status(400).json({ msg: "wrong user credential" });
    });
    console.log("id_ h ya nahi",existingUser._id);
    const token = jwt.sign({ id: existingUser._id }, config.get("jwtsecret"), {
      expiresIn: 3600,
    });

    res.json({
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const get_user = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => {
      res.json(user);
    });
};

module.exports = { signup, login, get_user };
