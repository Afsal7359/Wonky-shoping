var express = require('express');
const User = require('../controller/User');
var router = express.Router();

router.get('/',User.userHome);

router.get('/shop',User.UserShopPage)
router.get('/Products/:id',User.ProductPage);
router.get('/contact',User.UserContactPage)
router.get('/cart',User.UserCartPage);
// router.get('/products',User.UserProductDetailPage)
router.get('/:id',User.UserProductDetailPage)
router.get('/fashion/:id',User.UserFashionProduct);
    


module.exports = router;