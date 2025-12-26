import Category from '../models/Category.js';

// @desc    Get user's categories
// @route   GET /api/categories
// @access  Private
export const getCategories = async (req, res, next) => {
  try {
    let category = await Category.findOne({ userId: req.user.id });

    // If no categories exist, create default
    if (!category) {
      category = await Category.create({
        userId: req.user.id,
        categories: ['Food', 'Transport', 'Phone', 'Shopping', 'Health', 'Entertainment', 'Bills', 'Other'],
      });
    }

    res.status(200).json({
      success: true,
      data: category.categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user's categories
// @route   PUT /api/categories
// @access  Private
export const updateCategories = async (req, res, next) => {
  try {
    const { categories } = req.body;

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid categories array',
      });
    }

    const category = await Category.findOneAndUpdate(
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
      data: category.categories,
    });
  } catch (error) {
    next(error);
  }
};

