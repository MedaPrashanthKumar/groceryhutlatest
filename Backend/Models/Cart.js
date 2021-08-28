const mongoose=require("mongoose")
const Product=require("./Product")
const CartSchema=new mongoose.Schema({
    username:{type:String,required:true},
    productid:{type:Number,required:true},
    productname:{
        type:String,
        required:true
    },
    productimage:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    productprice:{
        type:Number,
        required:true
    },
})

let Cart=mongoose.model("Cart",CartSchema)
module.exports=Cart;