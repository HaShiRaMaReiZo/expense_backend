import Expense from '../models/Expense.js';
import SavingGoal from '../models/SavingGoal.js';
import Category from '../models/Category.js';

// @desc    Export expenses as CSV
// @route   GET /api/export/csv
// @access  Private
export const exportCSV = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });

    // Create CSV content
    const headers = ['Date', 'Category', 'Amount', 'Note'];
    const rows = expenses.map((e) => [
      new Date(e.date).toLocaleDateString(),
      e.category,
      e.amount.toString(),
      e.note || '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=expenses-${new Date().toISOString().split('T')[0]}.csv`);
    res.send(csvContent);
  } catch (error) {
    next(error);
  }
};

// @desc    Get full backup
// @route   GET /api/backup
// @access  Private
export const getBackup = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    const savingGoal = await SavingGoal.findOne({ userId: req.user.id });
    const category = await Category.findOne({ userId: req.user.id });

    const backup = {
      expenses: expenses.map((e) => ({
        amount: e.amount,
        category: e.category,
        note: e.note,
        date: e.date,
      })),
      savingGoal: savingGoal
        ? {
            targetAmount: savingGoal.targetAmount,
            endDate: savingGoal.endDate,
            createdDate: savingGoal.createdDate,
          }
        : null,
      categories: category ? category.categories : null,
      exportDate: new Date().toISOString(),
    };

    res.status(200).json({
      success: true,
      data: backup,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Restore from backup
// @route   POST /api/backup/restore
// @access  Private
export const restoreBackup = async (req, res, next) => {
  try {
    const { expenses, savingGoal, categories } = req.body;

    // Restore expenses
    if (expenses && Array.isArray(expenses)) {
      // Delete existing expenses
      await Expense.deleteMany({ userId: req.user.id });
      // Create new expenses
      if (expenses.length > 0) {
        await Expense.insertMany(
          expenses.map((e) => ({
            ...e,
            userId: req.user.id,
            date: new Date(e.date),
          }))
        );
      }
    }

    // Restore saving goal
    if (savingGoal) {
      await SavingGoal.findOneAndUpdate(
        { userId: req.user.id },
        {
          userId: req.user.id,
          targetAmount: savingGoal.targetAmount,
          endDate: new Date(savingGoal.endDate),
          createdDate: new Date(savingGoal.createdDate),
        },
        { upsert: true, new: true }
      );
    } else {
      await SavingGoal.deleteOne({ userId: req.user.id });
    }

    // Restore categories
    if (categories && Array.isArray(categories)) {
      await Category.findOneAndUpdate(
        { userId: req.user.id },
        { categories },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Backup restored successfully',
    });
  } catch (error) {
    next(error);
  }
};

