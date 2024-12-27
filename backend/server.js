import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './Routes/productRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import orderRoutes from './Routes/orderRoutes.js';
const port = process.env.PORT || 5000;
dotenv.config();

connectDB(); // Connect to mongoDB

const app = express();

// Body parser middleware
app.use(express.json()); // parse raw json
app.use(express.urlencoded({ extended: true })); // Parse the form urlencoded in the body

// Cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
