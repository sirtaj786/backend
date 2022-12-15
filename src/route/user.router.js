
const express = require("express")
const User = require("../src/Schema/User.schema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoute= express.Router();


userRoute.post("/signup",async(req,res)=>{
    console.log("SIGNUP")
    const { name, email, password } = req.body;
    await bcrypt.hash(password, 4, function (err, hash) {
      if (err) {
        res.send("Please try again");
      }
      const user = new User({
        name,
        email,
        password: hash,
      });
      user.save();
      res.send("SignUp Successfull ");
    });
})

userRoute.post("/login",async(req,res)=>{
    console.log("Login")
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.send("User not Found");
    }
    console.log(user);
    const hash = user.password;
    const userId = user._id;
    bcrypt.compare(password, hash, function (err, result) {
        console.log(result)
      if (result) {
        var token = jwt.sign({ email, userId }, "abcd");
        return res.send({ message: "Login Successfull", token: token,user:user.name });
      } else {
        res.send("Invalid Credentials");
      }
    });
    
   

})

module.exports= userRoute