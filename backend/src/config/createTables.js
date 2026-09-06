require('dotenv').config();
const pool = require('./database');

async function createTables() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS produtos (
                id SERIAL PRIMARY KEY,
                codigo VARCHAR(30) UNIQUE NOT NULL,
                nome VARCHAR(120) NOT NULL,
                descricao TEXT,
                unidade_medida VARCHAR(10) NOT NULL DEFAULT 'UN',
                ativo BOOLEAN NOT NULL DEFAULT TRUE,
                criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log('Tabela produtos criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar a tabela produtos:', error.message);
    } finally {
        await pool.end();
    }
}

createTables();