const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const {signout,signup,signin,isSignedIn} = require('../controllers/auth')



router.post("/signin",[
    check("email","Email is required").isEmail(),
    check("password","Password is required").isLength({min : 1})
],signin)

router.post("/signup",[
    check("email","Email is required").isEmail(),
    check("password","Password is required").isLength({min : 1})
],signup)


router.get("/signout",signout)


module.exports = router