import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

const CountryModel =
  mongoose.models.country || mongoose.model('country', countrySchema);

export default CountryModel;
