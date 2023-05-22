import mongoose from 'mongoose';

const centurySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

const CenturyModel =
  mongoose.models.century || mongoose.model('century', centurySchema);

export default CenturyModel;
