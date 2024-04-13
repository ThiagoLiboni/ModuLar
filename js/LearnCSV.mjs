
import express from "express";
import * as csv from "csv";
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use('/public', express.static(path.join(__dirname, '../public'), { extensions: ['css'] }));
app.use('/public', express.static(path.join(__dirname, '../public'), { extensions: ['png', 'jpg'] }));
app.use( '/js', express.static(path.join(__dirname, '../js'), { extensions: ['js'] }));
app.use('/Storage', express.static(path.join(__dirname, '../Storage')));


app.get('/Modular/Reckons/planodecorte', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/Reckons/ReckonsCutPlan.html"))
  })

app.get('/Modular/Reckons/planodecorte',async(req,res)=>{
    
const file = "dados_componentes.csv"

const Elemento = []
const Comprimento = []
const Largura = []
const Espessura = []

fs.createReadStream(file)
.pipe(csv.parse({ columns: true, delimiter: ';' }))
.on('data', (dadosLinha) => {
    // Adicionando o valor da segunda coluna de cada linha ao array
    Elemento.push(dadosLinha['Elemento'] || null);
    Comprimento.push(dadosLinha['Comprimento'] || null);
    Largura.push(dadosLinha['Largura'] || null);
    Espessura.push(dadosLinha['Espessura']|| null);
})
.on('end', () => {
    console.log('Importação concluída');
    const dadosJSON = {
        Elemento: Elemento,
        Comprimento: Comprimento,
        Largura: Largura,
        Espessura: Espessura
    };
    const local = path.join(__dirname, '../Storage/table.json');
    fs.writeFileSync(local, JSON.stringify(dadosJSON));
})

.on('error', (err) => {
    console.error('Erro ao ler o arquivo CSV:', err);
    return res.status(500).send("Erro ao ler o arquivo CSV");
});

});

app.listen(3000,() => console.log ("servidor iniciado"));
