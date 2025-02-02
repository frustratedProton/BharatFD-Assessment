import express from 'express';
import connectDB from './config/db.js';
import faqRouter from './routes/faqRoute.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', faqRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
