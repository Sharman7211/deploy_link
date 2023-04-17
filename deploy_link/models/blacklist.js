const mongoose= require("mongoose")

const blacklistSchema=  mongoose.Schema({
 token:{type:String, required:true},
 expiresAt:{type:Date,required:true}
})

const Blacklist= mongoose.model("blacklist",blacklistSchema)

module.exports={
    Blacklist
}