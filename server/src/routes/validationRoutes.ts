import { Router } from 'express';
import { sendEmail } from '../utils/mailer';
import { ValidationRequest } from '../models/ValidationRequest';
import { Patient } from '../models/Patient';
import { User } from '../models/User';

const router = Router();
import { requireAuth, requireTherapist } from '../middleware/auth';
router.use(requireAuth);

// Create a validation request
router.post('/', async (req, res) => {
  try {
    const { patientId, patientName, therapistEmail, scenarioId, scenarioTitle, reflectionText, imageUrl } = req.body;
    
    // Controlla se la psicologa esiste nel db (opzionale ma utile)
    const therapist = await User.findOne({ email: therapistEmail, role: 'therapist' });
    if (!therapist) {
      return res.status(404).json({ error: 'La psicologa indicata non è registrata come Terapista.' });
    }

    const val = new ValidationRequest({
      patientId, patientName, therapistEmail, scenarioId, scenarioTitle, reflectionText, imageUrl
    });
    await val.save();

    await sendEmail(
      therapistEmail,
      `Nuova richiesta di convalida da ${patientName}`,
      `Il tuo paziente ${patientName} ha appena completato il capitolo "${scenarioTitle}".\nEsperienza riportata:\n"${reflectionText || 'Nessun testo, ha inviato una foto.'}"\nAccedi alla Dashboard per convalidare.`
    );

    res.json(val);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get pending validations for a specific therapist
router.get('/', async (req, res) => {
  try {
    const therapistEmail = req.query.therapistEmail;
    if (!therapistEmail) return res.status(400).json({ error: 'therapistEmail is required' });

    const requests = await ValidationRequest.find({ therapistEmail, status: 'pending' });
    res.json(requests);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Check if a patient has any rejected validation requests (to show alert on login)
router.get('/patient/:patientId', async (req, res) => {
  try {
    const requests = await ValidationRequest.find({ patientId: req.params.patientId, status: 'rejected' });
    res.json(requests);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Approve a validation
router.put('/:id/approve', async (req, res) => {
  try {
    const val = await ValidationRequest.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!val) return res.status(404).json({ error: 'Not found' });

    // Unlock scenario for patient
    await Patient.findOneAndUpdate(
      { id: val.patientId },
      { $addToSet: { unlockedScenarios: val.scenarioId } }
    );

    await sendEmail(
      val.patientId,
      `Capitolo Convalidato!`,
      `La tua psicologa ha approvato la tua riflessione sul capitolo "${val.scenarioTitle}". Puoi procedere col gioco!`
    );

    res.json(val);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Reject a validation
router.put('/:id/reject', async (req, res) => {
  try {
    const val = await ValidationRequest.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (!val) return res.status(404).json({ error: 'Not found' });

    await sendEmail(
      val.patientId,
      `Capitolo da Rigiocare`,
      `La tua psicologa ti chiede di rigiocare e riflettere meglio sul capitolo "${val.scenarioTitle}".`
    );

    res.json(val);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Acknowledge a rejection (patient has seen the alert, delete or mark as acknowledged)
router.delete('/:id', async (req, res) => {
  try {
    await ValidationRequest.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
