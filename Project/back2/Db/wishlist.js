const mongoose = require('mongoose');
const schema = mongoose.Schema;
const user_wishlist = new schema({
  email: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  writer: { type: String, required: true },

  image: { type: String, required: true },
});
//wishlist = table name/model name
module.exports = mongoose.model('wishlist', user_wishlist);
