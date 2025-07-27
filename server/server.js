import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Connect to Database
connectDB();


const app = express();

// Middleware
const frontendURL = "https://rad-liger-6d7912.netlify.app"; // ❗ Replace with your actual frontend URL

const corsOptions = {
  origin: frontendURL,
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));