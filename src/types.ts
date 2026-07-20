/**
 * ===================================================
 * TYPES.TS — Modelli dati per il Videogioco Clinico ADHD
 * ===================================================
 * Questo file definisce tutte le interfacce TypeScript
 * usate nell'applicazione. È il "vocabolario" del progetto.
 */

/** Configurazione per l'Avatar generativo SVG del paziente */
export interface AvatarConfig {
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  shirtColor: string;
  pantsColor?: string;
  shoesColor?: string;
}

/** Paziente con dati sensibili (accesso riservato allo psicologo) */
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  fiscalCode: string;
  diagnosisDetails?: string;
  consentGiven: boolean;
  createdAt: string;
  avatar?: AvatarConfig;
  unlockedScenarios?: string[];
  isPremium?: boolean;
}

/** I tre tipi di reazione possibili */
export type GamePhase = 'reading' | 'choosing' | 'consequence' | 'critical_failure';

export type ReactionType = 'impulsive' | 'passive' | 'assertive';

/** Una singola scelta all'interno di uno scenario */
export interface Choice {
  id: string;
  text: string;
  type: ReactionType;
  emoji: string;            // Emoji visiva per il bottone
  consequence: string;      // Cosa succede DOPO aver scelto
  betterAlternative?: string; // Cosa sarebbe stato meglio fare
  nextScenarioId: string | null;
  isCriticalFailure?: boolean; // Se true, l'azione causa il fallimento immediato del capitolo
}

/** Una singola riga di dialogo nella visual novel */
export interface DialogueLine {
  speaker: string;
  text: string;
}

/** Uno scenario del gioco (un "nodo" nell'albero) */
export interface Scenario {
  id: string;
  title: string;
  description: string;
  dialogue: DialogueLine[];  // <-- Lista di battute sequenziali
  background: string;        // Path all'immagine di sfondo
  character: string;         // Path al personaggio visibile
  characterName: string;     // Nome principale del personaggio in scena
  choices: Choice[];
  isStartingNode?: boolean;
}

/** Dati telemetrici per una singola azione */
export interface TelemetryData {
  scenarioId: string;
  choiceId: string;
  reactionType: ReactionType;
  responseTimeMs: number;
  choiceText: string;
  consequenceText: string;
  betterText: string;
}

/** Risultato completo di una sessione di gioco */
export interface SessionResult {
  sessionId: string;
  patientId: string;
  date: string;
  pathTaken: TelemetryData[];
  metrics: {
    totalChoices: number;
    avgResponseTimeMs: number;
    fastResponseCount: number;  // risposte < 2s (proxy impulsività)
    slowResponseCount: number;  // risposte > 10s (proxy disattenzione)
    impulsivityRatio: number;
    passivityRatio: number;
    assertivityRatio: number;
    consistencyScore: number;   // quanto è coerente nei pattern
  };
}
