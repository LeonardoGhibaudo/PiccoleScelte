import re

with open('/Users/leonardo/adhd-laura/PiccoleScelte/src/App.tsx', 'r') as f:
    content = f.read()

old_code = """        {/* Patient Selection — before starting a game */}
        {view === 'select-patient' && (
          <PatientSelect
            patients={patients}
            onAddPatient={async (p) => {
              try {
                const res = await fetch('/api/patients', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(p)
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const savedPatient = await res.json();
                setPatients(prev => [...prev, savedPatient]);
              } catch (err) {
                console.error('Failed to save patient', err);
                // Fallback locale
                setPatients(prev => [...prev, p]);
              }
            }}"""

new_code = """        {/* Patient Selection — before starting a game (Only used by Guests now) */}
        {view === 'select-patient' && (
          <PatientSelect
            patients={patients}
            onAddPatient={(p) => {
              // Guests are not saved to the DB, only local state
              setPatients(prev => [...prev, p]);
            }}"""

new_content = content.replace(old_code, new_code)

with open('/Users/leonardo/adhd-laura/PiccoleScelte/src/App.tsx', 'w') as f:
    f.write(new_content)

print("Fixed App.tsx")
