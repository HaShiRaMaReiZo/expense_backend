import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './src/config/database.js';
import { errorHandler } from './src/middleware/errorHandler.js';

// Import routes
import authRoutes from './src/routes/auth.js';
import expenseRoutes from './src/routes/expenses.js';
import incomeRoutes from './src/routes/income.js';
import goalRoutes from './src/routes/goals.js';
import categoryRoutes from './src/routes/categories.js';
import incomeCategoryRoutes from './src/routes/incomeCategories.js';
import exportRoutes from './src/routes/export.js';

// Load env vars
dotenv.config();

const app = express();

// Connect to database before handling requests (for serverless)
let dbConnected = false;
const ensureDBConnection = async (req, res, next) => {
  if (!dbConnected && mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return res.status(500).json({
        success: false,
        message: 'Database connection failed',
      });
    }
  }
  next();
};

// Apply DB connection middleware to all routes
app.use(ensureDBConnection);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/income-categories', incomeCategoryRoutes);
app.use('/api/export', exportRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// Catch-all route for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Export app for Vercel serverless functions
export default app;

// Only start server if not in Vercel environment
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3001;
  // Listen on all network interfaces (0.0.0.0) so emulator can connect
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Accessible at: http://localhost:${PORT} or http://192.168.100.59:${PORT}`);
  });
}

