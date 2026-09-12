import React, { useState } from 'react';
import type { Patient, AvatarConfig } from '../../types';
import { AvatarBuilder } from '../AvatarBuilder';
import { PatientAvatar } from '../PatientAvatar';

interface PatientManagerProps {
  patients: Patient[];
  onAddPatient: (p: Patient) => void;
  onDeletePatient: (id: string) => void;
  onSelectPatient: (p: Patient) => void;
}

export const PatientManager: React.FC<PatientManagerProps> = ({ patients, onAddPatient, onDeletePatient, onSelectPatient }) => {
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newFiscalCode, setNewFiscalCode] = useState('');
  const [newDiagnosis, setNewDiagnosis] = useState('');
  const [newAvatar, setNewAvatar] = useState<AvatarConfig | undefined>(undefined);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFirstName || !newLastName || !newFiscalCode) return;
    
    const newPatient: Patient = {
      id: `PT-${Math.floor(Math.random() * 10000)}`,
      firstName: newFirstName,
      lastName: newLastName,
      fiscalCode: newFiscalCode.toUpperCase(),
      diagnosisDetails: newDiagnosis,
      avatar: newAvatar,
      consentGiven: true, // assumed given verbally for this demo
      createdAt: new Date().toISOString().split('T')[0]
    };
    onAddPatient(newPatient);
    setNewFirstName('');
    setNewLastName('');
    setNewFiscalCode('');
    setNewDiagnosis('');
    setNewAvatar(undefined);
  };

  return (
    <div className="card">
      <div className="flex-responsive" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3>Gestione Pazienti</h3>
      </div>
      
      <form onSubmit={handleAdd} className="mb-4">
        <div className="row g-3 mb-3">
          <div className="col-12 col-md-4">
            <label className="form-label fw-bold">Nome</label>
            <input type="text" className="form-control" value={newFirstName} onChange={e => setNewFirstName(e.target.value)} placeholder="Es. Mario" required />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label fw-bold">Cognome</label>
            <input type="text" className="form-control" value={newLastName} onChange={e => setNewLastName(e.target.value)} placeholder="Es. Rossi" required />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label fw-bold">Codice Fiscale</label>
            <input type="text" className="form-control" value={newFiscalCode} onChange={e => setNewFiscalCode(e.target.value)} placeholder="RSSMRA..." required />
          </div>
        </div>
        
        <div className="row g-3 mb-3">
          <div className="col-12 col-md-6">
            <label className="form-label fw-bold">Dettagli Diagnosi / Note Cliniche</label>
            <textarea className="form-control" value={newDiagnosis} onChange={e => setNewDiagnosis(e.target.value)} placeholder="Es. ADHD tipo disattento..." rows={12} />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label fw-bold">Configura Avatar</label>
            <AvatarBuilder onChange={setNewAvatar} />
          </div>
        </div>
        
        <div className="flex-responsive-reverse" style={{ justifyContent: "flex-end" }}>
          <button type="submit" className="btn btn-primary">+ Aggiungi Paziente</button>
        </div>
      </form>

      <div className="table-responsive">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
              <th style={{ padding: '1rem 0.5rem' }}>ID / C.F.</th>
              <th style={{ padding: '1rem 0.5rem' }}>Paziente</th>
              <th style={{ padding: '1rem 0.5rem' }}>Diagnosi</th>
              <th style={{ padding: '1rem 0.5rem' }}>Creazione</th>
              <th style={{ padding: '1rem 0.5rem' }}>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-light)' }}>Nessun paziente. Aggiungine uno.</td></tr>
            )}
            {patients.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1rem 0.5rem', fontFamily: 'monospace', color: 'var(--color-text-light)' }}>
                  <div>{p.id}</div>
                  <div style={{ fontSize: '0.8rem' }}>{p.fiscalCode}</div>
                </td>
                <td style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>
                  <div className="flex-responsive" style={{ alignItems: "center", gap: "0.5rem" }}>
                    {p.avatar ? <PatientAvatar config={p.avatar} size={40} /> : <div style={{width: 40, height: 40, borderRadius: '50%', background: 'var(--color-sky-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>{p.firstName[0]}</div>}
                    {p.firstName} {p.lastName}
                  </div>
                </td>
                <td style={{ padding: '1rem 0.5rem', color: 'var(--color-text-light)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.diagnosisDetails || '-'}
                </td>
                <td style={{ padding: '1rem 0.5rem' }}>{p.createdAt}</td>
                <td style={{ padding: '1rem 0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => onSelectPatient(p)}>Apri Cartella</button>
                  <button className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => onDeletePatient(p.id)}>Elimina</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
