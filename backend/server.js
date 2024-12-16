import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './Routes/productRoutes.js';
const port = process.env.PORT || 5000;
dotenv.config();

connectDB(); // Connect to mongoDB

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
