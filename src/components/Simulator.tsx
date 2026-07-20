import React, { useState } from 'react';
import type { Scenario, Choice } from '../types';
import './Simulator.css';

interface SimulatorProps {
  scenario: Scenario;
  onChoiceSelected: (choice: Choice) => void;
  onBackToDashboard: () => void;
}

export const Simulator: React.FC<SimulatorProps> = ({ scenario, onChoiceSelected, onBackToDashboard }) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const handleChoiceClick = (choice: Choice) => {
    if (selectedChoiceId) return; // Prevent multiple clicks
    setSelectedChoiceId(choice.id);
    onChoiceSelected(choice);
    
    // Simulate a brief pause before allowing next actions or returning
    setTimeout(() => {
      setSelectedChoiceId(null);
      // For this MVP, we return to dashboard after one scenario. 
      // In a full game, we would load the next scenario.
      onBackToDashboard();
    }, 1500);
  };

  return (
    <div className="simulator container fade-in">
      <div className="simulator-header">
        <button className="btn btn-secondary back-btn" onClick={onBackToDashboard}>
          ← Torna alla Dashboard
        </button>
        <div className="scenario-badge">Scenario Attuale</div>
      </div>

      <div className="scenario-container card">
        <h2 className="scenario-title">{scenario.title}</h2>
        <p className="scenario-description">{scenario.description}</p>
        
        <div className="scenario-illustration">
          {/* A placeholder for a scenario illustration or an icon */}
          <div className="illustration-circle">
            <span className="illustration-icon">🤔</span>
          </div>
        </div>
      </div>

      <div className="choices-container">
        <h3 className="choices-prompt">Come reagisci?</h3>
        <div className="choices-grid">
          {scenario.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            const isFaded = selectedChoiceId && !isSelected;
            
            return (
              <button
                key={choice.id}
                className={`choice-btn ${isSelected ? 'selected' : ''} ${isFaded ? 'faded' : ''}`}
                onClick={() => handleChoiceClick(choice)}
                disabled={!!selectedChoiceId}
              >
                {choice.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
