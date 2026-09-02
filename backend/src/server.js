require('dotenv').config();

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (request, response) => {
  response.json({
    message: 'API do PCP Confecção funcionando!',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor do PCP funcionando na porta ${PORT}`);
});