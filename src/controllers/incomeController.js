import Income from '../models/Income.js';

// @desc    Get all income
// @route   GET /api/income
// @access  Private
export const getIncome = async (req, res, next) => {
  try {
    const { category, startDate, endDate } = req.query;
    const userId = req.user.id;

    // Build query
    const query = { userId };

    if (category) {
      query.category = category;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const income = await Income.find(query).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: income.length,
      data: income,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single income
// @route   GET /api/income/:id
// @access  Private
export const getIncomeById = async (req, res, next) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: 'Income not found',
      });
    }

    res.status(200).json({
      success: true,
      data: income,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create income
// @route   POST /api/income
// @access  Private
export const createIncome = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;

    const income = await Income.create(req.body);

    res.status(201).json({
      success: true,
      data: income,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update income
// @route   PUT /api/income/:id
// @access  Private
export const updateIncome = async (req, res, next) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: 'Income not found',
      });
    }

    Object.assign(income, req.body);
    await income.save();

    res.status(200).json({
      success: true,
      data: income,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete income
// @route   DELETE /api/income/:id
// @access  Private
export const deleteIncome = async (req, res, next) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: 'Income not found',
      });
    }

    await income.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get monthly income statistics
// @route   GET /api/income/stats/monthly
// @access  Private
export const getMonthlyIncomeStats = async (req, res, next) => {
  try {
    const { year, month } = req.query;
    const userId = req.user.id;

    const startDate = new Date(year || new Date().getFullYear(), (month || new Date().getMonth() + 1) - 1, 1);
    const endDate = new Date(year || new Date().getFullYear(), month || new Date().getMonth() + 1, 0, 23, 59, 59);

    const income = await Income.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    // Group by category
    const categoryTotals = {};
    income.forEach((item) => {
      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
    });

    const total = income.reduce((sum, item) => sum + item.amount, 0);

    res.status(200).json({
      success: true,
      data: {
        total,
        categoryTotals,
        count: income.length,
        year: parseInt(year || new Date().getFullYear()),
        month: parseInt(month || new Date().getMonth() + 1),
      },
    });
  } catch (error) {
    next(error);
  }
};

