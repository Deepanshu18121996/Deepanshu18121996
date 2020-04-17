const mongoose = require("mongoose");
const schema = mongoose.Schema;
const computer = new schema({
  cname: { type: String, required: true },
  nname: { type: String, required: true },
  file: { type: String, required: true },
  // category:{type:String,required:true,unique:true},
});
//compurt_notes = table name/model name
module.exports = mongoose.model("compuer_notes", computer);
