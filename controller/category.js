const Category = require("../Models/Category")
const cloudinary = require("../util/cloudinary");

module.exports={
    RenderCategoryPage :async(req,res)=>{
        try {
            const Categorys = await Category.find().sort({_id:-1})
            res.render('Admin/Category',{layout:"adminlayout",Data:Categorys})
        } catch (error) {
            res.status(500).json({message:"server error"})
        }
    },
    AddCategory:async(req,res)=>{
        try {
            const {heading} = req.body
            const result = await cloudinary.uploader.upload(req.file.path)
            console.log(result,"result");
            const image = result.url
            await Category.create({heading,image})
            console.log('Category Added successfully');
            res.redirect('/admin/Category'); 
        } catch (error) {
            console.log(error);
        }
    },
    EditCategory : async(req,res)=>{
        try {
            const id = req.params.id;
            const { heading } = req.body;
            const data = await Category.findById(id);
    
            if (!data) {
                return res.status(404).json({ message: 'Category not found' });
            }
    
            let image = data.image;
    
            if (req.file) {
                // Extract the public ID of the existing image from its URL
                const publicId = image.split('/').pop().split('.')[0];
    
                // Destroy the old image from Cloudinary
                const destroyResult = await cloudinary.uploader.destroy(publicId);
                console.log(destroyResult, "Image deletion result");
    
                // Upload the new image to Cloudinary
                const uploadResult = await cloudinary.uploader.upload(req.file.path);
                image = uploadResult.url; // Update image URL with the new one
                console.log(uploadResult, "Image upload result");
            }
    
            // Update the banner with new details
            await Category.findByIdAndUpdate(id, {
                heading,
                image
            });
    
            console.log("Updated successfully");
            res.redirect('/admin/Category');
        } catch (error) {
            console.error("Error updating Category:", error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    DeleteCategory : async(req,res)=>{
        try {
            const id = req.params.id
            await Category.findByIdAndDelete(id)
            console.log("Deleted Successfully");
            res.redirect('/admin/Category')
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Server Error'})
        }
    }
}