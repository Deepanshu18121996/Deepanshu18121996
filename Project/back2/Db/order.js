const mongoose = require('mongoose');
const schema = mongoose.Schema;
const user_order = new schema(
    {  
        email:{type:String,required:true},
        name:{type:Array,required:true},
        image:{type:Array,required:true},
        price:{type:Array,required:true},
        total:{type:String,required:true},
        Created_at:{type:Date,default:Date.now()}   
    }
);
//order = table name/model name
module.exports = mongoose.model('order',user_order);