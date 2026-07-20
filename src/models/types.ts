// Rappresenta il profilo del ragazzo (usando uno pseudonimo per la privacy)
export interface Paziente {
  id: string;
  pseudonimo: string;
  eta: number;
  noteCliniche?: string; // Il punto interrogativo significa che questo campo è opzionale
}


// Rappresenta la singola scelta fatta durante uno scenario
export interface Scelta {
  idScelta: string;
  testo: string;
  tipo: 'aggressiva' | 'passiva' | 'assertiva';
  tempoDiRiflessioneMs: number; // Misuriamo i millisecondi per valutare l'impulsività
}

// Rappresenta l'intera sessione di gioco monitorata dal terapeuta
export interface SessioneClinica {
  idSessione: string;
  idPaziente: string;
  data: Date;
  scenario: 'scuola' | 'amici' | 'famiglia';
  scelteEffettuate: Scelta[];
  loopDiErroreCount: number; // Contatore per vedere se ripete lo stesso errore
}