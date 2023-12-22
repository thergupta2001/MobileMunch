const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
     email: {
          type: String,
          required: true,
          unique: true
     },
     username: {
          type: String,
          required: true,
          unique: true
     },
     password: {
          type: String,
          required: true
     },
     orders: [
          {
               mobileName: { type: String },
               mobileModel: { type: String },
               price: { type: Number },
          }
     ],
})

const User = mongoose.model('User', userSchema)

module.exports = User