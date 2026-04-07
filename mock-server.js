
const express = require('express');

const app = express();

app.use(express.json());

// LOGIN
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'profesor@test.com' && password === '1234') {
    return res.json({
      token: 'fake-token-profesor',
      role: 'PROFESOR'
    });
  }

  if (email === 'alumno@test.com' && password === '1234') {
    return res.json({
      token: 'fake-token-alumno',
      role: 'ALUMNO'
    });
  }

  return res.status(401).json({ message: 'Credenciales incorrectas' });
});

// CREAR ENCUESTA
app.post('/api/surveys', (req, res) => {
  const auth = req.headers.authorization;

  if (auth === 'Bearer fake-token-profesor') {
    return res.status(201).json({
      id: 1,
      title: req.body.title
    });
  }

  return res.status(403).json({ message: 'Forbidden' });
});

// RESPONDER ENCUESTA
app.post('/api/surveys/:id/answers', (req, res) => {
  const auth = req.headers.authorization;

  if (auth === 'Bearer fake-token-alumno') {
    return res.json({ message: 'Respuesta guardada' });
  }

  return res.status(403).json({ message: 'Forbidden' });
});

app.listen(3000, () => {
  console.log('Mock API running on http://localhost:3000');
});