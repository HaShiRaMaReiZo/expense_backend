import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // One category list per user
      index: true,
    },
    categories: {
      type: [String],
      required: true,
      default: ['Food', 'Transport', 'Phone', 'Shopping', 'Health', 'Entertainment', 'Bills', 'Other'],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;

