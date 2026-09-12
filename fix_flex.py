import os
import re

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.css')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()

            content = content.replace('className="d-flex justify-content-between align-items-center mt-5"', 'className="flex-responsive" style={{ justifyContent: "space-between", alignItems: "center", marginTop: "2rem" }}')
            content = content.replace('className="d-flex justify-content-between px-5 w-100"', 'className="flex-responsive" style={{ justifyContent: "space-between", padding: "0 2rem", width: "100%" }}')
            content = content.replace('className="d-flex justify-content-end"', 'className="flex-responsive-reverse" style={{ justifyContent: "flex-end" }}')
            content = content.replace('className="d-flex align-items-center gap-2"', 'className="flex-responsive" style={{ alignItems: "center", gap: "0.5rem" }}')

            with open(filepath, 'w') as f:
                f.write(content)
