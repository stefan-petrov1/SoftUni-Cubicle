const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true, maxlength: [1000, 'Description must not be more than 1000 characters'] },
  cubes: [{ type: mongoose.Types.ObjectId, ref: 'Cube' }]
});

accessorySchema.virtual('cubesAsArray').get(function () {
  return this.cubes;
});

accessorySchema.path('imageUrl').validate((val) => {
  urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

const Accessory = mongoose.model('Accessory', accessorySchema);
module.exports = Accessory;
