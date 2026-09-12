import re

with open('src/components/therapist/TherapistDashboard.tsx', 'r') as f:
    content = f.read()

# Add polling
polling_code = """  // Carica le richieste di convalida all'avvio e usa il polling
  React.useEffect(() => {
    const fetchValidations = async () => {
      const email = localStorage.getItem('userEmail');
      if (email) {
        try {
          const res = await apiFetch(`/api/validations?therapistEmail=${email}`);
          if (res.ok) {
            const data = await res.json();
            // Check if there are NEW pending validations to play sound
            setValidations(prev => {
              if (data.length > prev.length) {
                AudioManager.playSuccess();
              }
              return data;
            });
          }
        } catch (e) {
          console.error("Failed to load validations", e);
        }
      }
    };
    fetchValidations();
    const interval = setInterval(fetchValidations, 5000); // Polling ogni 5 secondi
    return () => clearInterval(interval);
  }, []);"""

content = re.sub(
    r"// Carica le richieste di convalida all'avvio.*?}, \[\]\);", 
    polling_code, 
    content, 
    flags=re.DOTALL
)

# Apply flex-responsive
content = content.replace("style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}", "className=\"flex-responsive\" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}")
content = content.replace("style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}", "className=\"flex-responsive\" style={{ gap: '1rem', alignItems: 'center' }}")
content = content.replace("style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}", "className=\"flex-responsive-reverse\" style={{ gap: '1rem', justifyContent: 'flex-end' }}")

with open('src/components/therapist/TherapistDashboard.tsx', 'w') as f:
    f.write(content)
