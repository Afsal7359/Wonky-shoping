const mongoose = require('mongoose')

const FashionSchema = new mongoose.Schema({
    heading:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        required:true,
        trim:true
    }
})

const Fashion = mongoose.model('Fashion',FashionSchema)
module.exports= Fashion