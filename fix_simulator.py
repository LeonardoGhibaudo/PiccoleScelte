import os

filepath = 'src/components/game/Simulator.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Replace the character container
old_container = """      {/* ===== Personaggio ===== */}
      <div className="flex-responsive" style={{ justifyContent: "space-between", padding: "0 2rem", width: "100%", position: 'absolute', bottom: '150px', zIndex: 10, pointerEvents: 'none' }}>
        {/* Patient Avatar on the left */}
        {patient.avatar && (
          <div className={`bounce-in ${speakerName !== 'Pensiero' && speakerName !== patient.firstName ? 'opacity-50' : ''} ${speakerName === patient.firstName || speakerName === 'Pensiero' ? 'speaking-bounce' : ''}`} style={{ transition: 'opacity 0.3s' }}>
            <PatientAvatar config={patient.avatar} size={250} />
          </div>
        )}
        
        {/* Scenario Character on the right */}
        <div className={`vn-character-container bounce-in ${speakerName === 'Pensiero' || speakerName === 'Narratore' || speakerName === patient.firstName ? 'character-dimmed' : ''} ${(speakerName !== 'Pensiero' && speakerName !== 'Narratore' && speakerName !== patient.firstName) ? 'speaking-bounce' : ''}`} style={{ position: 'relative', height: '50vh', bottom: 0, right: 0 }}>
          <img
            src={scenario.character}
            alt={scenario.characterName}
            className="vn-character-img"
            style={{ height: '100%', objectFit: 'contain' }}
          />
        </div>
      </div>"""

new_container = """      {/* ===== Personaggio ===== */}
      <div className="character-stage">
        {/* Patient Avatar on the left */}
        {patient.avatar && (
          <div className={`character-left bounce-in ${speakerName !== 'Pensiero' && speakerName !== patient.firstName ? 'character-dimmed' : ''} ${speakerName === patient.firstName || speakerName === 'Pensiero' ? 'speaking-bounce' : ''}`}>
            <PatientAvatar config={patient.avatar} size={200} />
          </div>
        )}
        
        {/* Scenario Character on the right */}
        <div className={`character-right bounce-in ${speakerName === 'Pensiero' || speakerName === 'Narratore' || speakerName === patient.firstName ? 'character-dimmed' : ''} ${(speakerName !== 'Pensiero' && speakerName !== 'Narratore' && speakerName !== patient.firstName) ? 'speaking-bounce' : ''}`}>
          <img
            src={scenario.character}
            alt={scenario.characterName}
            className="vn-character-img"
          />
        </div>
      </div>"""

content = content.replace(old_container, new_container)

with open(filepath, 'w') as f:
    f.write(content)
