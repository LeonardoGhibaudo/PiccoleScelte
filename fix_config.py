with open('src/config.ts', 'r') as f:
    content = f.read()

content = content.replace("export const API_BASE = import.meta.env.VITE_API_URL || '';", "export const API_BASE = (import.meta.env.VITE_API_URL || '').trim().replace(/\\/$/, '');")

with open('src/config.ts', 'w') as f:
    f.write(content)
