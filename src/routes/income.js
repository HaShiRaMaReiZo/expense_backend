import express from 'express';
import {
  getIncome,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
  getMonthlyIncomeStats,
} from '../controllers/incomeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.route('/').get(getIncome).post(createIncome);
router.route('/stats/monthly').get(getMonthlyIncomeStats);
router.route('/:id').get(getIncomeById).put(updateIncome).delete(deleteIncome);

export default router;

