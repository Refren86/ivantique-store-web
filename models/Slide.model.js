import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
    required: true,
  },
});

const SlideModel =
  mongoose.models.slide || mongoose.model('slide', slideSchema);

export default SlideModel;
