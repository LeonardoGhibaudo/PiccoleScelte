import { Router } from "express";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import { User } from "../models/User";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'VvobJu3Ec3ADFDn3CSHq6y2wGlISmZhdETksEsN4BZt'

//Register

router.post('/register', async (req, res) =>{
    try{
        const {email, password, role} = req.body;

        const existing = await User.findOne({email});
        if (existing) return res.status(400).json({error: 'Email già registrata'});

        const hashedPass = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPass, role:role || 'user'});
        await user.save();
        
        res.json({success: true, message: ('Utente creato')})
    }catch( err:any){
        res.status(500).json({error: err.message})
    }
});


router.post('/register', async (req, res) =>{
    try{
        const {email, password, role} = req.body;

        const existing = await User.findOne({email});
        if (existing) return res.status(400).json({error: 'Email già registrata'});

        const hashedPass = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPass, role:role || 'user'});
        await user.save();
        
        res.json({success: true, message: ('Utente creato')})
    }catch( err:any){
        res.status(500).json({error: err.message})
    }
});

router.post('/login', async (req, res) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(401).json({error: 'Credenziali non valide'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({error: 'Credenziali non valide'});

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    
        res.json({ token, role: user.role, email: user.email });
    }catch( err:any){
        res.status(500).json({error: err.message})
    }
});

//Promote user to therapist
router.post('/promote', async (req, res) => {
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