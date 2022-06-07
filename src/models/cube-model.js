const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true, maxlength: [1000, 'Description must not be more than 1000 characters'] },
  difficultyLevel: {
    type: Number,
    required: true,
    min: [1, 'Difficulty level {VALUE} is invalid. It must be from 1 to 6.'],
    max: [6, 'Difficulty level {VALUE} is invalid. It must be from 1 to 6.'],
  },
  accessories: [{ type: mongoose.Types.ObjectId, ref: 'Accessory' }],
  creatorId: { type: String, required: true }
});

cubeSchema.path('imageUrl').validate((val) => {
  urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;
