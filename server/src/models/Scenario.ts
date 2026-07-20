
import mongoose from 'mongoose';

const ScenarioSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  description: String,
  dialogue: Array,
  background: String,
  character: String,
  characterName: String,
  choices: Array,
  isStartingNode: Boolean
}, { strict: false });

export const Scenario = mongoose.model('Scenario', ScenarioSchema);
