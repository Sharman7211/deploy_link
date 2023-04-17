const jwt = require("jsonwebtoken")
const {Blacklist}= require("../models/blacklist")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
  };
  
  const generateRefreshToken = async (userId) => {
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET);
    const newRefreshToken = new RefreshToken({ token: refreshToken, user: userId });
    await newRefreshToken.save();
    return refreshToken;
  };
  

const isAuthenticated = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // check if token is blacklisted
      const blacklistToken = await Blacklist.findOne({ token: token });
      if (blacklistToken && blacklistToken.expiresAt > new Date()) {
        throw new Error('Token is blacklisted');
      }
  
      req.user = decoded;
      req.token = token;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Not authorized to access this resource' });
    }
  };
  const isModerator= async(req,res,next) =>{
    try{
        const user= await User.findOne({_id:req.user.id});
        if(user.role !== "Moderator"){
            throw new Error("Not authorized to acess this resources")
        }

    }catch(err){
        res.status(401).send({ error: error.message });
    }
  }
  module.exports={
    isAuthenticated,isModerator,generateAccessToken,generateRefreshToken
  }