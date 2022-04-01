const exp = require("express")
const cartApiObj = exp.Router();
const errorHandler = require("express-async-handler")
const Cart = require("../Models/Cart");
const Product = require("../Models/Product");
cartApiObj.use(exp.json())

// add product to cart
cartApiObj.post("/add", errorHandler(async (req, res, next) => {
    //search whether this item is already added or not
    let product = await Cart.findOne({ "productid": req.body.product.productid ,username:req.body.username})
    if (product != null) {
        let userCart = await Cart.find({ username:req.body.username});
        res.send({ message: "Product already added to your cart", cartsize: userCart.length })
    }
    else {
        let cartItem = new Cart({
            username: req.body.username,
            productid: req.body.product.productid,
            productname:req.body.product.productname,
            productimage:req.body.product.productimage,
            quantity:1,
            productprice:req.body.product.productprice,
            i:1
        })
        await cartItem.save()
        let userCart = await Cart.find({  username:req.body.username});
        res.send({ message: "Product added to cart successfully", cartsize: userCart.length })
    }
}))


//get cart size by username
cartApiObj.get("/getcart/:username", errorHandler(async (req, res, next) => {
    let cartarray=[];
    let userCart = await Cart.find({ username: req.params.username })
    let userCartSize = 0;
    for(let i  of userCart){
        let product = await Product.findOne({productid:i.productid})
        if(product==null){
            let result =  await Cart.deleteOne({$and:[{username:req.params.username},{productid:i.productid}]})
        }
    }
    res.send({ cartsize: userCart.length, userCart: userCart })
}))


cartApiObj.put("/updatetotal/:username",errorHandler(async(req,res,next)=>{
         let count = await Cart.updateOne({$and:[{username:req.params.username},{productid:req.body.productid}]},{quantity:req.body.quantity,productprice:req.body.productprice})
         let success = await Cart.find({username:req.params.username})
         res.send({message:"updated successfully",a:success})
}))

cartApiObj.post("/removeprodfromcart",errorHandler(async(req,res,next)=>{
    let cartarray=[];
     let prodtobedeletedfromcart = await Cart.deleteOne( {username:req.body.username,"productid":req.body.id})
     let products = await Cart.find({username:req.body.username})
     for(let i  of products){
        let product = await Product.findOne({productid:i.productid})
        if(product!=null){
            cartarray.push(product)
        }  
    }
    res.send({message:"deleted successfully",product:cartarray})
}))

module.exports = cartApiObj;