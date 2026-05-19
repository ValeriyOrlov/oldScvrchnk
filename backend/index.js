import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from './db/index.js';
import router from './router/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const PORT = process.env.PORT || 5000;

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    const dbVersion = await db.query('SELECT version()');
    server.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    console.log(dbVersion.rows[0].version);
  } catch (e) {
    console.log(e);
  }
};

start();
