import express from 'express';
import {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getMonthlyStats,
} from '../controllers/expenseController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.route('/').get(getExpenses).post(createExpense);
router.route('/stats/monthly').get(getMonthlyStats);
router.route('/:id').get(getExpense).put(updateExpense).delete(deleteExpense);

export default router;

