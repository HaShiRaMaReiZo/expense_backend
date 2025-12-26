import express from 'express';
import { getIncomeCategories, updateIncomeCategories } from '../controllers/incomeCategoryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.route('/').get(getIncomeCategories).put(updateIncomeCategories);

export default router;

