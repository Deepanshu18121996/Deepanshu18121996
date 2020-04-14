const mongoose = require("mongoose");
const schema = mongoose.Schema;
const civil = new schema({
  cname: { type: String, required: true },
  nname: { type: String, required: true },
  file: { type: String, required: true },
  // category:{type:String,required:true,unique:true},
});
//civil-NOTES = table name/model name
module.exports = mongoose.model("civil_notes", civil);
