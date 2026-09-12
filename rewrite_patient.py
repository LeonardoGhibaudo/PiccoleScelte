with open('src/components/therapist/PatientDetail.tsx', 'r') as f:
    content = f.read()

content = content.replace("style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}", "className=\"flex-responsive\" style={{ justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}")
content = content.replace("style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}", "className=\"flex-responsive\" style={{ justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}")
content = content.replace("style={{ display: 'flex', gap: '2rem' }}", "className=\"flex-responsive\" style={{ gap: '2rem' }}")
content = content.replace("style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}", "className=\"flex-responsive\" style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', justifyContent: 'space-between', alignItems: 'center' }}")
content = content.replace("style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}", "className=\"flex-responsive\" style={{ alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}")
content = content.replace("style={{ display: 'flex', gap: '1rem' }}", "className=\"flex-responsive\" style={{ gap: '1rem' }}")

with open('src/components/therapist/PatientDetail.tsx', 'w') as f:
    f.write(content)
