import mongoose from 'mongoose';

const inviteSchema = new mongoose.Schema({
  patientEmail: { type: String, required: true },
  therapistEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Invite = mongoose.model('Invite', inviteSchema);
