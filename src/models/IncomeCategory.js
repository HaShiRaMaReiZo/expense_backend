import mongoose from 'mongoose';

const incomeCategorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // One income category list per user
      index: true,
    },
    categories: {
      type: [String],
      required: true,
      default: ['Salary', 'Pocket Money', 'Gift', 'Freelance', 'Investment', 'Bonus', 'Other'],
    },
  },
  {
    timestamps: true,
  }
);

const IncomeCategory = mongoose.model('IncomeCategory', incomeCategorySchema);

export default IncomeCategory;

