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
app.get('/produtos', async (request, response) => {
    try {
        const result = await pool.query('SELECT * FROM produtos ORDER BY id');

        response.json(result.rows);
    } catch (error) {
        console.error('Erro ao listar produtos:', error.message);

        response.status(500).json({
            message: 'Erro ao listar produtos.'
        });
    }
});
app.post('/produtos', async (request, response) => {
    const {
        codigo,
        nome,
        descricao = null,
        unidade_medida = 'UN'
    } = request.body;

    if (!codigo || !nome) {
        return response.status(400).json({
            message: 'Código e nome são obrigatórios.'
        });
    }

    try {
        const result = await pool.query(
            `INSERT INTO produtos (codigo, nome, descricao, unidade_medida)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [codigo, nome, descricao, unidade_medida]
        );

        return response.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error.message);

        return response.status(500).json({
            message: 'Erro ao cadastrar produto.'
        });
    }
});
app.listen(PORT, () => {
  console.log(`Servidor do PCP funcionando na porta ${PORT}`);
});