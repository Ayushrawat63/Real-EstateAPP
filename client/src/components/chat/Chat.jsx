import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import {format} from "timeago.js"
import { SocketContext } from "../../context/SocketContext";




function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const {socket} =useContext(SocketContext)
  //  socket = io('http://localhost:4000')
  // console.log(chat)
  // console.log(currentUser);
  // console.log(socket);
  const handleEndRef=useRef()

  useEffect(()=>{
 handleEndRef.current?.scrollIntoView({behavior:"smooth"})
  },[chat])

  const openThisChat = async (id, reciver) => {
    try {
      const res = await apiRequest.get(`/chats/unique/${id}`);
      // console.log(res.data)
      setChat({ ...res.data, reciver });
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async (e)=>{
    e.preventDefault();
    const formdata=new FormData(e.target)
    // console.log(formdata)
    const text=formdata.get('text')
    if(!text) return ;
    try{
      const res= await apiRequest.post(`/messages/add/${chat.id}`,{text})
      // console.log(res.data)
      setChat((prev)=>({...prev,messages:[...prev.messages,res.data.message]}))
      e.target.reset()
      socket.emit("sendMessage",{
        reciverId: chat.reciver.id,
        data:res.data
      })
    }
    catch(err){
     console.log(err)
    }
  }

  useEffect(()=>{
    const read=async()=>{
      try{
     await apiRequest.put(`/chats/read/${chat.id}`)
    //  console.log(res.data)
      }
      catch(err){
        console.log(err)
      }
    }

    if(chat && socket){
      console.log("insidethe box")
      socket.on("getMessage",(data)=>{
        // console.log(data)
        if(chat.id === data.chat.id){
          setChat((prev)=>({...prev,messages:[...prev.messages,data.message]}))
          read()
        }
      })
    }
    return () => {
      socket.off("getMessage");
    };
  },[socket,chat])

  // console.log(chat);
  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats.map((c) => {
          return (
              <div
                className="message"
                key={c.id}
                style={{
                  backgroundColor: c.seenBy.includes(currentUser.id) || chat?.id === c.id
                    ? "white"
                    : "#fecd514e",
                }}
                onClick={() => {
                  openThisChat(c.id, c.reciver);
                }}
              >
                <img
                  src={c.reciver.avatar || "newpic.jpg"}
                  alt="reciver avatar"
                />
                <span>{c.reciver.username}</span>
                <p>{c.lastMessage}</p>
              </div>
            
          );
        })}
      </div>
      {chat && (
        <div className="chatBox" key={chat.id}>
          <div className="top">
            <div className="user">
              <img src={chat.reciver.avatar || "newpic.jpg"} alt="reciver Avatar" />
              {chat.reciver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => {
              return (
                
                  <div className="chatMessage" key={message.id}
                   style={{
                    alignSelf: message.userId ===currentUser.id ? "flex-end":"flex-start",
                    textAlign: message.userId ===currentUser.id ? "right":"left"
                   }}
                  >
                    <p>{message.text}</p>
                    <span>{format(message.createdAt)}</span>
                  </div>               
              );
            })}
          <div ref={handleEndRef}></div>
          </div>
          <form onSubmit={submitHandler} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
