import mongoose from 'mongoose';

const furnitureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    depth: {
      type: Number,
    },
    style: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'style',
    },
    century: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'century',
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'country',
    },
    materials: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'materials',
    }],
  },
  {
    timestamps: true,
  }
);

const FurnitureModel =
  mongoose.models.furniture || mongoose.model('furniture', furnitureSchema);

export default FurnitureModel;
