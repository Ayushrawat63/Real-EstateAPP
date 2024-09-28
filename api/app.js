const express= require('express')
const cookieParser=require('cookie-parser')
require('dotenv').config()
const app=express();
const authRouter=require('./routes/auth_routes')
const postRouter=require('./routes/post_routes')
const userRouter=require('./routes/user_routes')

app.use(express.json())
app.use(cookieParser())

app.use('/api/posts',postRouter)
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)


app.listen(3003,()=>{
    console.log("server started")
})