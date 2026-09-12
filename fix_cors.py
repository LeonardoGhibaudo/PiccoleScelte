with open('server/src/index.ts', 'r') as f:
    content = f.read()

new_cors = """const allowedOrigins = ['http://localhost:5174', 'http://localhost:5173', 'https://piccolescelte.netlify.app', 'https://piccolescelte.com', 'https://www.piccolescelte.com'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || (origin and origin.endswith('.vercel.app'))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }"""

content = content.replace("""const allowedOrigins = ['http://localhost:5174', 'http://localhost:5173', 'https://piccolescelte.netlify.app', 'https://piccolescelte.com', 'https://www.piccolescelte.com'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }""", new_cors)

with open('server/src/index.ts', 'w') as f:
    f.write(content)
