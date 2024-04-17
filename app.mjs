import express from 'express';//Gerenciador de rotas

import path from 'path';
import { dirname} from 'path';
import { fileURLToPath } from 'url';

import {DATABASE} from './db/config/db_config.js';
import VENDEDOR from './db/model/Vendedor.js';
import CLIENTE from './db/model/Cliente.js';
import PROJETO from './db/model/Projetos.js';

import multer from 'multer';

import fs from 'fs'
import bodyParser from 'body-parser';
import https from 'https';

import os from 'os';
import * as csv from "csv";
import { where } from 'sequelize';

let port = process.env.PORT || 3000;

const app = express();

//Conectar ao banco de dados
DATABASE.authenticate()
  .then(() => {
    console.log("Conexão com banco de dados feita com sucesso!");
  })
  .catch(() => {
    console.log("Conexão com banco de dados não estabelecida");
  });


  
export const username = os.userInfo().username;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//LIDA COM O PROCESSO DE CONFIG STYLE
app.use(express.static('su_modular'));
app.use('/public', express.static(path.join(__dirname, '/public'), { extensions: ['css'] }));
app.use('/public', express.static(path.join(__dirname, '/public'), { extensions: ['png', 'jpg'] }));
app.use('/js', express.static(path.join(__dirname, '/js'), { extensions: ['js'] }));
app.use('/Storage', express.static(path.join(__dirname, 'Storage')));

app.use(express.text());
app.use(bodyParser.urlencoded({ extended: true })); // Permite a requisição de arrays e objetos
app.use(bodyParser.json()); // Lida com JSON, como tipo de requisição 
const upload = multer();// Lidar com processamento de informações do fomrulário



//ROTAS GET PARA REDIRECIONAMENTO 

app.get('/', (req, res) => {
  res.send("Hello World");
});
app.get('/Authentication', (req, res) => {
  res.sendFile(path.join(__dirname, 'Authentication.html'));
});
app.get('/Home', (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"))
})
app.get('/component/DRYComponent', (req, res) => {
  res.sendFile(path.join(__dirname, "views/DRYComponent.html"))
})
app.get('/component/WETComponent', (req, res) => {
  res.sendFile(path.join(__dirname, "views/WETComponent.html"))
})
app.get('/Materials', (req, res) => {
  res.sendFile(path.join(__dirname, "views/Materials.html"))
})
app.get('/Materials/MDF', (req, res) => {
  res.sendFile(path.join(__dirname, "views/Materials.html"))
})
// app.get('/Modular/Reckons', (req, res) => {
//   res.sendFile(path.join(__dirname, "views/Reckons/ReckonsHome.html"))
// })
app.get('/Modular/Reckons/Cutplan', (req, res) => {
  res.sendFile(path.join(__dirname, "views/Reckons/ReckonsCutPlan.html"))
})
app.get('/Modular/Register/SellerRegistration', (req, res) => {
  res.sendFile(path.join(__dirname, "views/Reckons/Register/new_User.html"))
});
app.get('/Modular/Register/CustumerRegistration', (req, res) => {
  res.sendFile(path.join(__dirname, "views/Reckons/Register/new_User.html"))
});
app.get('/Modular/RegisterProject', (req, res) => {
  res.sendFile(path.join(__dirname, "views/Reckons/Register/new_project.html"))
});
app.get('/Modular/Projects', (req, res) => {
  res.sendFile(path.join(__dirname, "views/Reckons/budget.html"))
});
app.get('/Modular/Budget-Guide/:id', (req, res) => {
  res.sendFile(path.join(__dirname, "views/Reckons/budgetGuide.html"))

});





// const destino = path.join( // destino download
//   process.env.APPDATA,
//   'SketchUp',
//   'SketchUp 2022',
//   'SketchUp',
//   'Components')

// // EFETUAR O DOWNLOAD DOS COMPONENTES PARA PASTA LOCAL
// app.post('/download', (req, res) => {
//   const url = req.body.URL;
//   const arquivoNome = `${req.body.Nome}.skp`;
//   const caminhoCompleto = path.join(destino, arquivoNome);

//   if (fs.existsSync(caminhoCompleto)) { //confere a existência do arquivo
//     fs.unlinkSync(caminhoCompleto); //  limpar para reescrever.
//     fs.closeSync(fs.openSync(caminhoCompleto, 'w'));
//   }

