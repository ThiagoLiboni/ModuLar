import express from 'express';

import path from 'path';
import { dirname} from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'
import https from 'https';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const routes_app = express.Router();


 // DESTINO DOWNLOAD
const destino = path.join(
  process.env.APPDATA,
  'SketchUp',
  'SketchUp 2022',
  'SketchUp',
  'Components')




// EFETUAR O DOWNLOAD DOS COMPONENTES PARA PASTA LOCAL
routes_app.post('/download', (req, res) => {
  const url = req.body.URL;
  const arquivoNome = `${req.body.Nome}.skp`;
  const caminhoCompleto = path.join(destino, arquivoNome);

  if (fs.existsSync(caminhoCompleto)) { //confere a existência do arquivo
    fs.unlinkSync(caminhoCompleto); //  limpar para reescrever.
    fs.closeSync(fs.openSync(caminhoCompleto, 'w'));
  }

  if (!fs.existsSync(caminhoCompleto)) { // confere a inexistência para que possa ser gerado..
    fs.closeSync(fs.openSync(caminhoCompleto, 'w'));
  }

  if (!fs.existsSync(destino)) { // confere a inexistência do caminho para que possa ser gerado..
    fs.mkdirSync(destino, { recursive: true });
  }

  const arquivo = fs.createWriteStream(caminhoCompleto);

  https.get(url, (response) => {
    response.pipe(arquivo);

    arquivo.on('finish', () => {
      arquivo.close(() => {

        const responseData = { message: 'Download concluído com sucesso' };
        res.status(200).json(responseData);
      });
    });
  }).on('error', (err) => {
    fs.unlink(caminhoCompleto, () => {
      console.error(`Erro durante o download: ${err.message}`);
      res.status(500).send('Erro durante o download');
    });
  });
});


//GUARDAR RELAÇÃO DE COMPONENTES 
routes_app.post('/savedData', (req, res) => {
  const dados = req.body.Data;

  const dataJSON = JSON.stringify(dados)
  const local = path.join(__dirname, '../Storage/dryStorage.json');
  fs.writeFileSync(local, dataJSON);


  res.send('Dados salvos com sucesso.')
})





//CADASTRAR NOVAS TEXTURAS
routes_app.post('/SaveTex', (req, res) => {

  const dados = req.body.Data;

  const dataJSON = JSON.stringify(dados)
  fs.writeFileSync('Storage/Texture.json', dataJSON);
  res.send('Dados Salvos com Sucesso.')
})


//CADASTRAR NOVAS TEXTURAS
routes_app.post('/saveBudget', (req, res) => {

  const dados = req.body;

  let existingData = "";
  try {
    const fileContent = fs.readFileSync('Storage/budget.json', 'utf-8');
    existingData = JSON.parse(fileContent);
  } catch (error) {
    console.error('Erro ao ler o arquivo JSON:', error);
  }

  // Adicionar os novos dados ao conteúdo existente
  const newData = [...existingData, dados];

  const dataJSON = JSON.stringify(newData)
  fs.writeFileSync('Storage/budget.json', dataJSON);
  res.send('Dados Salvos com Sucesso.')
})


export default routes_app;