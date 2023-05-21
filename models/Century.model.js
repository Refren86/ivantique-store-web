import { Schema, model } from 'mongoose';

const centurySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

export const CenturySchema = model('century', centurySchema);
