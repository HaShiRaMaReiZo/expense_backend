import SavingGoal from '../models/SavingGoal.js';

// @desc    Get all user's saving goals
// @route   GET /api/goals
// @access  Private
export const getGoals = async (req, res, next) => {
  try {
    const goals = await SavingGoal.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: goals,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single saving goal
// @route   GET /api/goals/:id
// @access  Private
export const getGoal = async (req, res, next) => {
  try {
    const goal = await SavingGoal.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found',
      });
    }

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new saving goal
// @route   POST /api/goals
// @access  Private
export const createGoal = async (req, res, next) => {
  try {
    const { name, targetAmount, endDate } = req.body;

    if (!name || !targetAmount || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, targetAmount, and endDate',
      });
    }

    const goal = await SavingGoal.create({
      userId: req.user.id,
      name,
      targetAmount,
      endDate: new Date(endDate),
      deposits: [],
    });

    res.status(201).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update saving goal
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = async (req, res, next) => {
  try {
    const { name, targetAmount, endDate } = req.body;

    const goal = await SavingGoal.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found',
      });
    }

    if (name) goal.name = name;
    if (targetAmount) goal.targetAmount = targetAmount;
    if (endDate) goal.endDate = new Date(endDate);

    await goal.save();

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add deposit to saving goal
// @route   POST /api/goals/:id/deposits
// @access  Private
export const addDeposit = async (req, res, next) => {
  try {
    const { amount, note } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid amount',
      });
    }

    // Check if goal exists first
    const goalExists = await SavingGoal.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!goalExists) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found',
      });
    }

    // Use findOneAndUpdate with $push to add deposit without full document validation
    const goal = await SavingGoal.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      {
        $push: {
          deposits: {
            amount,
            note: note || '',
            date: new Date(),
          },
        },
      },
      {
        new: true,
        runValidators: false, // Don't validate entire document, just the new deposit
      }
    );

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete deposit from saving goal
// @route   DELETE /api/goals/:goalId/deposits/:depositId
// @access  Private
export const deleteDeposit = async (req, res, next) => {
  try {
    // Check if goal exists first
    const goalExists = await SavingGoal.findOne({
      _id: req.params.goalId,
      userId: req.user.id,
    });

    if (!goalExists) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found',
      });
    }

    // Use findOneAndUpdate with $pull to remove deposit without full document validation
    const goal = await SavingGoal.findOneAndUpdate(
      {
        _id: req.params.goalId,
        userId: req.user.id,
      },
      {
        $pull: {
          deposits: {
            _id: req.params.depositId,
          },
        },
      },
      {
        new: true,
        runValidators: false, // Don't validate entire document
      }
    );

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete saving goal
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = async (req, res, next) => {
  try {
    const goal = await SavingGoal.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found',
      });
    }

    await goal.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

