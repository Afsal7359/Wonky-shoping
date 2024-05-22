
const Banner = require("../Models/Banner");
const cloudinary = require("../util/cloudinary");

module.exports={
    RenderAddBanner: async(req,res)=>{
        try {
            const banner= await Banner.find().sort({_id: -1}).limit(10);
            res.render('Admin/Banner',{layout:"adminlayout",Data:banner})
        } catch (error) {
            console.log(error);
        }
    },
    AddBanner:async(req,res)=>{
        try {
            const {heading,description} = req.body
            const result = await cloudinary.uploader.upload(req.file.path)
            console.log(result,"result");
            const image = result.url
            await Banner.create({heading,description,image})
            console.log('Banner Added successfully');
            res.redirect('/admin/banner'); 
        } catch (error) {
            console.log(error);
        }
    },
    EditBanner : async(req,res)=>{
        try {
            const id = req.params.id;
            const { heading, description } = req.body;
            const data = await Banner.findById(id);
    
            if (!data) {
                return res.status(404).json({ message: 'Banner not found' });
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
            await Banner.findByIdAndUpdate(id, {
                heading,
                description,
                image
            });
    
            console.log("Updated successfully");
            res.redirect('/admin/banner');
        } catch (error) {
            console.error("Error updating banner:", error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    DeleteBanner : async(req,res)=>{
        try {
            console.log("llllll");
            const id = req.params.id
            await Banner.findByIdAndDelete(id)
            console.log("Deleted Successfully");
            res.redirect('/admin/banner')
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Server Error'})
        }
    }
}