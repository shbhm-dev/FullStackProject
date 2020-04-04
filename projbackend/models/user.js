const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')
var userSchema = new Schema({

name : {
    type : String,
    required : true,
    maxlength : 33,
    trim : true
},
 lastname : {
    type : String,
    required : false,
    maxlength : 33,
    trim : true

 },
 email : {
     type : String,
     trim : true,
     required : true,
     unique : true
 },
 encry_password : {
     type : String,
     trim : true,
     required : true
 },
 userinfo : {
    type : String,
    trim : true

 },
 salt : String,
 role : {
     type : number,
     default : 0
 },
 purchases : {
     type : Array,
     default : []
 }


})

userSchema.virtual("password")
.set(function(password) {
     this._password = password
     this.salt = uuidv1();
     this.encry_password = this.securePassword(password)
})
.get(function () {

    return this._password
},{timestamps : true})



userSchema.method = {
    authenticare : function(password) {
        return securePassword(plainpassword) === this.encry_password
    },


    securePassword : function (plainpassword) {
        if(!plainpassword)
        return ""
        try{
            crypto.createHmac('sha256', secret)
            .update(plainpassword)
                   .digest('hex');


        }catch(err)
        {
            return '';
        }


    }


}

module.exports = mongoose.model("User",userSchema)