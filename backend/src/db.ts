import 'dotenv/config';
import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGO_URI ?? 'mongodb://localhost:27017/ecommerce';
const client = new MongoClient(uri);

export let db: Db;

export async function connectDB(): Promise<void> {
  await client.connect();
  db = client.db();
}
