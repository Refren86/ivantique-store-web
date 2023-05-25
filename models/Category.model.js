import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
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
  furniture: [{ type: mongoose.Schema.Types.ObjectId, ref: 'furniture' }],
});

const CategoryModel =
  mongoose.models.category || mongoose.model('category', categorySchema);

export default CategoryModel;
