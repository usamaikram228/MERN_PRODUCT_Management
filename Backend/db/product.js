const mongoose = require('mongoose');
const user = require('./user');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId:{
        type:String,
        required:true
    },
    image: {
        data: Buffer,
        contentType: String
    }
   
});
module.exports = mongoose.model('products',productSchema);