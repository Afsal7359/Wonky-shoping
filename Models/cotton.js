const mongoose = require('mongoose')

const CottonSchema = new mongoose.Schema({
    Product:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Product',
    },
 
    
})

const Cotton = mongoose.model('Cotton',CottonSchema)
module.exports= Cotton