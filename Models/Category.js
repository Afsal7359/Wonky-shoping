const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    heading:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        required:true,
        trim:true
    },
    isdeleted:{
        type:Boolean,
        require:true,
        default:false
    }
   
})

const Category = mongoose.model('Category',CategorySchema)
module.exports= Category