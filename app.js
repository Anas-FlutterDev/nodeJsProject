// index.js (assuming using ESM syntax)

import express from 'express';
import connectDB from './config/db.js';
import logger from './utils/Logger.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'; // assuming .js extension for ES modules
import cardRoutes from './routes/cardRoutes.js'; // assuming .mjs extension for ES modules

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use(logger);

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/cards', cardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
