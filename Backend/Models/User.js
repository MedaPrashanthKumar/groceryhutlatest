const mongoose = require("mongoose")
const User = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("user", User)
