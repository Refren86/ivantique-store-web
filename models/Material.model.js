import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

const MaterialModel =
  mongoose.models.material || mongoose.model('material', materialSchema);

export default MaterialModel;
