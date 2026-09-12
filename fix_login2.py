with open('src/components/LoginScreen.css', 'r') as f:
    content = f.read()

old_container = """.login-container {
  width: 100%;
  background: var(--panel-bg);"""

new_container = """.login-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: var(--panel-bg);"""

content = content.replace(old_container, new_container)

with open('src/components/LoginScreen.css', 'w') as f:
    f.write(content)
