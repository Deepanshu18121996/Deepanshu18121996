const mongoose = require("mongoose");
const schema = mongoose.Schema;
const note = new schema({
  cname: { type: String, required: true },
  nname: { type: String, required: true },
  description: { type: String, required: true },
  file: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("notes", note);
