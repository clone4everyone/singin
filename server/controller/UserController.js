const User=require("../model/UserModel.js");
const bcrypt=require("bcrypt");

exports.register=async(req,res,next)=>{
try{
  const {username,email,password}=req.body;
  const userNameExist= await User.findOne({username});
  if(userNameExist){
    return res.json({msg:"userName Already Exist", status:false});
  }
  const emailExist=await User.findOne({email});
  if(emailExist){
    return res.json({msg:"email already exist", status : false})
  }
  const hashPassword=await bcrypt.hash(password,10);
  const user=await User.create({
    username,
    email,
    password:hashPassword
  });
  delete user.password;
 return res.json({status:true,user})
}catch(err){
    next(err)
}
}


exports.login=async(req,res,next)=>{
  try{
     const {username,password}=req.body;
     const user=await User.findOne({username});
     console.log(user)
     if(!user){
      return res.json({status:false,msg:"USername not exist"});
     }

     const ValidPassword=await bcrypt.compare(password,user.password);
     if(!ValidPassword){
      return res.json({status:false,msg:"Password is Incorrect"})
     }

     return res.json({status:true,user})

  }
  catch(err){
    next(err)
  }
}