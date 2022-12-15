
const express = require("express")
const bcrypt = require("bcrypt");
const User = require("../src/Schema/User.schema")
const jwt = require("jsonwebtoken");
const emiRoute= express.Router();


emiRoute.get("/",(req,res)=>{
    res.send("home")
})

emiRoute.get("/getProfile",async (req,res)=>{
    const {email}=req.body;
    // console.log(userId)
    const logedInUser = await User.findOne({ email});
    res.send({userName:logedInUser.name,userEmail:logedInUser.email})
})


emiRoute.post("/calculateEMI",async(req,res)=>{
    const {loanAmount,Interest,Tenure}=req.body;
     let rateInterest=Interest/(12*100);
    // console.log("RATE",rateInterest)
    // let emi=100000 * 0.011667* (1 + 0.011667)*36 / ((1 + 0.011667)*36 - 1)
    // console.log("emi",emi)
   const EMI = (loanAmount * rateInterest *(( 1+ rateInterest)*Tenure )/ (( ( 1 + rateInterest )*Tenure) - 1 ))
//    console.log("EMI:---",EMI)
const InterestAmount=EMI*Tenure
const totalAmount=loanAmount+(InterestAmount);
   res.send({total:totalAmount,emipay:EMI,interestpay:InterestAmount})

})
module.exports = emiRoute