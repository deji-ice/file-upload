import express from 'express';
import connectDB from './db/conn.js';
import userRoute from './routes/userRoute.js';

const router = express.Router();

router.get('/users', (_req, res) => { // use _req if you don't need the request object   
  res.send('Hello World!');
});

router.post('/users/create', );