import express from 'express';
import { exportCSV, getBackup, restoreBackup } from '../controllers/exportController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/csv', exportCSV);
router.get('/backup', getBackup);
router.post('/backup/restore', restoreBackup);

export default router;

