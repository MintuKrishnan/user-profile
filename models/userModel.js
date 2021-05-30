const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    unique: [true, 'Already have a account please logIn'],
    required: [true, 'Email is required'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provied a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provied a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },

  about: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create() !.update()
userSchema.pre('save', async function (next) {
  // Hash the password with cost of 8
  this.password = await bcrypt.hash(this.password, 8);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
