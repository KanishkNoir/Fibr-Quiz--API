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