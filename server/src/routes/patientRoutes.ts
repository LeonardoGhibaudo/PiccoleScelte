
import { Router } from 'express';
import { Patient } from '../models/Patient';
import { sendEmail } from '../utils/mailer';
import { getEmailTemplate } from "../utils/emailTemplate";


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
    // We shouldn't trust therapistEmail from the client because it might be stale 
    // (e.g. therapist deleted them, but client still has old data).
    // So we remove it from the payload, EXCEPT if there's a fresh invite.
    delete data.therapistEmail;

    let updatePayload: any = { $set: data };

    if (invite) {
      // Apply the invite
      updatePayload.$set.therapistEmail = invite.therapistEmail;
      // Consume the invite
      await Invite.deleteOne({ _id: invite._id });
    }

    const result = await Patient.findOneAndUpdate(
      { id: data.id },
      updatePayload,
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

    
      



    const subject = "Il tuo psicologo ti ha invitato su Piccole Scelte 🎮";
    const text = `La tua psicologa ti ha invitato a giocare a Piccole Scelte, il videogioco terapeutico per l'esplorazione emotiva.\n\nRegistrati usando la tua email per collegare automaticamente il tuo account a quello della tua psicologa e iniziare subito a giocare!`;
    const htmlContent = getEmailTemplate(
      "Sei stato invitato!", 
      text, 
      "Registrati ora e gioca", 
      "https://piccolescelte.com/?view=login"
    );
    
    await sendEmail(patientEmail, subject, htmlContent);

    res.json({ success: true, message: 'Invito inviato con successo!' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    delete data.therapistEmail; // Protect from stale client data overwrite
    
    const result = await Patient.findOneAndUpdate(
      { id: req.params.id },
      { $set: data },
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

import { ValidationRequest } from '../models/ValidationRequest';

router.delete('/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    
    // 1. Invece di eliminare il paziente, lo "scolleghiamo" dallo psicologo
    await Patient.findOneAndUpdate(
      { id: patientId },
      { $set: { therapistEmail: '' } }
    );
    
    // 2. Delete any pending validation requests from this patient
    await ValidationRequest.deleteMany({ patientId });
    
    // 3. Delete any invites for this patient (prevents re-association on next login)
    await Invite.deleteMany({ patientEmail: patientId });
    
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
