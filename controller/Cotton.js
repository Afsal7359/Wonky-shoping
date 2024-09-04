const Cotton = require("../Models/cotton");

module.exports={
    AddCottonCollections : async(req,res)=>{
        try {
            const datas = req.params.id;
            console.log(datas);
            
            // Check if the product already exists in the database
            const existingProduct = await Cotton.findOne({ Product: datas });
            
            if (existingProduct) {
                // If the product already exists, send a response indicating that it cannot be added again
                return res.status(409).json({
                    message: "Product already exists in the Cotton Collection",
                });
            }
            
            // If the product doesn't exist, create a new entry
            const CottonCollection = await Cotton.create({ Product: datas });
            res.redirect('/admin/Product')
        } catch (error) {
            console.log(error);
            res.send(500).json({
                message: "Server Error",
            })
            
        }
    },
    DeleteCottonCollection: async (req, res) => {
        try {
            const datas = req.params.id;

            // Delete the product from the collection
            const deletedProduct = await Cotton.findOneAndDelete({ _id: datas });

            if (!deletedProduct) {
                return res.status(404).json({
                    message: "Product not found in the Cotton Collection",
                });
            }

            res.redirect('/admin/Cotton')
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Server Error",
            });
        }
    },

    GetCottonCollections: async (req, res) => {
        try {
            // Retrieve all products from the collection
            const Data = await Cotton.find().populate('Product')
            console.log(Data,"cc");
            res.render('Admin/Cotton',{layout:"adminlayout",Data})
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Server Error",
            });
        }
    }
}