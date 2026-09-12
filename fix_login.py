with open('src/components/LoginScreen.css', 'r') as f:
    content = f.read()

content = content.replace("max-width: 200px;", "max-width: 100%;")
content = content.replace("text-align: center;", "text-align: left;")
content = content.replace("letter-spacing: 0.5rem;", "")
content = content.replace("font-family: monospace;", "")

with open('src/components/LoginScreen.css', 'w') as f:
    f.write(content)
