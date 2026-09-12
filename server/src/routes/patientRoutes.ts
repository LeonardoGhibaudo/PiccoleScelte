
import { Router } from 'express';
import { Patient } from '../models/Patient';

const router = Router();
import { requireAuth, requireTherapist } from '../middleware/auth';
router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find().lean();
    res.json(patients);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

import { Invite } from '../models/Invite';
import { User } from '../models/User';

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    
    // Check if there is an invite for this patient's email (data.id is email currently from LoginScreen)
    const invite = await Invite.findOne({ patientEmail: data.id });
    if (invite) {
      data.therapistEmail = invite.therapistEmail;
    }

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

router.post('/invite', async (req, res) => {
  try {
    const { patientEmail, therapistEmail } = req.body;
    if (!patientEmail || !therapistEmail) return res.status(400).json({ error: 'Mancano i parametri' });

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ id: patientEmail });
    if (existingPatient) {
      existingPatient.therapistEmail = therapistEmail;
      await existingPatient.save();
    } else {
      // Save invite for when they register
      await Invite.findOneAndUpdate(
        { patientEmail },
        { therapistEmail },
        { upsert: true, new: true }
      );
    }

    console.log(`\n========================================`);
    console.log(`[EMAIL SIMULATION] A: ${patientEmail}`);
    console.log(`OGGETTO: Invito da Piccole Scelte`);
    console.log(`MESSAGGIO: La tua psicologa (${therapistEmail}) ti ha invitato a giocare a Piccole Scelte.\nRegistrati con questa email per collegare il tuo account!`);
    console.log(`========================================\n`);

    res.json({ success: true, message: 'Invito inviato con successo!' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const result = await Patient.findOneAndUpdate(
      { id: req.params.id },
      data,
      { new: true, lean: true }
    );
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/unlock', async (req, res) => {
  try {
    const { scenarioId } = req.body;
    const result = await Patient.findOneAndUpdate(
      { id: req.params.id },
      { $addToSet: { unlockedScenarios: scenarioId } },
      { new: true, lean: true }
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
