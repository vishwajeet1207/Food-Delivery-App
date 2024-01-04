const mongoose = require('mongoose')
// const mong=require("mongoose")
const { Schema ,model} = mongoose;
mongoose.connect("mongodb://0.0.0.0:27017/gofoodmern")
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

  });

  module.exports = mongoose.model('user',UserSchema)