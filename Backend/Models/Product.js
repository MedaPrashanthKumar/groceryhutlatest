const mongoose=require("mongoose");
const ProductSchema=new mongoose.Schema({
    username:{type:String},
    category:{
        type:String,
        required:true
    },
    status:{
        type:Boolean
    },
    productid:{
        type:Number,
        required:true,
    },
   productname:{
        type:String,
        required:true
    },
    productbrand:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        // required:true
    },
    productprice:{
        type:Number,
        required:true
    },
    productdescription:{
        type:String,
        required:true
    },
    countryoforigin:{
        type:String,
        required:true
    },
    productimage:{
        type:String,
        required:true
    }
})

const Product=mongoose.model("product",ProductSchema)
module.exports=Product;