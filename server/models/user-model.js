const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// schema of data
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isadmin: {
    type: String,
    default: false,
  },
});

// for hashing the password
// userSchema.pre("save", async function (next) {
//   console.log("pre method", this);
//   const user = this;
//   if (!user.isModified("password")) {
//     return next();
//   }

//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hash_password = await bcrypt.hash(user.password, salt);
//     user.password = hash_password;
//     console.log(user.password);
//     next();
//   } catch (error) {
//     console.log("Error hashing password:", error);
//     next(error);
//   }
// });



// json web token

userSchema.methods.generateToken = async function() {
  try {
    return jwt.sign({
      userId: this._id.toString(),
      email: this.email,
      isadmin: this.isadmin,
    },
     process.env.JWT ,
     {
      expiresIn: "30d",
     }
   );
  } catch (error) {
    console.error(error);
  }
};


// model for data

const User = new mongoose.model("User", userSchema);

module.exports = User;
