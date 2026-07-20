
import { Router } from 'express';
import { Scenario } from '../models/Scenario';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const scenarios = await Scenario.find().lean();
    // Convert to object map { id: scenario }
    const scenarioMap: any = {};
    scenarios.forEach(s => {
      scenarioMap[s.id] = s;
    });
    res.json(scenarioMap);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/bulk', async (req, res) => {
  try {
    const scenariosObj = req.body;
    const operations = Object.values(scenariosObj).map((scen: any) => ({
      updateOne: {
        filter: { id: scen.id },
        update: { $set: scen },
        upsert: true
      }
    }));
    await Scenario.bulkWrite(operations as any);
    res.json({ success: true, count: operations.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
