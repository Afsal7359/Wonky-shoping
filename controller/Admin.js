module.exports={
    RenderAdminHome: async(req,res)=>{
        try {
            res.render('Admin/Dashboard',{layout: "adminlayout"})
        } catch (error) {
            console.log(error);
        }
    },
   
}