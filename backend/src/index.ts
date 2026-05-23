import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import productsRouter from './routes/products';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);

async function start(): Promise<void> {
  try {
    await connectDB();
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }

  app.listen(3001, () => {
    console.log('Server running on port 3001');
  });
}

start();
