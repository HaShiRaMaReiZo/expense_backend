import express from 'express';
import { getCategories, updateCategories } from '../controllers/categoryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.route('/').get(getCategories).put(updateCategories);

export default router;

