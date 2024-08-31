
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import cors from 'cors';

// Configure environment variables
dotenv.config();

// Database configuration
connectDB().catch(err => {
  console.error(`Database connection failed: ${err.message}`.bgRed.white);
  process.exit(1); // Exit process with failure
});

// Create Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins. Modify as needed for security.
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
};


app.use(cors(corsOptions));


// Middleware
app.use(express.json());
app.use(morgan('dev'));

// API routes
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Document Upload App</h1>');
});

// Define port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.DEV_MODE || 'development'} mode on port ${PORT}`.bgCyan.white
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
  console.error(`Unhandled Rejection: ${err.message}`.bgRed.white);
  process.exit(1); // Exit process with failure
});
