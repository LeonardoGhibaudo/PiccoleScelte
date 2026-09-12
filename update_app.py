import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace the initial states for view and activePatient with sessionStorage
view_state = r"const \[view, setView\] = useState<View>.*"
new_view_state = """  const [view, setView] = useState<View>(() => {
    return (sessionStorage.getItem('currentView') as View) || 'menu';
  });"""
content = re.sub(view_state, new_view_state, content)

patient_state = r"const \[activePatient, setActivePatient\] = useState<Patient \| null>\(null\);"
new_patient_state = """  const [activePatient, setActivePatient] = useState<Patient | null>(() => {
    const saved = sessionStorage.getItem('activePatient');
    return saved ? JSON.parse(saved) : null;
  });"""
content = re.sub(patient_state, new_patient_state, content)

# Change changeView to update sessionStorage
change_view_code = r"const changeView = \(v: View\) => {"
new_change_view = """  const changeView = (v: View) => {
    sessionStorage.setItem('currentView', v);
    setView(v);
  };"""
content = re.sub(r"const changeView = \(v: View\) => {\s*setView\(v\);\s*};", new_change_view, content, flags=re.DOTALL)

# Change setActivePatient to update sessionStorage
set_active_patient_calls = re.findall(r"setActivePatient\(([^)]+)\)", content)
# It's better to create a wrapper handleSetActivePatient
wrapper = """  const handleSetActivePatient = (p: Patient | null) => {
    if (p) sessionStorage.setItem('activePatient', JSON.stringify(p));
    else sessionStorage.removeItem('activePatient');
    setActivePatient(p);
  };"""

# Insert wrapper before changeView
content = content.replace("const changeView = (v: View) => {", wrapper + "\n\n  const changeView = (v: View) => {")

# Replace all setActivePatient calls with handleSetActivePatient
content = content.replace("setActivePatient(p)", "handleSetActivePatient(p)")
content = content.replace("setActivePatient(updatedPatient)", "handleSetActivePatient(updatedPatient)")
content = content.replace("setActivePatient(saved)", "handleSetActivePatient(saved)")
content = content.replace("setActivePatient(null)", "handleSetActivePatient(null)")

# Add polling for activePatient updates
polling_effect = """
  // Polling per aggiornare l'activePatient (utile per vedere i capitoli sbloccati senza ricaricare)
  React.useEffect(() => {
    if (!activePatient || authRole === 'guest') return;
    
    const pollPatient = async () => {
      try {
        const res = await apiFetch(`/api/patients`);
        if (res.ok) {
          const allPatients = await res.json();
          const updated = allPatients.find((p: Patient) => p.id === activePatient.id);
          if (updated && JSON.stringify(updated.unlockedScenarios) !== JSON.stringify(activePatient.unlockedScenarios)) {
            handleSetActivePatient(updated);
            
            // Aggiorna anche la lista globale patients
            setPatients((prev: Patient[]) => prev.map(p => p.id === updated.id ? updated : p));
          }
        }
      } catch (e) {
        // console.warn('Polling fallito', e);
      }
    };
    
    const interval = setInterval(pollPatient, 5000);
    return () => clearInterval(interval);
  }, [activePatient, authRole]);
"""

# Insert polling after useEffect for checking validations
content = content.replace("changeView('select-scenario');\n                } else {", polling_effect + "\n                  changeView('select-scenario');\n                } else {")

with open('src/App.tsx', 'w') as f:
    f.write(content)
