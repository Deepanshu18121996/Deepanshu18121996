const mongoose = require('mongoose');
const schema = mongoose.Schema;
const adminlogin = new schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
//user_cart = table name/model name
module.exports = mongoose.model('admin', adminlogin);
