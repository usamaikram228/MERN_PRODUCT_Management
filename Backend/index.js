const express = require("express");
require('./db/config');
const user = require('./db/user');
const product = require('./db/product');

const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const app = express();


app.use(express.json());
app.use(cors());

const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"uploads");
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")
        }
    })
   
}).single("image");



app.post('/register',async(req,res)=>
{
    let u = new user(req.body);
    let result = await u.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post('/login',async(req,res)=>{
    if(req.body.password && req.body.email)
    {
        let result = await user.findOne(req.body).select('-password');
        if(result)
        {
            res.send(result);
        }
        else
        {
            res.send({result:"User Not Found"});
        }
    }
    else{
        res.send({result:"User Not Found"});
    }
})

app.post('/add-product',upload,async(req,res)=>{
   // const{name,company,category,price,userId} = req.body;
   const updateimage = {
    data: fs.readFileSync(`uploads/${req.file.filename}`),
    contentType: req.file.mimetype
};
    //console.log(imageFileName);
    const newProduct = new product({
        name:req.body.name,
        company:req.body.company,
        category:req.body.category,
        price:req.body.price,
        userId:req.body.userId,
        image:updateimage // Store the image filename in the database
    });
    await newProduct.validate();

    let result = await newProduct.save();
    res.send(result);
})

app.get('/get-products',async(req,res)=>{
    let products = await product.find();
    if(products.length > 0)
    {
        res.send(products);
    }
    else{
        res.send("Nothing Found")
    }
})
app.get('/my-products/:userId',async (req,res)=>{
    let result =  await product.find({userId:req.params.userId});
    res.send(result);
})

app.delete('/delete-product/:_id',async(req,res)=>{
    let result = await product.deleteOne({_id : req.params._id});
    res.send(result);
})
app.listen(5000);