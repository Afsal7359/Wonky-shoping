const Category = require("../Models/Category");
const Product = require("../Models/Product");
const cloudinary = require("../util/cloudinary");

module.exports={
    RenderProductPage:async(req,res)=>{
        try {
            const Data = await Product.find().sort({_id: -1})
            const category= await Category.find();
            res.render('Admin/Product',{layout:"adminlayout",Data,category})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"server Error"})
        }
    },
    AddProduct:async(req,res)=>{
        try {
            console.log(req.body);
            const {name,mrp,price,description,category,size}=req.body;
            let imagess = req.files;
            const imagesurl=[]
            console.log(imagess);
            
            const generateRandomCode = () => {
                return Math.floor(1000 + Math.random() * 9000).toString();
            };
              // Generate a unique 4-digit product code
        let productCode;
        let isUnique = false;
        while (!isUnique) {
            productCode = generateRandomCode();
            const existingProduct = await Product.findOne({ code: productCode });
            if (!existingProduct) {
                isUnique = true;
            }
        }
       

                for (let i = 0; i < imagess.length; i++) {
                    const result = await cloudinary.uploader.upload(imagess[i].path);
                    imagesurl.push(result.url);
                }
            
            console.log(imagesurl);

            await Product.create({code:productCode,name,mrp,price,description,size,category,image:imagesurl})
            console.log("Product Added Succesffuly");
            res.redirect('/admin/Product')
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Server Error"})
        }
    },
    DeleteProduct:async(req,res)=>{
        try {
            const id = req.params.id
            await Product.findByIdAndDelete(id);
            res.redirect('/admin/Product')
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"server error"})
        }
    }
}