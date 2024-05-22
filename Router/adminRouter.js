const express =require("express");
const Admin = require("../controller/Admin");
const router = express.Router();
const upload = require('../util/multer');
const banner = require("../controller/banner");
const fashion = require("../controller/fashion");
const offer = require("../controller/offer");
const category = require("../controller/category");
const Product = require("../controller/product");


router.get('/',Admin.RenderAdminHome);

//banner
router.get('/banner',banner.RenderAddBanner);
router.post('/Add-banner',upload.single("image"), banner.AddBanner);
router.post('/edit-banner/:id',upload.single("image"),banner.EditBanner);
router.get('/delete-banner/:id',banner.DeleteBanner);

//Fashion
router.get('/Fashion',fashion.RenderFashion);
router.post('/Add-Fashion',upload.single("image"), fashion.AddFashion);
router.post('/edit-Fashion/:id',upload.single("image"),fashion.EditFashion);
router.get('/delete-Fashion/:id',fashion.DeleteFashion);

//Offer
router.get('/Offer',offer.RenderOffer);
router.post('/Add-Offer',upload.single("image"), offer.AddOffer);
router.post('/edit-Offer/:id',upload.single("image"),offer.EditOffer);
router.get('/delete-Offer/:id',offer.DeleteOffer);

//Category
router.get('/Category',category.RenderCategoryPage);
router.post('/Add-Category',upload.single("image"),category.AddCategory);
router.post('/edit-Category/:id',upload.single("image"),category.EditCategory);
router.get('/delete-Category/:id',category.DeleteCategory);

//Product
router.get('/Product',Product.RenderProductPage);
router.post('/Add-Product',upload.array("image"),Product.AddProduct);
router.get('/delete-Product/:id',Product.DeleteProduct);



module.exports=router;