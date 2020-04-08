const express = require('express')
const router = express.Router()

const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,removeCategory} = require('../controllers/category')
const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth')
const {getUserByID} = require('../controllers/user')



router.param("userID",getUserByID)
router.param("categoryID",getCategoryById)

//Actual Routes

router.post("/category/create/:userID",isSignedIn,isAuthenticated,isAdmin,createCategory)
router.post("/category/:categoryID/:userID",isSignedIn,isAuthenticated,isAdmin,updateCategory)
router.delete("/category/:categoryID/:userID",isSignedIn,isAuthenticated,isAdmin,removeCategory)
router.get("/category/:categoryID",getCategory)
router.get("/category/categories",getAllCategory)
router.delete("")




module.exports = router;