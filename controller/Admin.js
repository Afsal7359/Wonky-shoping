const Fashion = require("../Models/Fashion");

module.exports={
    RenderDashboard: async(req,res)=>{
        try {
            const FashionData = await Fashion.find().sort({_id: -1}).limit(3)
            res.render('Admin/Dashboard',{layout:"adminlayout",FashionData})
        } catch (error) {
            console.log(error);
        }
    },
   
}