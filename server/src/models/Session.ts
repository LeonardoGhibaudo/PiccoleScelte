
import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  patientId: String,
  date: String,
  pathTaken: Array,
  metrics: Object
}, { strict: false });

export const Session = mongoose.model('Session', SessionSchema);
