
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import patientRoutes from './routes/patientRoutes';
import scenarioRoutes from './routes/scenarioRoutes';
import sessionRoutes from './routes/sessionRoutes';
import authRoutes from './routes/authRoutes';
import validationRoutes from './routes/validationRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/progetto-adhd';

const allowedOrigins = ['http://localhost:5174', 'http://localhost:5173', 'https://piccolescelte.netlify.app', 'https://piccolescelte.com', 'https://www.piccolescelte.com'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || (origin && origin.endsWith('.vercel.app'))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// --- Routes ---
app.use('/api/patients', patientRoutes);
app.use('/api/scenarios', scenarioRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/validations', validationRoutes);

// --- MongoDB Connection with retry ---
const connectWithRetry = () => {
  mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
      console.error('❌ MongoDB connection error:', err.message);
      console.log('Retrying in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
