import { INITIAL_SCENARIOS } from './src/data/scenarios';
const startingScenarios = Object.values(INITIAL_SCENARIOS).filter(s => s.isStartingNode);
startingScenarios.forEach((s, i) => console.log(`Chapter ${i+1}: ${s.id}`));
