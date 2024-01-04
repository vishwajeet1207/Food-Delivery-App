const mongoose = require('mongoose')
// const mong=require("mongoose")
const { Schema ,model} = mongoose;
mongoose.connect("mongodb://0.0.0.0:27017/gofoodmern")

const OrderSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_data:{
        type:Array,
        required:true
    }
})

module.exports = mongoose.model('order',OrderSchema)