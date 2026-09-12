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

      <div className="patient-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        {patients.length === 0 && <p className="text-muted">Nessun paziente inserito.</p>}
        {patients.map(p => (
          <div key={p.id} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--panel-bg)', borderRadius: 'var(--radius-md)', border: '2px solid var(--panel-border)', boxShadow: '4px 4px 0px 0px var(--panel-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 250px' }}>
              {p.avatar ? <PatientAvatar config={p.avatar} size={48} /> : <div style={{width: 48, height: 48, borderRadius: '50%', background: 'var(--color-sky-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>{p.firstName[0]}</div>}
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem' }}>{p.firstName} {p.lastName}</strong>
                <span className="text-muted" style={{ fontSize: '0.85rem', display: 'block' }}>ID: {p.id.substring(0, 8)}</span>
                <span className="text-muted" style={{ fontSize: '0.85rem' }}>{p.diagnosisDetails || '-'}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => onSelectPatient(p)}>Apri Cartella</button>
              <button className="btn btn-danger" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => onDeletePatient(p.id)}>Elimina</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
