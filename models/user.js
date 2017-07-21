const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  uid: Number,
  username: String,
  email:  String,
  password: String,
  events: [ Number ],
  friends: [ Number ],
  pic: String
});

// Methods for Dealing with Local Logins and Non-MyMLH Users in the future
userSchema.methods.hash = function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.check = function validatePassword(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
