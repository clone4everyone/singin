
const {register, login}=require("../controller/UserController")
const UserRoutes=require('express').Router();

UserRoutes.post("/register",register)
UserRoutes.post("/login",login);
module.exports=UserRoutes