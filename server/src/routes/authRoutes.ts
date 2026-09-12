import { Router } from "express";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import { User } from "../models/User";

import { sendEmail } from "../utils/mailer";
import crypto from "crypto";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'VvobJu3Ec3ADFDn3CSHq6y2wGlISmZhdETksEsN4BZt'

//Register
router.post('/register', async (req, res) =>{
    try{
        const {email, password, role} = req.body;

        const existing = await User.findOne({email});
        if (existing) return res.status(400).json({error: 'Email già registrata'});

        const hashedPass = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        
        const user = new User({ 
            email, 
            password: hashedPass, 
            role: role || 'user',
            verified: false,
            verificationToken
        });
        await user.save();
        
        // Send email
        const verificationUrl = `https://piccolescelte.onrender.com/api/auth/verify/${verificationToken}`;
        const htmlContent = `
            <h2>Benvenuto in Piccole Scelte!</h2>
            <p>Per favore, verifica il tuo account cliccando sul link sottostante:</p>
            <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #8B5CF6; color: white; text-decoration: none; border-radius: 5px;">Verifica Email</a>
        `;
        await sendEmail(email, 'Verifica il tuo account', htmlContent);

        res.json({success: true, message: 'Utente creato. Controlla la tua email per verificare l\'account.'})
    }catch( err:any){
        res.status(500).json({error: err.message})
    }
});

// Verify email
router.get('/verify/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({ verificationToken: token });
        
        if (!user) return res.status(400).send('<h1>Token non valido o scaduto</h1>');
        
        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
        
        res.send('<h1>Account verificato con successo! Ora puoi accedere all\'app.</h1><a href="https://piccolescelte.onrender.com">Torna al gioco</a>');
    } catch (err: any) {
        res.status(500).send('<h1>Errore di sistema</h1>');
    }
});

router.post('/login', async (req, res) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(401).json({error: 'Credenziali non valide'});

        if (!user.verified) {
            return res.status(401).json({error: 'Devi confermare la tua email prima di accedere.'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({error: 'Credenziali non valide'});

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    
        res.json({ token, role: user.role, email: user.email });
    }catch( err:any){
        res.status(500).json({error: err.message})
    }
});

//Promote user to therapist
router.post('/disabled_promote', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email mancante' });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'Utente non trovato' });

        user.role = 'therapist';
        await user.save();

        res.json({ success: true, message: 'Utente promosso a Terapista con successo' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;