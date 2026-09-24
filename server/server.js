import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import goalRoutes from './routes/goalRoutes.js';

import User from './models/User.js';
import { seedDemoData } from './utils/seeder.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Expense Tracker MERN API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/goals', goalRoutes);

// In production, serve the client build
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(clientBuildPath, 'index.html'));
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Initialize Database & Server
const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed demo user if demo user has no transactions
    try {
      let demoUser = await User.findOne({ email: 'demo@expensetracker.com' });
      if (!demoUser) {
        demoUser = await User.create({
          name: 'Alex Morgan',
          email: 'demo@expensetracker.com',
          password: 'demopassword123',
          currency: '$',
          monthlyBudget: 3500,
        });
      }
      await seedDemoData(demoUser._id);
    } catch (seedErr) {
      console.warn('Demo seed notice:', seedErr.message);
    }

    app.listen(PORT, () => {
      console.log(` Expense Tracker Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(` API Base URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error(` Server startup error: ${error.message}`);
    process.exit(1);
  }
};

startServer();
