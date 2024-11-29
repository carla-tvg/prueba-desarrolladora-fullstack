const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]+$/,
  },
  date: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]+$/, 
  },
  description: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]+$/, 
  },
  img: {
    type: String,
    required: true,
  },
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;