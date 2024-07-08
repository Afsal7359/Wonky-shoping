const mongoose = require('mongoose')

const BannerSchema = new mongoose.Schema({
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
    },
    
})

const Banner = mongoose.model('Banner',BannerSchema)
module.exports= Banner