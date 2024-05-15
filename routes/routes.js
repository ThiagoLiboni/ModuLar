import express from 'express';

import path from 'path';
import { dirname} from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'


import * as csv from "csv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();



// app.get('/', (req, res) => {
//     res.send("Hello World");
//   });
  router.get('/Authentication', (req, res) => {
    res.sendFile(path.join(__dirname, '../Authentication.html'));
  });
  router.get('/Home', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"))
  })
  router.get('/component/DRYComponent', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/DRYComponent.html"))
  })
  router.get('/component/WETComponent', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/WETComponent.html"))
  })
  router.get('/Materials', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/Materials.html"))
  })
  router.get('/Materials/MDF', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/Materials.html"))
  })
  // router.get('/Modular/Reckons', (req, res) => {
  //   res.sendFile(path.join(__dirname, "views/Reckons/ReckonsHome.html"))
  // })
  router.get('/Modular/Reckons/Cutplan', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/Reckons/ReckonsCutPlan.html"))
  })
  router.get('/Modular/Register/SellerRegistration', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/Reckons/Register/new_User.html"))
  });
  router.get('/Modular/Register/CustumerRegistration', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/Reckons/Register/new_User.html"))
  });
  router.get('/Modular/RegisterProject', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/Reckons/Register/new_project.html"))
  });
  router.get('/Modular/Projects', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/Reckons/budgetHome.html"))
  });
  router.get('/Modular/Budget-Guide/:id', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/Reckons/budgetGuide.html"))
  });
  router.get('/Modular/BudgetProcessed', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/Reckons/budgetProcessed.html"))
  });
  
  router.get("/Modular/Reckons", async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/Reckons/ReckonsHome.html"))

    //CRIA RELAÇÃO DE DADOS PARA JSON APARTIR DE UMA TABELA EXISTENTE

    const file = "dados_componentes.csv"
  
    const Projeto = []
    const Elemento = []
    const Comprimento = []
    const Largura = []
    const Espessura = []
    const Grupo = []
  
    fs.createReadStream(file)
      .pipe(csv.parse({ columns: true, delimiter: ';' }))
      .on('data', (dadosLinha) => {
        // Adicionando o valor da segunda coluna de cada linha ao array
        Projeto.push(dadosLinha['Projeto'] || null);
        Elemento.push(dadosLinha['Elemento'] || null);
        Comprimento.push(dadosLinha['Comprimento'] || null);
        Largura.push(dadosLinha['Largura'] || null);
        Espessura.push(dadosLinha['Espessura'] || null);
        Grupo.push(dadosLinha['Espessura'] || null);
      })
      .on('end', () => {
        const dadosJSON = {
          Projeto: Projeto,
          Elemento: Elemento,
          Comprimento: Comprimento,
          Largura: Largura,
          Espessura: Espessura
        };
        console.log(dadosJSON);
        console.log('Importação concluída');
  
        const local = path.join(__dirname, '../Storage/table.json');
        fs.writeFileSync(local, JSON.stringify(dadosJSON));
      })
  
      .on('error', (err) => {
        console.error('Erro ao ler o arquivo CSV:', err);
        return res.status(500).send("Erro ao ler o arquivo CSV");
      });
  
  });

  
export default  router;