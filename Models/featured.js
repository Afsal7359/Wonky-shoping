const mongoose = require('mongoose')

const FeaturedSchema = new mongoose.Schema({
    Product:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Product',
    },
 
    
})

const feature = mongoose.model('feature',FeaturedSchema)
module.exports= feature