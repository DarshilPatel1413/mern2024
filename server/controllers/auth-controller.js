const User = require("../models/user-model");
const Usermodel = require("../models/user-model");
const bcrypt = require("bcrypt");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to mern 2023 using controllerr");
  } catch (error) {
    console.log(error);
  }
};

// const userdata = {
//     username: "demo",
//     email: "demo.com",
// }

const register = async (req, res) => {
  try {
    // await usermodel.insertMany(userdata);
    // console.log("inserted succesfully");

    const { username, email, phone, password } = req.body;

    // this is for check existance of email
    const userExist = await Usermodel.findOne({ email });
    if (userExist) {
      return (
        res.status(400).json({ msg: "email already exists" }),
        console.log("email already exists")
      );
    }

    // hash the pwd
    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await Usermodel.create({
      username,
      email,
      phone,
      password: hash_password,
    });

    res.status(201).json({
      msg: "registration sucessful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
    console.log(req.body);
  } catch (error) {
    res.status(400).json({ msg: "page not found" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: "invalid incrediantils" });
    }

    const user = await bcrypt.compare(password, userExist.password);

    console.log("match pwd");
    if (user) {
      res.status(200).json({
        msg: "login sucessful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "invalid email or pwd" });
    }
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

module.exports = { home, register, login };
