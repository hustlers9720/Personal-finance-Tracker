import express, { Router } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/transactionRoute.js';

config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.get('/', (req, res) => {
    console.log('API is running');
    res.send('API is running');
});

app.use('/transaction', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
