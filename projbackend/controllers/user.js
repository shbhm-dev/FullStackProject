const User = require('../models/user')
const Order = require('../models/order')

exports.getUserByID = (req,res,next,id) => {

    User.findById(id).exec((err,user)=>{
        if(err || !user)
        {
           return res.status(400).json({error : "No User found"})
        }
        req.profile = user
        next()

    })

}

exports.getUser = (req,res) => {
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    return res.json(req.profile)
}


exports.updateUser = (req,res) => {
    User.findByIdAndUpdate({
        _id : req.profile._id},
        {$set : req.body},
        {new : true , useFindAndModify : false},
        (err,user) => {
            user.salt = undefined
            user.encry_password = undefined
            res.json(user)
        }

        )
}

exports.userPurchaseList = (req,res) => {
    Order.find({user : req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=> {
        if(err)
        {
           return res.status(400).json({
                err : "Error in the order list"
            })
        }
        return res.json(order)
    })

}
exports.pushOrderInPurchaseList = (req,res,next)=> {
    let purchases = []
    req.body.order.products.foreach(product => {
        purchases.push({
            _id : product._id,
            name : product.name,
            description : product.description,
            category : product.category,
            quantity : product.quantity,
            amount : req.body.order.amount,
            transaction_id : req.body.order.transaction_id
        })
    })
    //STORE IN display: 'block',
    
    User.findOneAndUpdate(
    
            {_id : req.profile._id},
            {$push : {purchases : purchases}},
            {new : true},
            (err,purchases) => {
                if(err)
                {
                res.status(400).json({
                    err : "Unable to save purchase list"
                })
            }
                next()
            }
        
        
    )


}
