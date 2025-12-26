import express from 'express';
import { 
  getGoals, 
  getGoal, 
  createGoal, 
  updateGoal, 
  deleteGoal,
  addDeposit,
  deleteDeposit
} from '../controllers/goalController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.route('/')
  .get(getGoals)        // GET /api/goals - Get all goals
  .post(createGoal);    // POST /api/goals - Create new goal

router.route('/:id')
  .get(getGoal)         // GET /api/goals/:id - Get single goal
  .put(updateGoal)      // PUT /api/goals/:id - Update goal
  .delete(deleteGoal);  // DELETE /api/goals/:id - Delete goal

router.route('/:id/deposits')
  .post(addDeposit);    // POST /api/goals/:id/deposits - Add deposit

router.route('/:goalId/deposits/:depositId')
  .delete(deleteDeposit); // DELETE /api/goals/:goalId/deposits/:depositId - Delete deposit

export default router;

