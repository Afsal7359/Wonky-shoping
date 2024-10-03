const feature = require("../Models/featured");


module.exports={
    AddFeatureCollections : async(req,res)=>{
        try {
            const datas = req.params.id;
            console.log(datas);
            
            // Check if the product already exists in the database
            const existingProduct = await feature.findOne({ Product: datas });
            
            if (existingProduct) {
                // If the product already exists, send a response indicating that it cannot be added again
                return res.status(409).json({
                    message: "Product already exists in the Feature Collection",
                });
            }
            
            // If the product doesn't exist, create a new entry
            const FeatureCollection = await feature.create({ Product: datas });
            res.redirect('/admin/Product')
        } catch (error) {
            console.log(error);
            res.send(500).json({
                message: "Server Error",
            })
            
        }
    },
    DeleteFeatureCollection: async (req, res) => {
        try {
            const datas = req.params.id;

            // Delete the product from the collection
            const deletedProduct = await feature.findOneAndDelete({ _id: datas });

            if (!deletedProduct) {
                return res.status(404).json({
                    message: "Product not found in the Feature Collection",
                });
            }

            res.redirect('/admin/Featured')
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Server Error",
            });
        }
    },

    GetFeatureCollections: async (req, res) => {
        try {
            // Retrieve all products from the collection
            const Data = await feature.find().populate('Product')
            console.log(Data,"cc");
            res.render('Admin/Features',{layout:"adminlayout",Data})
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Server Error",
            });
        }
    }
}