const express= require("express")
const { connection } = require("mongoose")
const {userRouter} =require("./routers/user.routes")
const { isAuthenticated,isModerator,generateAccessToken,generateRefreshToken}= require("./middlewares/auth.middleware")

const app= express()
 app.use(express.json())
 app.use(cors)
 app.use("/users",userRouter)
 app.use(isAuthenticated,isModerator,generateAccessToken,generateRefreshToken)

 app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")

    }catch(err){
        console.log("Cannot connect to DB")
        console.log(err)
    }
    console.log(`Server is running at${process.env.port}`)
 })
 