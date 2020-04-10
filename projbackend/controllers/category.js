const Category = require("../models/category")

exports.getCategoryById = (req,res,next,id) => {

Category.findById(id).exec((err,cate) => {
if(err)
{
  return res.status(400).json({
      err : "Category not found "
  })
}

req.category = cate;
next()
})

}
exports.createCategory = (req,res) => {


const category = new Category(req.body)
category.save((error,category) => {
    if(error)
    {
      return res.status(400).json({
          err : "Not able to save category in DB"
      })
    }
    res.json({category})

})
}

exports.getCategory = (req,res) => {
return res.json(req.category)    

}

exports.getAllCategory = (req,res) => {
    Category.find().exec((err,categories) => {
        if(err)
    {
      return res.status(400).json({
          err : "Not able to find category in DB"
      })
    }
    res.json({categories})
    })

}

exports.updateCategory = (req,res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((error,updatedCategory) => {
        if(error)
        {
          return res.status(400).json({
              err : "Failed to update category in DB"
          })
        }
        res.json({updatedCategory})
    
    })

}

exports.removeCategory = (req,res) => {

    const category = req.category;
    category.remove((err,category) => {
        if(err)
        {
          return res.status(400).json({
              err : "Failed to update category in DB"
          })
        }
        res.json({
            message : "Deleted successfully"
        })
    })
}