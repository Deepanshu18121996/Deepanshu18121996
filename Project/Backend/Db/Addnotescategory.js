const mongoose = require("mongoose");
const schema = mongoose.Schema;
const add_notes_category = new schema({
  category: { type: String, required: true, unique: true },
});
//add_books_category = table name/model name
module.exports = mongoose.model("cat", add_notes_category);
