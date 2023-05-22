import mongoose from 'mongoose';

const styleSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

const StyleModel =
  mongoose.models.style || mongoose.model('style', styleSchema);

export default StyleModel;
