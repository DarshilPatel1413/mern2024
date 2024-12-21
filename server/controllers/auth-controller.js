const Usermodel = require("../models/user-model");
const bcrypt = require("bcrypt");

const home = async (req,res) => {
    try {
        res.status(200).send("Welcome to mern 2023 using controllerr");
    } catch (error) {
        console.log(error);        
    }
}


// const userdata = {
//     username: "demo",
//     email: "demo.com",
// }

const register = async (req,res) => {
    try {
        
        // await usermodel.insertMany(userdata);
        // console.log("inserted succesfully");


        const {username, email, phone , password} = req.body;


        // this is for check existance of email
        const userExist = await Usermodel.findOne({email});
        if(userExist){
            return( res.status(400).json({msg:"email already exists"}),
            console.log("email already exists"));
        }

        // hash the pwd
        const saltRound = 10; 
        const hash_password = await bcrypt.hash(password, saltRound);
          

       const userCreated =  await Usermodel.create({username, email, phone, password:hash_password});
        
        res.status(201).json({msg:userCreated});
        console.log(req.body);
    } catch (error) {
       res.status(400).json({msg : "page not found"})    ; 
    }
}

module.exports = {home , register};