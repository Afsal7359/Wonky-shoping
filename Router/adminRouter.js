const express =require("express");
const Admin = require("../controller/Admin");
const router = express.Router();
const upload = require('../util/multer');
const banner = require("../controller/banner");
const fashion = require("../controller/fashion");
const offer = require("../controller/offer");
const category = require("../controller/category");
const Product = require("../controller/product");
const adminauth = require("../middlewaer/adminauth");


router.get('/wonky',adminauth.adminauth,Admin.RenderDashboard);
router.post('/login',Admin.PostLogin);
router.get('/login', Admin.GetLogin);

router.get('/logout',adminauth.adminauth, Admin.AdminLogout)

//banner
router.get('/banner',adminauth.adminauth,banner.RenderAddBanner);
router.post('/Add-banner',adminauth.adminauth,upload.single("image"),adminauth.adminauth, banner.AddBanner);
router.post('/edit-banner/:id',adminauth.adminauth,upload.single("image"),adminauth.adminauth,banner.EditBanner);
router.get('/delete-banner/:id',adminauth.adminauth,banner.DeleteBanner);

//Fashion
router.get('/Fashion',adminauth.adminauth,fashion.RenderFashion);
router.post('/Add-Fashion',adminauth.adminauth,upload.single("image"),adminauth.adminauth, fashion.AddFashion);
router.post('/edit-Fashion/:id',adminauth.adminauth,upload.single("image"),adminauth.adminauth,fashion.EditFashion);
router.get('/delete-Fashion/:id',adminauth.adminauth,fashion.DeleteFashion);

//Offer
router.get('/Offer',adminauth.adminauth,offer.RenderOffer);
router.post('/Add-Offer',adminauth.adminauth,upload.single("image"),adminauth.adminauth, offer.AddOffer);
router.post('/edit-Offer/:id',adminauth.adminauth,upload.single("image"),adminauth.adminauth,offer.EditOffer);
router.get('/delete-Offer/:id',adminauth.adminauth,offer.DeleteOffer);

//Category
router.get('/Category',adminauth.adminauth,category.RenderCategoryPage);
router.post('/Add-Category',adminauth.adminauth,upload.single("image"),adminauth.adminauth,category.AddCategory);
router.post('/edit-Category/:id',adminauth.adminauth,upload.single("image"),adminauth.adminauth,category.EditCategory);
router.get('/delete-Category/:id',adminauth.adminauth,category.DeleteCategory);

//Product
router.get('/Product',adminauth.adminauth,Product.RenderProductPage);
router.post('/Add-Product',adminauth.adminauth,upload.array("image"),adminauth.adminauth,Product.AddProduct);
router.post('/edit-product/:id',adminauth.adminauth,upload.array("image"),adminauth.adminauth,Product.EditProduct);
router.get('/delete-Product/:id',adminauth.adminauth,Product.DeleteProduct);


module.exports=router;
