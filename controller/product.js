const Category = require("../Models/Category");
const Fashion = require("../Models/Fashion");
const Product = require("../Models/Product");
const cloudinary = require("../util/cloudinary");

module.exports={
    RenderProductPage:async(req,res)=>{
        try {
            const Data = await Product.find().populate('category').populate('fashion').sort({_id: -1});
            const category= await Category.find({ isdeleted: { $ne: true } });
            const FashionData = await Fashion.find({ isdeleted: { $ne: true } });
            res.render('Admin/Product',{layout:"adminlayout",Data,category,FashionData})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"server Error"})
        }
    },
    AddProduct:async(req,res)=>{
        try {
            console.log(req.body);
            const {name,mrp,price,description,category,size,fashion}=req.body;
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

            await Product.create({code:productCode,name,mrp,price,fashion,description,size,category,image:imagesurl})
            console.log("Product Added Succesffuly");
            res.redirect('/admin/Product')
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Server Error"})
        }
    },
    EditProduct:async(req,res)=>{
    try {
        const id = req.params.id;
        console.log(req.body,"bodyddddd");
        console.log( req.files,"fileeeeeee");
        const {name,mrp,price,description,category,size,fashion}=req.body;
        const data = await Product.findById(id);
        if (!data) {
            return res.status(404).json({ message: 'Banner not found' });
        }
        let imagesurl=[]
        if(req.body.image){
            imagesurl = req.body.image;
        }
        const imagess = req.files
         console.log(imagesurl,"kkkkkkk");
        if(imagess.length !==0){
            console.log("file is heree");
            for (let i = 0; i < imagess.length; i++) {
                const result = await cloudinary.uploader.upload(imagess[i].path);
                imagesurl.push(result.url);
            }
        }
        console.log(imagesurl,"urlllll");
        await Product.findByIdAndUpdate(id, {
            name,
            mrp,
            price,
            description,
            category,
            size,
            fashion,
            image:imagesurl
        });
        console.log("edited sucessfully");
        res.redirect('/admin/Product')
    } catch (error) {
        console.log(error);
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