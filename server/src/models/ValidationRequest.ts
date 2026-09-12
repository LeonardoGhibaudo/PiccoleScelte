import mongoose from 'mongoose';

const validationSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  patientName: { type: String, required: true },
  therapistEmail: { type: String, required: true },
  scenarioId: { type: String, required: true },
  scenarioTitle: { type: String, required: true },
  reflectionText: { type: String, required: false },
  imageUrl: {type: String, required: false},
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, expires: '3d', default: Date.now }
});

export const ValidationRequest = mongoose.model('ValidationRequest', validationSchema);
