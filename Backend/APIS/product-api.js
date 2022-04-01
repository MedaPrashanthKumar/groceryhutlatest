const exp = require("express");
const productApiObj = exp.Router();
const errorHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
 const Product=require("../Models/Product");

productApiObj.use(exp.json())
require("dotenv").config()

// -----------UPDATE PRODUCT---------

productApiObj.put("/updateproduct", errorHandler ( async(req,res,next)=>{
    let updatedprod = await Product.updateOne(
        {productid:req.body.productid},
        {$set:
                 {category:req.body.category,
                productname:req.body.productname,
                productprice:req.body.productprice,
                productdescription:req.body.productdescription,
                productimage:req.body.productimage},multi:true}
        )
         await updatedprod.save()
        res.send({message:"updated"})
}))

// deleting product by admin
productApiObj.post("/removeproduct", errorHandler( async(req,res,next)=>{
    let prodtobedeleted = await Product.deleteOne(
        {productid:req.body.productid},
        {$set:
            {category:req.body.category,
           productname:req.body.productname,
           productprice:req.body.productprice,
           productdescription:req.body.productdescription,
           productimage:req.body.productimage},multi:true}

    )
    await prodtobedeleted.save();
    res.send({message:"product removed"})
}))


// -----------retriving product----------

productApiObj.get("/cardstohome",errorHandler ( async(req,res,next)=>{
    let success = await Product.find()
    res.send({message:success})
}))


// get dals-pulses component
productApiObj.get("/getproductsofdals",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Dals&Pulses"})
    res.send({message:dalsproduct})
}))

// get fours-grains
productApiObj.get("/getfloursgrains",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Flours & Grains"})
    res.send({message:dalsproduct})
}))

// get riceproducts
productApiObj.get("/getriceproducts",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Rice Products"})
    res.send({message:dalsproduct})
}))

// get dryfruits
productApiObj.get("/getdryfruits",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Dry Fruits"})
    res.send({message:dalsproduct})
}))

// get spicesmasalas
productApiObj.get("/getspicesmasalas",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Spices & Masalas"})
    res.send({message:dalsproduct})
}))

// get cooking oils
productApiObj.get("/getcookingoils",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Cooking Oils"})
    res.send({message:dalsproduct})
}))

// get Dairy Products
productApiObj.get("/getdairyproducts",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Diary Products"})
    res.send({message:dalsproduct})
}))

// get Dairy Products
productApiObj.get("/getsaltsSugars",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Salt,Sugar&Jaggery"})
    res.send({message:dalsproduct})
}))

// get BreakFast cereals
productApiObj.get("/getbreakfastcereals",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Breakfast Sereals"})
    res.send({message:dalsproduct})
}))

// get Others array
productApiObj.get("/getothersarray",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Other Grocery"})
    res.send({message:dalsproduct})
}))


// exporting admin-api
module.exports = productApiObj;