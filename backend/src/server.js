require('dotenv').config();

const express = require('express');
const pool = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (request, response) => {
  response.json({
    message: 'API do PCP Confecção funcionando!',
  });
});
app.get('/database', async (request, response) => {
  try {
    const result = await pool.query('SELECT NOW()');

    response.json({
      message: 'Conexão com o PostgreSQL realizada com sucesso!',
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    console.error('Erro ao conectar com o PostgreSQL:', error.message);

    response.status(500).json({
      message: 'Erro ao conectar com o PostgreSQL.',
    });
  }
});
app.listen(PORT, () => {
  console.log(`Servidor do PCP funcionando na porta ${PORT}`);
});