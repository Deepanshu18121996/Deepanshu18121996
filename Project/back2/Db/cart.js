const mongoose = require('mongoose');
const schema = mongoose.Schema;
const user_cart = new schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  writer: { type: String, required: true },
  current_price: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
});
//user_cart = table name/model name
module.exports = mongoose.model('cart', user_cart);
