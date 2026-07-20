
import { Router } from 'express';
import { Session } from '../models/Session';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find().lean();
    res.json(sessions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/patient/:patientId', async (req, res) => {
  try {
    const sessions = await Session.find({ patientId: req.params.patientId }).lean();
    res.json(sessions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const result = await Session.findOneAndUpdate(
      { sessionId: data.sessionId },
      data,
      { upsert: true, new: true, lean: true }
    );
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Session.deleteOne({ sessionId: req.params.id });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
