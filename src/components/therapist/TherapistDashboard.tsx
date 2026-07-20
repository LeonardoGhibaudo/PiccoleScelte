import React from 'react';
import type { Patient } from '../../types';
import { PatientManager } from './PatientManager';

interface TherapistDashboardProps {
  patients: Patient[];
  onAddPatient: (p: Patient) => void;
  onDeletePatient: (id: string) => void;
  onSelectPatient: (p: Patient) => void;
  onLogout: () => void;
}

export const TherapistDashboard: React.FC<TherapistDashboardProps> = (props) => {
  return (
    <div className="container fade-in slide-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)' }}>Pannello di Controllo Clinico</h2>
          <p className="text-muted">Gestione pazienti e scenari terapeutici</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={props.onLogout}>Esci</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* We can add a stats overview here later */}
        <PatientManager 
          patients={props.patients} 
          onAddPatient={props.onAddPatient} 
          onDeletePatient={props.onDeletePatient} 
          onSelectPatient={props.onSelectPatient} 
        />
      </div>
    </div>
  );
};
