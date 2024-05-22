const Offer = require("../Models/Offer");
const cloudinary = require("../util/cloudinary");

module.exports={
    RenderOffer: async(req,res)=>{
        try {
            const Offers= await Offer.find().sort({_id: -1}).limit(4);
            res.render('Admin/Offer',{layout:"adminlayout",Data:Offers})
        } catch (error) {
            console.log(error);
        }
    },
    AddOffer:async(req,res)=>{
        try {
            const {heading,description} = req.body
            const result = await cloudinary.uploader.upload(req.file.path)
            console.log(result,"result");
            const image = result.url
            await Offer.create({heading,description,image})
            console.log('Offer Added successfully');
            res.redirect('/admin/Offer'); 
        } catch (error) {
            console.log(error);
        }
    },
    EditOffer : async(req,res)=>{
        try {
            const id = req.params.id;
            const { heading, description } = req.body;
            const data = await Offer.findById(id);
    
            if (!data) {
                return res.status(404).json({ message: 'Offer not found' });
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
            await Offer.findByIdAndUpdate(id, {
                heading,
                description,
                image
            });
    
            console.log("Updated successfully");
            res.redirect('/admin/Offer');
        } catch (error) {
            console.error("Error updating Offer:", error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    DeleteOffer : async(req,res)=>{
        try {
            console.log("llllll");
            const id = req.params.id
            await Offer.findByIdAndDelete(id)
            console.log("Deleted Successfully");
            res.redirect('/admin/Offer')
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Server Error'})
        }
    }
}