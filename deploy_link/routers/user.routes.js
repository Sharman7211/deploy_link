const express= require("express");

const userRouter= express.Router()

const {User}= require("../models/user.model")
const {Blacklist}= require("../models/blacklist.js")
const {isAuthenticated,isModerator,generateAccessToken,generateRefreshToken}= require("../middlewares/auth.middleware")


userRouter.post("/blogs", isAuthenticated,async(req,res)=>{
    try{
        const blog= new Blog({
            title:req.body.title,
            content:req.body.content,
            author:req.user._id

        });
        await blog.save()
        res.send(blog)
    }catch(error){
        res.status(500).send(error.message)
    }

});

userRouter.get("/blogs", isAuthenticated,async(req,res)=>{
    try{
        const blog= await  Blog.find().populate("author");
        
        res.send(blog)
    }catch(error){
        res.status(500).send(error.message)
    }

});


router.delete('/blogs/:id', isAuthenticated, async (req, res) => {
    try {
      const blog = await Blog.findOne({ _id: req.params.id, author: req.user._id });
      if (!blog) {
        return res.status(404).send('Blog not found');
      }
  
      await blog.remove();
  
      res.send('Blog deleted successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.delete('/blogs/:id', isAuthenticated, isModerator, async (req, res) => {
    try {
      const blog = await Blog.findOne({ _id: req.params.id });
      if (!blog) {
        return res.status(404).send('Blog not found');
      }
  
      await blog.remove();
  
      res.send('Blog deleted successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  

  module.exports={
    userRouter
  }