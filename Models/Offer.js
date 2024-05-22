const mongoose = require('mongoose')

const OfferSchema = new mongoose.Schema({
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

const Offer = mongoose.model('Offers',OfferSchema)
module.exports= Offer