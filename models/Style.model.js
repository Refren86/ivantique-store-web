const { model, Schema } = require('mongoose');

const styleSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = model('style', styleSchema);
