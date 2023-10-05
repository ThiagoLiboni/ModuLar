import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs'
import bodyParser from 'body-parser';
import https from 'https';
import os from 'os';



const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use('/public', express.static(path.join(__dirname, '/public'), { extensions: ['css'] }));
app.use('/public', express.static(path.join(__dirname, '/public'), { extensions: ['png', 'jpg'] }));
app.use( '/js', express.static(path.join(__dirname, '/js'), { extensions: ['js'] }));
app.use('/Storage', express.static(path.join(__dirname, 'Storage')));


app.use(bodyParser.json());

  

app.get('/Authentication', (req, res) => {
    res.sendFile(path.join(__dirname, 'Authentication.html'));
  });

  
app.get('/Home', (req, res) =>{
    res.sendFile(path.join(__dirname, "views/index.html"))
  } )
  

app.get('/component/DRYComponent', (req, res) =>{
    res.sendFile(path.join(__dirname, "views/DRYComponent.html"))
  } )

  
app.get('/component/WETComponent', (req, res) =>{
    res.sendFile(path.join(__dirname, "views/WETComponent.html"))
  } )

app.get('/Materials', (req, res) =>{
    res.sendFile(path.join(__dirname, "views/Materials.html"))
  } )
  
app.get('/Materials/MDF', (req, res) =>{
      res.sendFile(path.join(__dirname, "views/Materials.html"))
    } )

  const destino = path.join( // destino download
    process.env.APPDATA,
    'SketchUp',
    'SketchUp 2022',
    'SketchUp',
    'Components')
 
    
  app.post('/download', (req, res) => {
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
   
app.post('/savedData', (req, res) => {
    const dados = req.body.Data;

    const dataJSON = JSON.stringify(dados)
    fs.writeFileSync('Storage/dryStorage.json', dataJSON);
    

    res.send('Dados salvos com sucesso.')
  })
  
  app.post('/SaveTex', (req, res) => {

    const dados = req.body.Data;

    const dataJSON = JSON.stringify(dados)
    fs.writeFileSync('Storage/Texture.json',dataJSON);
   res.send('Dados Salvos com Sucesso.')
  })
  
app.listen(port, ()=>{
    console.log(`Servidor iniciado na porta ${port}`)
})