//   if (!fs.existsSync(caminhoCompleto)) { // confere a inexistência para que possa ser gerado..
//     fs.closeSync(fs.openSync(caminhoCompleto, 'w'));
//   }

//   if (!fs.existsSync(destino)) { // confere a inexistência do caminho para que possa ser gerado..
//     fs.mkdirSync(destino, { recursive: true });
//   }

//   const arquivo = fs.createWriteStream(caminhoCompleto);

//   https.get(url, (response) => {
//     response.pipe(arquivo);

//     arquivo.on('finish', () => {
//       arquivo.close(() => {

//         const responseData = { message: 'Download concluído com sucesso' };
//         res.status(200).json(responseData);
//       });
//     });
//   }).on('error', (err) => {
//     fs.unlink(caminhoCompleto, () => {
//       console.error(`Erro durante o download: ${err.message}`);
//       res.status(500).send('Erro durante o download');
//     });
//   });
// });


//GUARDAR RELAÇÃO DE COMPONENTES 
app.post('/savedData', (req, res) => {
  const dados = req.body.Data;

  const dataJSON = JSON.stringify(dados)
  fs.writeFileSync('Storage/dryStorage.json', dataJSON);


  res.send('Dados salvos com sucesso.')
})


//CADASTRAR NOVAS TEXTURAS
app.post('/SaveTex', (req, res) => {

  const dados = req.body.Data;

  const dataJSON = JSON.stringify(dados)
  fs.writeFileSync('Storage/Texture.json', dataJSON);
  res.send('Dados Salvos com Sucesso.')
})

//GERAR RELAÇÃO DE PEÇAS POR PROJETO

app.get("/Modular/Reckons", async (req, res) => {
  res.sendFile(path.join(__dirname, "views/Reckons/ReckonsHome.html"))
  const file = "dados_componentes.csv"

  const Projeto = []
  const Elemento = []
  const Comprimento = []
  const Largura = []
  const Espessura = []

  fs.createReadStream(file)
    .pipe(csv.parse({ columns: true, delimiter: ';' }))
    .on('data', (dadosLinha) => {
      // Adicionando o valor da segunda coluna de cada linha ao array
      Projeto.push(dadosLinha['Projeto'] || null);
      Elemento.push(dadosLinha['Elemento'] || null);
      Comprimento.push(dadosLinha['Comprimento'] || null);
      Largura.push(dadosLinha['Largura'] || null);
      Espessura.push(dadosLinha['Espessura'] || null);
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

      const local = path.join(__dirname, 'Storage/table.json');
      fs.writeFileSync(local, JSON.stringify(dadosJSON));
    })

    .on('error', (err) => {
      console.error('Erro ao ler o arquivo CSV:', err);
      return res.status(500).send("Erro ao ler o arquivo CSV");
    });

});






//CADASTRAR NOVO VENDEDOR
app.post('/Vendedor', upload.none(), async (req, res) => { //Upload.none() ==== INFORMA QUE LIDARÁ APENAS COM CAMPO DE TEXTO E NENHUM ARQUIVO
  try {
    const data = req.body;
    const contato = data.phone
    const CONTATO = contato.replace(/[()\s-]/g, '')// Remover os caracteres de formatação (pontos e traços) do CPF
    const endereco = `${data.endereco},  ${data.complemento} - ${data.bairro}`
    const newSeller = {
      Contato: CONTATO,
      Nome: data.nome,
      Email: data.email,
      Endereco: endereco,
      Cidade: data.cidade,
      Estado: data.estado
    }

    const user = await VENDEDOR.create(newSeller);// Inserir o novo usuário no banco de dados
    console.log('Novo usuário inserido:', user.toJSON());
    console.log(`Dados recebidos: Vendedor: ${newSeller.Nome}`)

    res.status(200).send('Dados do formulário recebidos com sucesso!');
  } catch (error) {
    // Se ocorrer um erro durante o processamento, você pode lidar com ele aqui
    console.error('Erro durante o processamento do formulário:', error);
    res.status(500).send('Ocorreu um erro durante o processamento do formulário. Por favor, tente novamente.');
  }

})

