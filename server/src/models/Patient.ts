
import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  fiscalCode: { type: String, default: '' },
  diagnosisDetails: { type: String, default: '' },
  consentGiven: { type: Boolean, default: false },
  createdAt: { type: String, default: () => new Date().toISOString() },
  unlockedScenarios: { type: [String], default: ['scen-start'] },
  avatar: {
    skinTone: { type: String, default: '#fcd2bc' },
    hairStyle: { type: String, default: 'short' },
    hairColor: { type: String, default: '#4a3022' },
    shirtColor: { type: String, default: '#1982c4' },
    pantsColor: { type: String, default: '#3f37c9' },
    shoesColor: { type: String, default: '#2b2d42' }
  }
}, { strict: false });

export const Patient = mongoose.model('Patient', PatientSchema);
