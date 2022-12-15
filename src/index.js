const express=require("express")
const mongoose=require("mongoose")
const Authentication = require("./Middleware/authentication")
const userRoute=require("../route/user.router")
const emiRoute=require("../route/emi.router")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors());

app.get("/",(req,res)=>{
    res.send("home")
})
app.use("/users",userRoute)
app.use(Authentication)
app.use("/emi",emiRoute)


app.listen(8000,async()=>{
    await mongoose.connect("mongodb+srv://fullstack:khan1234@cluster0.9fqfogc.mongodb.net/mock10?retryWrites=true&w=majority")
    console.log("DB connected successfully");

})
