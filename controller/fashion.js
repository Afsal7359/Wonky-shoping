const Fashion = require("../Models/Fashion");
const cloudinary = require("../util/cloudinary");

module.exports={
    RenderFashion: async(req,res)=>{
        try {
            const Fashions= await Fashion.find().sort({_id: -1}).limit(10);
            res.render('Admin/Fashion',{layout:"adminlayout",Data:Fashions})
        } catch (error) {
            console.log(error);
        }
    },
    AddFashion:async(req,res)=>{
        try {
            const {heading} = req.body
            const result = await cloudinary.uploader.upload(req.file.path)
            console.log(result,"result");
            const image = result.url
            await Fashion.create({heading,image})
            console.log('Fashion Added successfully');
            res.redirect('/admin/Fashion'); 
        } catch (error) {
            console.log(error);
        }
    },
    EditFashion : async(req,res)=>{
        try {
            const id = req.params.id;
            const { heading } = req.body;
            const data = await Fashion.findById(id);
    
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
            await Fashion.findByIdAndUpdate(id, {
                heading,
                image
            });
    
            console.log("Updated successfully");
            res.redirect('/admin/Fashion');
        } catch (error) {
            console.error("Error updating banner:", error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    DeleteFashion : async(req,res)=>{
        try {
            console.log("llllll");
            const id = req.params.id
            await Fashion.findByIdAndDelete(id)
            console.log("Deleted Successfully");
            res.redirect('/admin/Fashion')
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Server Error'})
        }
    }
}