const express= require('express')
const {createServer} =require('http')
const {Server} = require('socket.io')
const cors =require('cors')


const app=express()

const httpServer =createServer(app)

app.use(cors())

const io = new Server(httpServer,
    {
    cors:{
        origin:"https://boisterous-sawine-38f5a7.netlify.app"
    },
})

let onlineUser=[];

const addUser=(userId,socketId)=>{
  const userExits=onlineUser.find((user)=>user.userId===userId)
  if(!userExits)
  {
    onlineUser.push({
        userId,
        socketId
    })
  }
   else{
    userExits.socketId=socketId;
   }
}
const removeUser=(socketId)=>{
    onlineUser=onlineUser.filter((user)=>user.socketId!=socketId)
}

const getUser=(userId)=>{
    return onlineUser.find((user)=>user.userId === userId)
}


io.on("connection",(socket)=>{
    // console.log(socket.id)
    socket.on("newUser",((userId)=>{
        addUser(userId,socket.id)
// console.log("array = ",onlineUser)

    }))

    socket.on("sendMessage",(res)=>{
        // console.log("data=",res.reciverId,res.data)
        const reciver=getUser(res.reciverId)
        // console.log("getuser chal gaya",reciver)
        if (reciver) {
            io.to(reciver.socketId).emit("getMessage", res.data);
          } else {
            console.log("Recipient not found for user ID:", res.reciverId);
          }
    })
    socket.on("disconnected",(()=>{
      removeUser(socket.id)
    }))
})

httpServer.listen(4000,()=>{
    console.log("server started at port 4000")
})