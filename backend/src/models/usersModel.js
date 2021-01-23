const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = require('mongoose');
const { getCustomLabel } = require('../labels');
const { PLEASE_ENTER_YOUR_EMAIL } = require('../labels/userMessages');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, select: false },
  passwordConfirm: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String },
  passwordChangedAt: { type: String },
});

userSchema.pre('save', async function (next) {
  // Run the function if the password was modified
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.comparePasssword = async function (rawPassword, hashedPassword) {
  return await bcrypt.compare(rawPassword, hashedPassword);
};

userSchema.methods.hasPasswordChangedAfterJwtExpiry = function (JWTExpired) {
  if (this.passwordChangedAt) {
    const passwordChangedTimestamp = +this.passwordChangedAt.getTime() / 1000;

    return JWTExpired < passwordChangedTimestamp;
  }

  return false;
};

module.exports = mongoose.model('User', userSchema);
