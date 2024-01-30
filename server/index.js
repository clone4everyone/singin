const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const UserRoutes = require("./routes/UserRoutes.js");
// const UserRouter = require("./routes/UserRoutes.jsx")
const app=express();
require("dotenv").config();

app.use(cors());
app.use(express.json());


app.use("/api/auth",UserRoutes)
mongoose.connect(`${process.env.MONGO_URL}`).then(()=>{
    console.log("mongoose connection successfully");
    
}).catch((err)=>{
    console.log("error occuring while connection mongoose",err)
})
const server=app.listen(7000,()=>{
    console.log("server is running  at port",process.env.PORT);
})