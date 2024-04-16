// server.js

import express from 'express';
import * as db from './db/config/db_config.js';

const app = express();

//Conectar ao banco de dados
db.DATABASE.authenticate()
  .then(() => {
    console.log("Conexão com banco de dados feita com sucesso!");
  })
  .catch(() => {
    console.log("Conexão com banco de dados não estabelecida");
  });

// Exemplo de rota de teste
app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});



// Inicie o servidor
export function startServer() {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
  });
}
