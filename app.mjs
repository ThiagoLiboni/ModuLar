import express from 'express';//Gerenciador de rotas
import router from './routes/routes.js';
import routes_app from './routes/routes_app.js';


import dotenv from 'dotenv';
dotenv.config();



import path from 'path';
import { dirname} from 'path';
import { fileURLToPath } from 'url';

import {connection} from './db/config/db_config.js';
import {CLIENTE} from './db/model/Cliente.js'
import {VENDEDOR} from './db/model/Vendedor.js';
import {PROJETOS} from './db/model/Projetos.js';

import multer from 'multer';

import bodyParser from 'body-parser';

import os from 'os';




let port = process.env.PORT || 3000;

// export const username = os.userInfo().username;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload = multer();// Lidar com processamento de informações do fomrulário



//CONECTAR DB MYSQL
connection.connect(function(err) {
  if (err) throw err
  console.log('Connected')
  
});

app.use(express.text());
app.use(bodyParser.urlencoded({ extended: true })); // Permite a requisição de arrays e objetos
app.use(bodyParser.json()); // Lida com JSON, como tipo de requisição 


//LIDA COM O PROCESSO DE CONFIG STYLE
app.use(express.static('su_modular'));
app.use('/public', express.static(path.join(__dirname, '/public'), { extensions: ['css'] }));
app.use('/public', express.static(path.join(__dirname, '/public'), { extensions: ['png', 'jpg'] }));
app.use('/js', express.static(path.join(__dirname, '/js'), { extensions: ['js'] }));
app.use('/fb', express.static(path.join(__dirname, '/fb'), { extensions: ['js'] }));
app.use('/Storage', express.static(path.join(__dirname, 'Storage')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




let UserID 
console.log(UserID)
app.post('/Auth', async(req, res) => {
 try{
    const data = req.body
    UserID = data
    console.log(UserID);

  
    res.sendStatus(200)
  }catch(err) {
    res.status(500).send(err)}
});






//ROTAS GET PARA REDIRECIONAMENTO 
app.get('/Authentication', router);
app.get('/Home', router);
app.get('/component/DRYComponent', router);
app.get('/component/WETComponent', router);
app.get('/Materials', router);
app.get('/Materials/MDF', router);
app.get('/Modular/Reckons/Cutplan', router);
app.get('/Modular/Register/SellerRegistration', router);
app.get('/Modular/Register/CustumerRegistration', router);
app.get('/Modular/RegisterProject', router);
app.get('/Modular/Projects', router);
app.get('/Modular/Budget-Guide/:id',router);
app.get('/Modular/BudgetProcessed', router);
app.get("/Modular/Reckons", router);
app.get("/Modular/Budget", router);
app.get("/Modular/Budget", router);


// EFETUAR O DOWNLOAD DOS COMPONENTES PARA PASTA LOCAL
app.post('/download', routes_app);

//GUARDAR RELAÇÃO DE COMPONENTES 
app.post('/savedData', routes_app);

//SALVAR NOVAS TEXTURAS
app.post('/SaveTex', routes_app);

//SALVAR NOVAS TEXTURAS
app.post('/saveBudget', routes_app);

//SALVAR NOVAS TEXTURAS
app.post('/generate-PDF', routes_app);


//CADASTRAR NOVO VENDEDOR
app.post('/Vendedor', upload.none(), async (req, res) => { //Upload.none() ==== INFORMA QUE LIDARÁ APENAS COM CAMPO DE TEXTO E NENHUM ARQUIVO
  try {
    const data = req.body;
    const contato = data.phone
    const CONTATO = contato.replace(/[()\s-]/g, '')// Remover os caracteres de formatação (pontos e traços) do CPF
    const endereco = `${data.endereco},  ${data.complemento} - ${data.bairro}`
    const Seller = {
      Contato: CONTATO,
      Nome: data.nome,
      Email: data.email,
      Endereco: endereco,
      Cidade: data.cidade,
      Estado: data.estado
    }
    const vendedor = await new VENDEDOR(UserID)
    vendedor.INSERT(Seller);// Inserir o novo usuário no banco de dados
    
    // console.log(`Dados recebidos: Vendedor: ${Seller.Nome}`)

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
    const Client = {
      CPF: CPF,
      Nome: data.nome,
      Contato: data.phone,
      Email: data.email,
      Endereco: endereco,
      Cidade: data.cidade,
      Estado: data.estado
    };

    const cliente =  new CLIENTE(UserID);
    await cliente.INSERT(Client)// Inserir o novo usuário no banco de dados

    // console.log(`Dados recebidos: Cliente: ${Client.Nome}`)

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
    const nome_projeto = data.projeto;
    const data_projeto = data.dataProjeto;
    const data_final = data.dataFinal;
    const cliente = data.cliente;

    const projetos = {
      Cliente: cliente,
      Nome_Projeto: nome_projeto,
      Data_Projeto: data_projeto,
      Data_Orcamento: data_final,
      Vendedor: vendedor,
      Status_Processo: 'Aberto'
    }
    const PROJETO =  new PROJETOS(UserID);
    await PROJETO.INSERT(projetos);// Inserir o novo usuário no banco de dados

    // console.log(`Dados recebidos: Projeto: ${projetos.Projeto},  Cliente: ${projetos.Cliente}`)


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
    const NOME =  "Nome"

    const nomes_clientes =  new CLIENTE(UserID);
    const Cliente = await nomes_clientes.SELECT_COLUMN(NOME)
    
    const nomes_vendedores =  new VENDEDOR(UserID);
    const Vendedor = await nomes_vendedores.SELECT_COLUMN(NOME)

    // Agrupe os dados em um objeto
    const data = {
      clientes: Cliente,
      vendedores: Vendedor
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
      const column = "Status_Processo";
      const value = "Aberto"
      console.log(UserID)  
      const projetos = new PROJETOS(UserID);
    
      
      const data = await projetos.SELECT_WHERE(column,value);
      
      // console.log(data)
      
      res.json(data)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter a relação de projetos' })
    }
    
  })
  
  app.get('/budgetProcessed', async (req, res) => {
    
    try {
      
    const column = "Status_Processo";
    const value = ["Cancelado","Concluido"];

    const projetos = new PROJETOS(UserID);

    const data = await projetos.SELECT_WHERE_IN(column,value);
    
    // console.log(data)

    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a relação de projetos' })
  }

})

// ACESSAR A TABELA CLIENTES
app.get('/tableClientes', async (req, res) => {

  try {


    const cliente = new CLIENTE(UserID)

    const data = await cliente.SELECT();

    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a relação de clientes' })
  }

})

app.post('/orderStatusChanged', async (req, res) => {
  try {
    const column_status = "Status_Processo";
    const column_id = "id_Projetos";
    const ID = req.body.id
    const status = req.body.status
  

    const projetos = new PROJETOS(UserID);
    const budget = await projetos.UPDATE(column_status,status,column_id,ID)

    res.status(200).send('Status atualizado com sucesso!');
    
  }catch(error){
    console.error('Erro durante o processamento do formulário:', error);
    res.status(500).send('Ocorreu um erro durante o processamento do formulário. Por favor, tente novamente.');}
  })
  
  let optionFilter
  app.post('/filterTable', upload.none(),  async (req, res)=>{
    try{
      optionFilter = req.body.filter
  
      
      res.status(200).send('Requisição de filtro com sucesso!');
  }
  catch(error){
    console.error('Erro durante o processamento do formulário:', error);
    res.status(500).send('Ocorreu um erro durante o processamento do formulário. Por favor, tente novamente.');
  }
})

app.get('/ShowTable', async (req, res) => {
  try {
    const option = optionFilter
    const column_status = "Status_Processo";
    const column_value = "Aberto";
    const projetos = new PROJETOS(UserID);
    const filteredData = await projetos.ORDER_BY(column_status, column_value, option); 
    res.json(filteredData);
  } catch (error) {
    console.error('Erro ao obter os dados filtrados:', error);
    res.status(500).send('Ocorreu um erro ao obter os dados filtrados. Por favor, tente novamente.');
  }
});


app.get('/ShowTableProcessed', async (req, res) => {
  try {
    const option = optionFilter
    const column_status = "Status_Processo";
    const column_value = ["Concluido","Cancelado"];
    const projetos = new PROJETOS(UserID);
    const filteredData = await projetos.ORDER_BY_WHERE(column_status, column_value, option); 
    res.json(filteredData);
  } catch (error) {
    console.error('Erro ao obter os dados filtrados:', error);
    res.status(500).send('Ocorreu um erro ao obter os dados filtrados. Por favor, tente novamente.');
  }
});

app.get('/nameSearch', async (req, res) => {
  try {
    const value = optionFilter
    const column1 = ["Cliente"];
    const column2 = ["Vendedor"];
    const projetos = new PROJETOS(UserID);
    const filteredData = await projetos.SELECT_WHERE_OR(column1,column2,value); // Use optionFilter para filtrar os dados
    res.json(filteredData);
  } catch (error) {
    console.error('Erro ao obter os dados filtrados:', error);
    res.status(500).send('Ocorreu um erro ao obter os dados filtrados. Por favor, tente novamente.');
  }
});



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
