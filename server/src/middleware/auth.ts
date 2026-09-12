import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'VvobJu3Ec3ADFDn3CSHq6y2wGlISmZhdETksEsN4BZt';

export interface AuthRequest extends Request {
  user?: any;
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Accesso negato. Token mancante.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token non valido o scaduto.' });
  }
};

export const requireTherapist = (req: AuthRequest, res: Response, next: NextFunction) => {
  requireAuth(req, res, () => {
    if (req.user?.role !== 'therapist') {
      return res.status(403).json({ error: 'Accesso negato. Riservato agli psicologi.' });
    }
    next();
  });
};