//CADASTRAR NOVOS CLIENTE
app.post('/Cliente', upload.none(), async (req, res) => { //Upload.none() ==== INFORMA QUE LIDARÁ APENAS COM CAMPO DE TEXTO E NENHUM ARQUIVO
  try {

    const data = req.body;
    const cpf = data.cpf
    const CPF = cpf.replace(/[.-]/g, ''); // Remover os caracteres de formatação (pontos e traços) do CPF
    const endereco = `${data.endereco},  ${data.complemento} - ${data.bairro}`
    const newClient = {
      CPF: CPF,
      Nome: data.nome,
      Contato: data.phone,
      Email: data.email,
      Endereço: endereco,
      Cidade: data.cidade,
      Estado: data.estado
    };


    const user = await CLIENTE.create(newClient);// Inserir o novo usuário no banco de dados
    console.log('Novo cadastro inserido:', user.toJSON());
    console.log(`Dados recebidos: Cliente: ${newClient.Nome}`)

    res.status(200).send('Dados do formulário recebidos com sucesso!');
  } catch (error) {
    // Se ocorrer um erro durante o processamento, você pode lidar com ele aqui
    console.error('Erro durante o processamento do formulário:', error);
    res.status(500).send('Ocorreu um erro durante o processamento do formulário. Por favor, tente novamente.');
  }
})


//REGISTRAR NOVOS PROJETOS 
app.post('/Projetos', upload.none(), async (req, res) => { //Upload.none() ==== INFORMA QUE LIDARÁ APENAS COM CAMPO DE TEXTO E NENHUM ARQUIVO
  try {
    const data = req.body;
    const vendedor = data.vendedor;
    const projeto = data.projeto;
    const data_projeto = data.dataProjeto;
    const data_final = data.dataFinal;
    const cliente = data.cliente;

    const projetos = {
      Cliente: cliente,
      Projeto: projeto,
      Data_Projeto: data_projeto,
      Data_Orcamento: data_final,
      Vendedor: vendedor,
      Status_process: 'Aberto'
    }

    const user = await PROJETO.create(projetos);// Inserir o novo usuário no banco de dados
    console.log('Novo projeto inserido:', user.toJSON());
    console.log(`Dados recebidos: Projeto: ${projetos.Projeto},  Cliente: ${projetos.Cliente}`)


    res.status(200).send('Dados do projeto recebidos com sucesso!');
  } catch (error) {
    // Se ocorrer um erro durante o processamento, você pode lidar com ele aqui
    console.error('Erro durante o processamento do formulário:', error);
    res.status(500).send('Ocorreu um erro durante o processamento do formulário. Por favor, tente novamente.');
  }
})

//ACESSAR LISTA DOS NOMES DE CLIENTES E VENDEDORES;
app.get('/catchNames', async (req, res) => {
  try {
    const Cliente = await CLIENTE.findAll({
      attributes: ['Nome']
    });
    const Vendedor = await VENDEDOR.findAll({
      attributes: ['Nome']
    });


    const clientes = Cliente.map(cliente => cliente.Nome);
    const vendedores = Vendedor.map(vendedor => vendedor.Nome);

    // Agrupe os dados em um objeto
    const data = {
      clientes: clientes,
      vendedores: vendedores
    };

    // Envie o objeto como resposta JSON
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter os nomes dos clientes e vendedores' });
  }
});

// ACESSAR A TABELA PROJETOS
app.get('/tableProjetos', async (req, res) => {

  try {
    const data = await PROJETO.findAll();

    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a relação de projetos' })
  }

})

// ACESSAR A TABELA CLIENTES
app.get('/tableClientes', async (req, res) => {

  try {
    const data = await CLIENTE.findAll();

    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a relação de clientes' })
  }

})

app.post('/canceledOrder', async (req, res) => {
  try {
    
    const id = req.body

    const order = await PROJETO.update({Status_process:"Cancelado"}, {
      where: {
        id_relatorio: id
      }
    })
    console.log('Status atualizado com sucesso')
    res.status(200).send('Status atualizados')

  

  }catch(error){
    console.error('Erro durante o processamento do formulário:', error);
  res.status(500).send('Ocorreu um erro durante o processamento do formulário. Por favor, tente novamente.');}
})



app.listen(port, () => {
    console.log(`Sessão iniciada - ${port}`)

  })

  export default async (req, res) => {
    try {
      await app(req, res);
    } catch (error) {
      console.error("Erro ao lidar com a solicitação:", error);
      res.status(500).send("Erro interno do servidor");
    }
  };