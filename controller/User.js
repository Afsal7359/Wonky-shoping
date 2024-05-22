const mongoose = require("mongoose");
const Banner = require("../Models/Banner");
const Category = require("../Models/Category");
const Fashion = require("../Models/Fashion");
const Offer = require("../Models/Offer");
const Product = require("../Models/Product");

module.exports = {
    userHome: async(req, res)=>{
        try{

            const BannerData = await Banner.find().sort({_id: -1}).limit(3)
            const FashionData = await Fashion.find().sort({_id: -1}).limit(3)
            const OfferData = await Offer.find().sort({_id: -1}).limit(4);
            const ProductData = await Product.find().sort({_id: -1}).limit(8)
        res.render('User/Home',{BannerData,FashionData,OfferData,ProductData})
        }catch (err){
            console.log(err);
        }

    },
    UserShopPage:async(req,res)=>{
        try {
            const CategoryData = await Category.find().sort({_id: -1})
            res.render('User/Shop',{data:CategoryData})
        } catch (error) {
            console.log(error);
        }
    },
    UserProductDetailPage :async(req,res)=>{
        try {
            const id = req.params.id
            const data = await Product.find({code:id})
            // console.log(data[0].size[0],"ssssssssssiiiiiiiiii");
            console.log(data,"data");
            res.render('User/Product-details',{layout:"layout",data})
        } catch (error) {
            console.log(error);
        }
    },
   
    UserContactPage :async(req,res)=>{
        try {
            res.render('User/Contact')
        } catch (error) {
            console.log(error);
        }
    },
    UserCartPage :async(req,res)=>{
        try {
            console.log("hhhhhhhhhhh");
            res.render('User/Cart')
        } catch (error) {
            console.log(error);
        }
    },
    ProductPage:async(req,res)=>{
        try {
            const id = req.params.id;
            const data = await Product.find({ category: new mongoose.Types.ObjectId(id) }).populate('category');
            if(data.length !==0){
                var categoryname = data[0].category.heading
            }
            
            console.log(categoryname,"catgeory namee");
            console.log(id,"idddddddddddddd");
            console.log(data,"dataa");
            res.render('User/Product',{data,categoryname})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"server error"})
        }
    },
}