with open('src/components/game/Simulator.css', 'r') as f:
    content = f.read()

old_img = """.vn-character-img {
  height: 400px;
  width: auto;
  object-fit: contain;
  /* Se l'immagine ha uno sfondo bianco, possiamo usare mix-blend-mode per renderlo trasparente se il background è scuro, ma meglio usare mask o filter */
}"""

new_img = """.vn-character-img {
  height: 400px;
  width: auto;
  object-fit: cover;
  border-radius: 12px;
  border: 6px solid #FFF;
  box-shadow: 0 12px 30px rgba(0,0,0,0.4);
  background: #FFF;
  transform: rotate(-2deg); /* Polaroid effect */
  transition: transform 0.3s ease;
}
.character-right:hover .vn-character-img {
  transform: rotate(0deg) scale(1.02);
}"""

content = content.replace(old_img, new_img)

with open('src/components/game/Simulator.css', 'w') as f:
    f.write(content)
