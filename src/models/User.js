const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Must be six characters long'],
      select: false
    },
    isDeactivated: {
      type: Boolean,
      default: false,
    },
    role: {
        type: String,
        enum: ['user', 'others'],
        default: 'others'
    }
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User