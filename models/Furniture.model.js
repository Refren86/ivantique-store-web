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
    images: [
      {
        type: String,
      },
    ],
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
    materials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'material',
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
    },
  },
  {
    timestamps: true,
  }
);

const FurnitureModel =
  mongoose.models.furniture || mongoose.model('furniture', furnitureSchema);

export default FurnitureModel;
