const prisma = require("../lib/prismaClient");
const bcrypt=require('bcrypt')

const allUsers = async (req, res) => {
  try {
    const users=await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({message:"Failed to fetch all users!"});
  }
};
const uniqueUser = async (req, res) => {
    const id=req.params.id;
    const  data=req.payload;
    if(data.id!=id) return res.status(403).json({message:"Not Autherized"})
  try {
     const user= await prisma.user.findUnique({
        where:{id:data.id}
     })
     res.status(200).json(user)
  } catch (err) {
    res.status(500).json({message:"Failed to fetch unique user!"});
  }
};
const updateUser = async (req, res) => {
    const id=req.params.id;
    // console.log(id)
    const  data=req.payload;
    // console.log(data.id)
    const {password,avatar,...body}=req.body;
    if(data.id!=id) return res.status(403).json({message:"Not Autherized"})
        let hasedPassword=""
  try {
    // const salt= await bcrypt
     if(password)
     {
        const salt=await bcrypt.genSalt(10);
         hasedPassword=await bcrypt.hash(password,salt);
     }
     const updatedUser=await prisma.user.update({
        where:{id:data.id},
        data:{
            ...body,
            ...(hasedPassword && {password:hasedPassword}),
            ...(avatar && {avatar})
            
        }
     })
     const {password:updatedPassword,...userinfo}=updatedUser
     res.status(200).json(userinfo)
  } catch (err) {
    console.log(err)
    res.status(500).json({message:"Failed to update user!"});
  }
};
const deleteUser = async (req, res) => {
    const id=req.params.id;
    // console.log(id)
    const  data=req.payload;
    // console.log(data.id)
    if(data.id!=id) return res.status(403).json({message:"Not Autherized"})
  
  try {
    await prisma.user.delete({
        where:{id:data.id}
    })
    res.status(200).json({message:"User deleted successfully"})
  } catch (err) {
    res.status(500).json({message:"Failed to delete user!"});
  }
};

module.exports = {
  allUsers,
  uniqueUser,
  updateUser,
  deleteUser,
};
