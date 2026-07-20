
import { Router } from 'express';
import { Patient } from '../models/Patient';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find().lean();
    res.json(patients);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const result = await Patient.findOneAndUpdate(
      { id: data.id },
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
    await Patient.deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
