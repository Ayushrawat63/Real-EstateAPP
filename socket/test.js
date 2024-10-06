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
        origin:"http://localhost:5173",
        methods: ['GET', 'POST'],
    },
})

let onlineUser=[];

const addUser=(userId,SockedId)=>{
  const userExits=onlineUser.find((user)=>user.userId===userId)
  if(!userExits)
  {
    onlineUser.push({
        userId,
        SockedId
    })
  }
}
const removeUser=(socketId)=>{
    onlineUser=onlineUser.filter((user)=>user.socketId!=socketId)
}

const getUser=(userId)=>{
    console.log(userId)
    return onlineUser.find((user)=>user.userId === userId)
}


io.on("connection",(socket)=>{
    // console.log(socket.id)
    socket.on("newUser",((userId)=>{
        addUser(userId,socket.id)
console.log("array = ",onlineUser)

    }))

    socket.on("sendMessage",(res)=>{
        console.log(res.reciverId,res.data.id)
        const reciver=getUser(res.reciverId)
        console.log(reciver)
       io.to(reciver.socketId).emit("getMessage",res.data)
    })
    socket.on("disconnected",(()=>{
      removeUser(socket.id)
    }))
})

httpServer.listen(4000,()=>{
    console.log("server started at port 4000")
})



//Socket context


import { createContext, useContext, useEffect, useState } from "react";

import {io} from 'socket.io-client'
import { AuthContext } from "./AuthContext";

const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const {currentUser} =useContext(AuthContext)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
     setSocket(io('http://localhost:4000'))
  },[]);

  useEffect(()=>{
   currentUser && socket?.emit("newUser", currentUser.id)
  },[currentUser,socket])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketContextProvider };
