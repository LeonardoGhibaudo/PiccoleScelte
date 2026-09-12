import re
with open('src/App.tsx', 'r') as f:
    content = f.read()

wrapper = """  const handleSetActivePatient = (p: Patient | null) => {
    if (p) sessionStorage.setItem('activePatient', JSON.stringify(p));
    else sessionStorage.removeItem('activePatient');
    setActivePatient(p);
  };
"""
# Insert after setActivePatient
content = re.sub(
    r"const \[activePatient, setActivePatient\].*?\}\);",
    lambda m: m.group(0) + "\n\n" + wrapper,
    content,
    flags=re.DOTALL
)

# Fix React import
if "import React" not in content:
    content = "import React, { useState, useEffect } from 'react';\n" + content.replace("import { useState } from 'react';", "")

with open('src/App.tsx', 'w') as f:
    f.write(content)
