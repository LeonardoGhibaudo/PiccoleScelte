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
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FFFDF9; border-radius: 12px; border: 2px solid #121212; box-shadow: 6px 6px 0px 0px #121212;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #121212; font-size: 28px; margin-bottom: 5px;">✨ Piccole Scelte</h1>
                    <p style="color: #4A4A4A; font-size: 16px; margin-top: 0;">Benvenuto nella nostra community!</p>
                </div>
                <div style="background-color: white; padding: 30px; border-radius: 8px; border: 1px solid #E5E7EB; text-align: center;">
                    <h2 style="color: #121212; font-size: 22px; margin-top: 0;">Verifica la tua email</h2>
                    <p style="color: #4A4A4A; line-height: 1.6; margin-bottom: 30px;">
                        Grazie per esserti registrato! Clicca sul pulsante qui sotto per confermare il tuo indirizzo email e iniziare a giocare.
                    </p>
                    <a href="${verificationUrl}" style="display: inline-block; padding: 14px 32px; background-color: #FF4757; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; border: 2px solid #121212; box-shadow: 4px 4px 0px 0px #121212;">Conferma Email</a>
                </div>
                <div style="text-align: center; margin-top: 20px; color: #9CA3AF; font-size: 12px;">
                    <p>Se non hai creato tu questo account, puoi ignorare questa email.</p>
                </div>
            </div>
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
        
        if (!user) return res.status(400).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Errore Verifica - Piccole Scelte</title>
                <style>
                    body { font-family: 'Helvetica Neue', sans-serif; background-color: #FFFDF9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; color: #121212; }
                    .card { background: white; padding: 40px; border-radius: 16px; border: 3px solid #121212; box-shadow: 8px 8px 0px 0px #121212; text-align: center; max-width: 400px; width: 90%; }
                    h1 { margin-top: 0; color: #FF6B81; font-size: 28px; }
                    p { color: #4A4A4A; line-height: 1.6; margin-bottom: 30px; }
                    .btn { display: inline-block; padding: 14px 32px; background-color: #FF4757; color: white; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 18px; border: 3px solid #121212; box-shadow: 4px 4px 0px 0px #121212; }
                </style>
            </head>
            <body>
                <div class="card">
                    <div style="font-size: 60px; margin-bottom: 10px;">⚠️</div>
                    <h1>Ops!</h1>
                    <p>Il link di verifica non è valido o è scaduto. Potresti aver già verificato l'account.</p>
                    <a href="https://piccolescelte.com" class="btn">Torna al Sito</a>
                </div>
            </body>
            </html>
        `);
        
        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
        
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Account Verificato - Piccole Scelte</title>
                <style>
                    body { font-family: 'Helvetica Neue', sans-serif; background-color: #FFFDF9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; color: #121212; }
                    .card { background: white; padding: 40px; border-radius: 16px; border: 3px solid #121212; box-shadow: 8px 8px 0px 0px #121212; text-align: center; max-width: 400px; width: 90%; }
                    h1 { margin-top: 0; color: #FF4757; font-size: 28px; }
                    p { color: #4A4A4A; line-height: 1.6; margin-bottom: 30px; }
                    .btn { display: inline-block; padding: 14px 32px; background-color: #2ED573; color: white; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 18px; border: 3px solid #121212; box-shadow: 4px 4px 0px 0px #121212; transition: transform 0.2s; }
                    .btn:hover { transform: translateY(-2px); }
                </style>
            </head>
            <body>
                <div class="card">
                    <div style="font-size: 60px; margin-bottom: 10px;">✨</div>
                    <h1>Evviva!</h1>
                    <p>Il tuo account è stato verificato con successo. Ora sei pronto per iniziare la tua avventura in <strong>Piccole Scelte</strong>.</p>
                    <a href="https://piccolescelte.com" class="btn">Gioca Ora</a>
                </div>
            </body>
            </html>
        `);
    } catch (err: any) {
        res.status(500).send('<h1>Errore di sistema</h1>');
    }
});

router.post('/login', async (req, res) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(401).json({error: 'Credenziali non valide'});

        if (user.verified === false) {
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