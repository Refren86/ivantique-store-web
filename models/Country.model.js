import { Schema, model } from 'mongoose';

const countrySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

export default model('country', countrySchema);
