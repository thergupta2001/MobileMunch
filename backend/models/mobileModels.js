const mongoose = require('mongoose');

const mobileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  memory: {
    type: String,
    required: true,
  },
  image: {
     type: String,
     required: true
  }
});

const MobileModel = mongoose.model('MobileModel', mobileSchema);

module.exports = MobileModel;