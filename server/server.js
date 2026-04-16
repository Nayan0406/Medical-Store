
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log('MongoDB connection error:', err));


import authRoutes from './routes/auth.js';
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
	res.send('Server is running and MongoDB is connected!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
