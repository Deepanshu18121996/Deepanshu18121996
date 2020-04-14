const mongoose = require('mongoose');
const schema = mongoose.Schema;
const user_account = new schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        contact:{type:String,required:true,unique:true},
        address:{type:String,required:true},
        pincode:{type:String,required:true},
        state:{type:String,required:true}   
    }
);
//user_account = table name/model name
module.exports = mongoose.model('user_account',user_account);