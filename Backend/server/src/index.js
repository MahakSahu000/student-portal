require('dotenv').config();
import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db';

import authRoutes from './routes/auth';
import studentRoutes from './routes/student';

const app = express();

// Middleware
app.use(json());
app.use(cookieParser());

const CLIENT_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true,
}));

// DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
