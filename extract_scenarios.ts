import { INITIAL_SCENARIOS } from './src/data/scenarios';
import * as fs from 'fs';

const extracted = Object.values(INITIAL_SCENARIOS).map(s => ({
  id: s.id,
  title: s.title,
  description: s.description,
  dialogue: s.dialogue.map(d => `${d.speaker}: ${d.text}`).join('\n'),
}));

fs.writeFileSync('scenarios_summary.json', JSON.stringify(extracted, null, 2));
console.log('Extracted to scenarios_summary.json');
