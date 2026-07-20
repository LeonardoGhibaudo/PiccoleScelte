import type { Scelta } from '../models/types';

import { useState } from 'react';

export function Scenario(props: { situazione: string, scelte: Scelta[] }) {
    
    const [contatoreScelte, setContatoreScelte] = useState<number>(0) 
    // 1. Creiamo la funzione che gestisce il click.
    // Riceve in ingresso l'intero oggetto "Scelta" che è stato cliccato.
    function registraScelta(sceltaCliccata: Scelta) {
        // La funzione alert() crea un popup nativo del browser
        alert("Hai scelto un'azione: " + sceltaCliccata.tipo);
        setContatoreScelte(contatoreScelte + 1)
    }
    

    return (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid black' }}>
            <h2>Situazione: {props.situazione}</h2>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                {props.scelte.map((opzione) => (
                    
                    // 2. Aggiungiamo l'onClick con la funzione freccia!
                    <button 
                        key={opzione.idScelta} 
                        onClick={() => registraScelta(opzione) }
                    >
                        {opzione.testo}
                        
                    </button>
                   
                    
                ))}
                 <p>Azioni totali: {contatoreScelte}</p>
            </div>
        </div>
    );
}