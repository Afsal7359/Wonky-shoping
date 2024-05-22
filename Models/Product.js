const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        trim:true,
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    mrp:{
        type:Number,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:[],
        required:true,
        trim:true
    },
    size:{
        type:[],
        required:true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }
})

const Product = mongoose.model('Product',ProductSchema)
module.exports= Product