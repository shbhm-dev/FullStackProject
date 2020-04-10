const express = require('express')
const router = express.Router()

const {getUserByID} = require("../controllers/user")
const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth')
const {getAllUniqueCategories,getProductById,createProduct,getProduct,photo,updateProduct,deleteProduct,getAllProducts} = require("../controllers/product")

//Middlewares

router.param("userId",getUserByID)
router.param("productId",getProductById)

//Actural Routes
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)
router.get("/product/:productId",getProduct)
router.get("/products",getAllProducts)
router.get("/product/photo/:productId",photo)
router.get("/products/categories",getAllUniqueCategories)

module.exports = router;