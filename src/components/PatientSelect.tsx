/**
 * ===================================================
 * PatientSelect.tsx — Selezione paziente stile gioco
 * ===================================================
 * Schermata che appare prima di iniziare il gioco.
 * Permette di scegliere un paziente o crearne uno nuovo.
 * Stile giocoso e user-friendly per ragazzi.
 */
import React, { useState } from 'react';
import type { Patient, AvatarConfig } from '../types';
import { AvatarBuilder } from './AvatarBuilder';
import { PatientAvatar } from './PatientAvatar';
import './PatientSelect.css';

interface PatientSelectProps {
  patients: Patient[];
  onAddPatient: (p: Patient) => void;
  onSelect: (p: Patient) => void;
  onBack: () => void;
}

export const PatientSelect: React.FC<PatientSelectProps> = ({
  patients, onAddPatient, onSelect, onBack
}) => {
  const [showForm, setShowForm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState<AvatarConfig | undefined>(undefined);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName) return;

    const newPatient: Patient = {
      id: `PT-${Math.floor(Math.random() * 10000)}`,
      firstName: firstName,
      lastName: lastName, // Rimosso 'Giocatore' di default
      fiscalCode: 'NON_INSERITO',
      diagnosisDetails: 'Profilo creato dal gioco',
      avatar: avatar,
      consentGiven: true,
      createdAt: new Date().toISOString().split('T')[0],
    };
    onAddPatient(newPatient);
    setFirstName('');
    setLastName('');
    setAvatar(undefined);
    setShowForm(false);
  };

  return (
    <div className="patient-select-wrapper fade-in">
      <div className="patient-select-container">
        <button className="btn btn-secondary back-btn" onClick={onBack}>
          ← Torna al menu
        </button>

        <div className="select-header bounce-in">
          <span className="select-emoji">🎮</span>
          <h1>Chi gioca oggi?</h1>
          <p className="text-muted">Scegli il tuo personaggio oppure creane uno nuovo!</p>
        </div>

        {/* Lista personaggi/pazienti esistenti */}
        <div className="player-grid">
          {patients.map((p, index) => (
            <button
              key={p.id}
              className="player-card slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onSelect(p)}
            >
              <div className="player-avatar" style={{ background: 'transparent' }}>
                {p.avatar ? (
                  <PatientAvatar config={p.avatar} size={60} />
                ) : (
                  <div style={{ background: 'var(--color-primary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {p.firstName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="player-info">
                <strong>{p.firstName} {p.lastName}</strong>
              </div>
              <span className="player-arrow">▶</span>
            </button>
          ))}

          {/* Bottone "Nuovo Giocatore" */}
          <button
            className="player-card player-card-new slide-up"
            style={{ animationDelay: `${patients.length * 0.1}s` }}
            onClick={() => setShowForm(true)}
          >
            <div className="player-avatar avatar-new">+</div>
            <div className="player-info">
              <strong>Nuovo Giocatore</strong>
              <span>Crea un profilo</span>
            </div>
          </button>
        </div>

        {/* Form per nuovo giocatore */}
        {showForm && (
          <div className="new-player-form card bounce-in">
            <h3>🆕 Crea il tuo personaggio</h3>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Nome *</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="Es. Marco"
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Cognome (Opzionale)</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder="Es. Rossi"
                />
              </div>
              <div className="form-group mb-4">
                <label>Scegli il tuo Avatar</label>
                <AvatarBuilder onChange={setAvatar} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-game" style={{ flex: 1 }}>
                  ✨ Crea e Gioca!
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Annulla
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
