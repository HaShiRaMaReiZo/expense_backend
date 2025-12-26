import IncomeCategory from '../models/IncomeCategory.js';

// @desc    Get user's income categories
// @route   GET /api/income-categories
// @access  Private
export const getIncomeCategories = async (req, res, next) => {
  try {
    let incomeCategory = await IncomeCategory.findOne({ userId: req.user.id });

    // If no income categories exist, create default
    if (!incomeCategory) {
      incomeCategory = await IncomeCategory.create({
        userId: req.user.id,
        categories: ['Salary', 'Pocket Money', 'Gift', 'Freelance', 'Investment', 'Bonus', 'Other'],
      });
    }

    res.status(200).json({
      success: true,
      data: incomeCategory.categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user's income categories
// @route   PUT /api/income-categories
// @access  Private
export const updateIncomeCategories = async (req, res, next) => {
  try {
    const { categories } = req.body;

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid categories array',
      });
    }

    const incomeCategory = await IncomeCategory.findOneAndUpdate(
      { userId: req.user.id },
      { categories },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: incomeCategory.categories,
    });
  } catch (error) {
    next(error);
  }
};

