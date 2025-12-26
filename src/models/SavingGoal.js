import mongoose from 'mongoose';

const depositSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  note: {
    type: String,
    trim: true,
    default: '',
  },
}, {
  _id: true,
  timestamps: true,
});

const savingGoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide a goal name'],
      trim: true,
    },
    targetAmount: {
      type: Number,
      required: [true, 'Please provide a target amount'],
      min: 0,
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide an end date'],
    },
    deposits: [depositSchema], // Array of deposits/transactions
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
savingGoalSchema.index({ userId: 1, createdAt: -1 });

// Virtual to calculate total saved
savingGoalSchema.virtual('totalSaved').get(function() {
  return this.deposits.reduce((sum, deposit) => sum + deposit.amount, 0);
});

// Ensure virtuals are included in JSON
savingGoalSchema.set('toJSON', { virtuals: true });

const SavingGoal = mongoose.model('SavingGoal', savingGoalSchema);

export default SavingGoal;

