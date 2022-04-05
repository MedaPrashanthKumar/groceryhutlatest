const exp = require("express")
const app = exp();
const path = require("path")
require("dotenv").config()
const mongoose = require("mongoose")

// mongoose.set('useFindAndModify', false);
// validate token 
const validateToken = require('./Backend/Middlewares/VerifyToken')

app.use(exp.json())

// importing apis
const userApiObj = require("./Backend/APIS/user-api")
const adminApiObj=require("./Backend/APIS/admin-api")
const productApiObj = require('./Backend/APIS/product-api')
const cartApiObj = require("./Backend/APIS/cart-api")
// const cartApiObj=require("./backend/APIS/cart-api")
  app.use(exp.static(path.join(__dirname, 'dist/Final-Project')))
mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to DB")
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`server on port ${port}`))
});

// giving object to specified path
app.use("/user", userApiObj)
 app.use("/admin",adminApiObj)
 app.use("/product",productApiObj)
 app.use("/cart",cartApiObj)

// --------middlewares--------------

// for invalid path
app.use((req, res, next) => {
    res.send({ message: `${req.url} is invalid!` })
})

// for error in code
app.use((err, req, res, next) => {
    console.log(err)
    res.send({ message: "Something went wrong", reason: err.message })
})