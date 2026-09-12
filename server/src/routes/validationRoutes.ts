import { Router } from 'express';
import { sendEmail } from '../utils/mailer';
import { getEmailTemplate } from '../utils/emailTemplate';
import { ValidationRequest } from '../models/ValidationRequest';
import { Patient } from '../models/Patient';
import { User } from '../models/User';

const router = Router();
import { requireAuth, requireTherapist } from '../middleware/auth';
router.use(requireAuth);

router.post('/', async (req, res) => {
  try {
    const { patientId, patientName, therapistEmail, scenarioId, scenarioTitle, reflectionText, imageUrl } = req.body;
    
    const therapist = await User.findOne({ email: therapistEmail, role: 'therapist' });
    if (!therapist) {
      return res.status(404).json({ error: 'La psicologa indicata non è registrata come Terapista.' });
    }

    
    // Delete any existing pending or rejected requests for this patient for this scenario
    await ValidationRequest.deleteMany({ patientId: req.body.patientId, scenarioId: req.body.scenarioId });

    const val = new ValidationRequest({
      patientId, patientName, therapistEmail, scenarioId, scenarioTitle, reflectionText, imageUrl
    });
    await val.save();

    const text = `Il tuo paziente ${patientName} ha appena completato il capitolo "${scenarioTitle}".\n\nEsperienza riportata:\n"${reflectionText || 'Nessun testo, ha inviato una foto.'}"\n\nAccedi alla Dashboard per convalidare o rifiutare.`;
    const htmlContent = getEmailTemplate(
      `Nuova Convalida da ${patientName}`,
      text,
      "Apri Dashboard Terapista",
      "https://piccolescelte.com/?view=select-scenario"
    );

    await sendEmail(
      therapistEmail,
      `Nuova richiesta di convalida da ${patientName}`,
      htmlContent
    );

    res.json(val);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

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

router.get('/patient/:patientId', async (req, res) => {
  try {
    const requests = await ValidationRequest.find({ patientId: req.params.patientId, status: 'rejected' });
    res.json(requests);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/approve', async (req, res) => {
  try {
    const val = await ValidationRequest.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!val) return res.status(404).json({ error: 'Not found' });

    await Patient.findOneAndUpdate(
      { id: val.patientId },
      { $addToSet: { unlockedScenarios: val.scenarioId } }
    );

    const text = `Ottimo lavoro! La tua psicologa ha approvato la tua riflessione sul capitolo "${val.scenarioTitle}".\nIl prossimo capitolo è sbloccato. Continua così!`;
    const htmlContent = getEmailTemplate(
      "Capitolo Convalidato! 🌟",
      text,
      "Gioca Ora",
      "https://piccolescelte.com/?view=select-scenario"
    );

    await sendEmail(
      val.patientId,
      `Capitolo Convalidato!`,
      htmlContent
    );

    res.json(val);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/reject', async (req, res) => {
  try {
    const val = await ValidationRequest.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (!val) return res.status(404).json({ error: 'Not found' });

    const text = `La tua psicologa ha letto la tua riflessione sul capitolo "${val.scenarioTitle}" e ti chiede di riprovare.\nTorna nell'app per rigiocarlo e riflettere con più calma. Ce la puoi fare!`;
    const htmlContent = getEmailTemplate(
      "Riprova il Capitolo 🔄",
      text,
      "Apri Piccole Scelte",
      "https://piccolescelte.com/?view=select-scenario"
    );

    await sendEmail(
      val.patientId,
      `Capitolo da Rigiocare`,
      htmlContent
    );

    res.json(val);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await ValidationRequest.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
