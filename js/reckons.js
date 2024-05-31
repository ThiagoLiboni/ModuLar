const verificarPagina = window.location.pathname.split("/").pop();

localStorage.setItem('userID', 'SyzDcAldfteL9vclQWyN5Zcnx2i1')
const USER = localStorage.getItem('userID')

fetch('/Auth', 
    {
    method:'POST',
    content: 'application/text',
    body: USER
})
.then(response=>{
    if(response.ok){
        console.log(USER)
    }
})
.catch(error=>{console.log('Usuário não identificado',error)})




import { Section } from './objectCut.js';

let Estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
    "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
    "SP", "SE", "TO"
];

let body;

if (verificarPagina == "SellerRegistration") {
    body = document.getElementById('main').innerHTML = `
        <div class="container" div="logo"
        style="        
        width: 140px;
        height: 70px;
        display: flex;
        margin-left: 0;
        padding: 0;
               "> <img src="../../public/src/logoBlack.png" alt="" srcset=""></div>
        
               <h1>Cadastrar Vendedor</h1><br>
        <form id = "myForm" class="row g-3">

            <div class="col-md-6">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" placeholder="Nome Completo" name="nome" required>
            </div>

            <div class="col-md-6">
            <label for="phone" class="form-label">Celular</label>
            <input type="text" class="form-control" id="phone" name="phone" required>
            </div>

            <div class="col-12">
            <label for="email" class="form-label">Email</label>
            <input type="text" class="form-control" id="email" name="email">
            </div>

            <div class="col-12">
            <label for="endereco" class="form-label">Endereço</label>
            <input type="text" class="form-control" id="endereco" name="endereco" required>
            </div>

            <div class="col-12">
            <label for="complemento" class="form-label">Complemento</label>
            <input type="text" class="form-control" id="complemento" name="complemento" maxlength="16" style="width:200px" required>
            </div>
            
            <div class="col-12">
            <label for="bairro" class="form-label">Bairro</label>
            <input type="text" class="form-control" id="bairro" name="bairro" required>
            </div>


            <div class="col-md-6">
                <label for="cidade" class="form-label">Cidade</label>
                <input type="text" class="form-control" id="cidade" name="cidade" required>
            </div>

            <div class="col-md-4">
                <label for="estado" class="form-label">Estado</label>
                <select id="estado" class="form-select" name="estado" required>
                <option selected>Selecionar...</option>
                </select>
            </div><br>

            <div class="col-12">
            <button id="enviar" type="submit" class="btn btn-primary">Cadastrar</button>
            </div>
        </form>
`
}


if (verificarPagina == "CustumerRegistration") {
    body = document.getElementById('main').innerHTML = `
        <div class="container" div="logo"
        style="        
        width: 140px;
        height: 70px;
        display: flex;
        margin-left: 0;
        padding: 0;
               "> <img src="../../public/src/logoBlack.png" alt="" srcset=""></div>

        <h1>Cadastrar Cliente</h1><br>
        <form id="myForm" class="row g-3">

            <div class="col-md-6">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control " id="nome" name="nome" placeholder="Nome Completo" required>
                <div class="invalid-feedback">
                    Por favor, insira o nome.
                </div>
            </div>

            <div class="col-md-6">
            <label for="cpf" class="form-label">CPF</label>
            <input type="text" class="form-control" id="cpf" name="cpf" maxlength="14" required>
                <div class="invalid-feedback">
                    Por favor, insira o CPF.
                </div>
            </div>

            <div class="col-md-6">
            <label for="phone" class="form-label">Celular</label>
            <input type="text" class="form-control" id="phone" name="phone" maxlength="15" required>
            </div>

            <div class="col-12">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name ="email">
            </div>

            <div class="col-12">
            <label for="endereco" class="form-label">Endereço</label>
            <input type="text" class="form-control" id="endereco" name="endereco" required>
            </div>
            
            <div class="col-12">
            <label for="complemento" class="form-label">Complemento</label>
            <input type="text" class="form-control" id="complemento" name="complemento" maxlength="16" style="width:200px" required>
            </div>
            
            <div class="col-12">
            <label for="bairro" class="form-label">Bairro</label>
            <input type="text" class="form-control" id="bairro" name="bairro" required>
            </div>
            
            <div class="col-md-6">
                <label for="cidade" class="form-label">Cidade</label>
                <input type="text" class="form-control" id="cidade" name="cidade" required>
            </div>

            <div class="col-md-4">
                <label for="estado" class="form-label">Estado</label>
                <select id="estado" class="form-select" name = "estado" required>
                <option selected>Selecionar...</option>
                </select>
            </div><br>

            <div class="col-12">
            <button id="enviar" type="submit" class="btn btn-primary">Cadastrar</button>
            </div>
        </form>
`

}

if (body) {

    let CPF = document.getElementById('cpf')
    if (CPF) {
        CPF.addEventListener('input', function (e) {
            let cpf = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Insere o primeiro ponto depois dos 3 primeiros dígitos
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Insere o segundo ponto depois dos 6 primeiros dígitos
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Insere o hífen no final

            e.target.value = cpf;
        })
    }

    let PHONE = document.getElementById('phone')
    if (PHONE) {
        PHONE.addEventListener('input', function (e) {
            let phone = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
            let formattedPhone = '';

            if (phone.length < 11) { // Se o número não tiver sido completamente digitado
                formattedPhone = '(' + phone.substring(0, 2) + ') ' + phone.substring(2, 7); // Formata (xx) x xxxx
                if (phone.length > 7) { // Se houver mais números após o primeiro espaço
                    formattedPhone += '-' + phone.substring(7); // Adiciona o restante dos números após o traço
                }
            } else { // Se o número já tiver sido completamente digitado
                formattedPhone = '(' + phone.substring(0, 2) + ') ' + phone.substring(2, 7) + '-' + phone.substring(7); // Formata (xx) x xxxx-xxxx
            }

            e.target.value = formattedPhone;
        });
    }

    let selectEstado = document.getElementById("estado");
    if (selectEstado) {
        Estados.forEach(element => {
            let option = document.createElement("option");
            option.text = element;
            option.value = element;
            selectEstado.add(option);
        })
    }

    const form = document.getElementById("myForm")

    form.addEventListener("submit", (e) => {

        e.preventDefault();
        const formData = new FormData(form);
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        let rota;
        if (verificarPagina == "SellerRegistration") {
            rota = '/Vendedor'
        } else if (verificarPagina == "CustumerRegistration") { rota = '/Cliente' }

        fetch(`${rota}`, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    alert("Formulário enviado com sucesso!");
                    form.reset(); // Limpa os campos do formulário após o envio bem-sucedido
                    setTimeout(() => {
                        window.location.href = ('/Modular/Reckons')
                    }, 1000)
                } else {
                    throw new Error('Erro ao enviar o formulário');
                }
            })

            .catch(error => {
                console.error('Erro ao enviar o formulário:', error);
                alert("Erro ao enviar o formulário. Por favor, tente novamente.");
            });

    })

}


if (verificarPagina == "Reckons") {

    document.getElementById('planCut').addEventListener('click', () => {
        window.location.href = "/Modular/Reckons/CutPlan"
        // window.location.href = "../views/ReckonsCutPlan.html"
    })
    document.getElementById('orc').addEventListener('click', () => {
        console.log("clicou")
        window.location.href = "/Modular/Projects"
    })

}


if (verificarPagina === "CutPlan") {

    fetch('/../Storage/table.json') // Caminho relativo para o arquivo JSON
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao buscar o arquivo JSON: ' + response.status);
            }
            return response.json();
        })
        .then((data) => {

            // Verifica se os dados são um objeto JSON
            if (typeof data === 'object' && data !== null) {

                // // Itera sobre as propriedades do objeto JSON
                // Object.keys(data).forEach((key) => {
                //     console.log(key + ':', data[key][2]);

                // });
                const QndItens = Object.keys(data)[1]; // Obtém a segunda chave do objeto JSON
                // let contagem = 0;

                // // Verifica se a segunda chave existe no objeto e se seu valor é um array
                // if (QndItens && Array.isArray(data[QndItens])) {
                //     contagem = data[QndItens].length; // Obtém o número de valores associados à segunda chave
                // }
                // console.log(data)

                const chaves = Object.keys(data)
                let N = data[QndItens].length
                let i = 1
                console.log(i)
                let id;
                let x;
                let y;
                let z;

                while (i < N) {

                    chaves.forEach(element => {
                        if (element == "Elemento") {
                            id = data[`${element}`][i]
                        } else if (element == "Comprimento") {
                            x = parseInt(data[`${element}`][i])
                        } else if (element == "Largura") {
                            y = parseInt(data[`${element}`][i])
                        } else if (element == "Espessura") {
                            z = parseInt(data[`${element}`][i])

                            i++
                            // console.log(`ID: ${id}, X: ${x}, Y: ${y}, Z: ${z}`)
                        }
                    });
                    let number = i + 1
                    const section = new Section(id, x, y)
                    console.log(section.indetifySelection());
                    let orienta = "V"
                    section.parameter(10, 3, 2750, 1840, orienta)

                    section.divisionSection(number, x, y)
                    //    section.dashedSection(sentido)

                }




            } else {
                throw new Error('Os dados do arquivo JSON não são do tipo objeto');
            }

        })
}


if (verificarPagina === "RegisterProject") {

    //OBTEM DATA ATUAL FORMATADA
    function DataAtual() {
        let date = new Date()

        let dia = date.getDay();
        let mes = date.getMonth() + 1;
        let ano = date.getFullYear();

        dia = dia < 10 ? '0' + dia : dia;
        mes = mes < 10 ? '0' + mes : mes;

        const dataFormatada = ano + '-' + mes + '-' + dia;
        console.log(dataFormatada)
        return dataFormatada;
    }
    const data_atual = DataAtual()


    body = document.getElementById('main').innerHTML = `
    <div class="container" div="logo"
    style="        
    width: 140px;
    height: 70px;
    display: flex;
    margin-left: 0;
    padding: 0;
           "> <img src="../../public/src/logoBlack.png" alt="" srcset=""></div>
        
           <h1>Novo Projeto</h1><br>
    <form id = "myForm" class="row g-3">

    <div class="col-md-6">
    <label for="vendedor" class="form-label">Vendedor</label>
        <select id="vendedor" class="form-select" name = "vendedor" required>
                <option selected></option>
                </select>
        </div>

        <div class="col-md-3">
        <label for="dataProjeto" class="form-label">Data/Início</label>
        <input type="date" class="form-control" id="dataProjeto" name="dataProjeto" required>
        </div>
       
        <div class="col-md-3">
        <label for="dataFinal" class="form-label">Data/Final</label>
        <input type="date" class="form-control" id="dataFinal" name="dataFinal" value="${data_atual}" required>
        
        </div>
        
        <div class="col-12">
        <label for="cliente" class="form-label">Cliente</label>
        <select id="cliente" class="form-select" name = "cliente" required>
        <option selected></option>
        </select>
        </div>
        
        <div class="col-md-3">
        <label for="projeto" class="form-label">Projeto</label>
        <input type="Text" class="form-control" id="projeto" name="projeto" value="Cozinha" required>
        
        </div>

        <div class="col-12">
        <button id="enviar" type="submit" class="btn btn-primary">Registrar</button>
        </div>
    </form>
`


    //OBTEM O ULTIMO NOME DO PROJETO EXPORTADO
    fetch('/../Storage/table.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao buscar o arquivo JSON: ' + response.status);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
            const arquivo = data[`Projeto`][0]
            const projeto_Atual = document.getElementById('projeto')
            const partes = arquivo.split('\\');
            projeto_Atual.value = partes[partes.length - 1]
            console.log(projeto_Atual.value)

        }
        ).catch((error) => {
            console.error('Erro ao buscar o arquivo JSON:', error);
        });



    //OBTEM NOMES DO BANCO DE DADOS (CLIENTE/VENDEDOR)
    const clientes = document.getElementById('cliente');
    const vendedores = document.getElementById('vendedor');

    fetch('/catchNames')
        .then(response => response.json())
        .then(data => {
            console.log('Dados recebidos:', data);

            // Aqui você pode acessar os dados e fazer o que for necessário com eles
            const listaClientes = data.clientes;
            const listaVendedores = data.vendedores;
            console.log(listaClientes)
            console.log(listaVendedores)

            // Por exemplo, você pode adicionar os nomes dos clientes a um elemento HTML
            listaClientes.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.Nome;
                option.textContent = cliente.Nome;
                clientes.appendChild(option);
            });

            // E você pode fazer o mesmo para os vendedores
            listaVendedores.forEach(vendedor => {
                const option = document.createElement('option');
                option.value = vendedor.Nome;
                option.textContent = vendedor.Nome;
                vendedores.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });



    //REGISTRA UMA NOVA ENTRADA DE ORÇAMENTO COM DADOS (PROJETO/CLENTE/VENDEDOR)
    const form = document.getElementById("myForm")
    form.addEventListener("submit", (e) => {

        e.preventDefault();
        const formData = new FormData(form);

        fetch(`/Projetos`, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    alert("Formulário enviado com sucesso!");
                    form.reset(); // Limpa os campos do formulário após o envio bem-sucedido
                    setTimeout(() => {
                        window.location.href = ('/Modular/Projects')
                    }, 1000)
                } else {
                    throw new Error('Erro ao enviar o formulário');
                }
            })

            .catch(error => {
                console.error('Erro ao enviar o formulário:', error);
                alert("Erro ao enviar o formulário. Por favor, tente novamente.");
            });
    })

}


function Filter(DATA) {
    let content = document.getElementById('content_table')
    content.innerHTML = '';

    const table = document.querySelector('.tbody_');

    if (verificarPagina === "Projects") {

        DATA.forEach(projeto => {
            let row = document.createElement('tr');
            let dataFormatada = new Date(projeto.Data_Projeto).toISOString().split("T")[0]
            row.innerHTML = '<td class="td_">' + projeto.id_Projetos + '</td>' +
                '<td class="td_">' + projeto.Nome_Projeto + '</td>' +
                '<td class="td_">' + projeto.Cliente + '</td>' +
                '<td class="td_">' + dataFormatada + '</td>' +
                '<td class="td_">' + projeto.Vendedor + '</td>' +
                '<td class="td_">' + projeto.Status_Processo + '</td>' +
                '<td class="td_">' +
                `<i class="bi bi-pencil td_crud" id="${projeto.id_relatorio}" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"></i>` +
                `<i class="bi bi-box-arrow-down td_crud" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar"></i>` +
                '</td>';
            table.appendChild(row);
        })
    }
    if (verificarPagina === "BudgetProcessed") {
        console.log('estou aqui')
        DATA.forEach(projeto => {
            let row = document.createElement('tr');
            let dataFormatada = new Date(projeto.Data_Projeto).toISOString().split("T")[0]
            row.innerHTML = '<td class="td_">' + projeto.id_Projetos + '</td>' +
                '<td class="td_">' + projeto.Nome_Projeto + '</td>' +
                '<td class="td_">' + projeto.Cliente + '</td>' +
                '<td class="td_">' + dataFormatada + '</td>' +
                '<td class="td_">' + projeto.Vendedor + '</td>' +
                '<td class="td_">' + projeto.Status_Processo + '</td>'

            table.appendChild(row);
        })
    }





}

function budgetEdit(DATA) {
    let htmlContent;
    const editProcessButtons = document.querySelectorAll('.bi-pencil');
    editProcessButtons.forEach(button => {
        button.addEventListener('click', (e) => {




            const ID = e.target.id;
            const projeto = DATA.find(projeto => projeto.id_Projetos == ID);
            if (projeto) {

                // const nome = projeto.Cliente;
                // console.log(nome);


                fetch('/tableClientes')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        let cpf;


                        const cliente = data.find(item => item.Nome === projeto.Cliente);
                        if (cliente) {
                            cpf = cliente.CPF;
                            // console.log(cpf)
                        } else {
                            console.log('Cliente não encontrado para o nome', projeto.Cliente);
                        }



                        // Lógica para definir htmlContent com base nos dados recebidos
                        htmlContent = ` <div style="word-spacing: 10px;">
                            <h1 id="projetoName" class="border-bottom">${projeto.Nome_Projeto}</h1><br>
                            <div><b>CLIENTE:</b> <input id="clienteName" type="text" value="${projeto.Cliente}" 
                            class="border border-0" readonly style= "text-transform: uppercase;"></div>
                            
                            <div><b>CPF:  </b><input type="text" value="${cpf}" class="border border-0" readonly></div>
                        
                            <div><b>NºPROJETO:  </b> <input type="text" value="${ID}" class="border border-0" readonly></div>
                            <br>
                            </div>
                            <div style="width:200px";>
                            <label for="status" class="form-label">Status</label>
                            <select id="status" class="form-select" name = "status" required>
                            <option selected>Aberto</option>
                            <option id="cancel" >Cancelar</option>
                            <option id="sell">Concluir</option>
                            </select></div>
                            <br><br>
                            `;
                        localStorage.setItem('htmlContent', htmlContent);
                        localStorage.setItem('ID', ID);


                        if (htmlContent) {
                            window.location.href = (`/Modular/Budget-Guide/${ID}`)
                        }

                    })
                    .catch(error => {
                        console.log('Erro ao carregar os dados', error);
                    });

            }
        });
    });
}

function generatePDF() {
    const pdfButtons = document.querySelectorAll('.bi-box-arrow-down');

    pdfButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.open('/Modular/Budget', '_blank');
        })
    })
}



if (verificarPagina === "Projects") {

    // console.log("estou aqui")
    document.addEventListener('DOMContentLoaded', function () {
        const table = document.querySelector('.tbody_');


        fetch('/tableProjetos')
            .then(response => response.json())
            .then(data => {
                console.log('Lista de projetos acessada');
                console.log(data);
                const projetos = data;

                projetos.forEach(projeto => {
                    let row = document.createElement('tr');
                    let dataFormatada = new Date(projeto.Data_Projeto).toISOString().split("T")[0]
                    row.innerHTML =
                        '<td class="td_">' + projeto.id_Projetos + '</td>' +
                        '<td class="td_">' + projeto.Nome_Projeto + '</td>' +
                        '<td class="td_">' + projeto.Cliente + '</td>' +
                        '<td class="td_">' + dataFormatada + '</td>' +
                        '<td class="td_">' + projeto.Vendedor + '</td>' +
                        '<td class="td_">' + projeto.Status_Processo + '</td>' +
                        '<td class="td_">' +
                        `<i class="bi bi-pencil td_crud" id="${projeto.id_Projetos}" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"></i>` +
                        `<i class="bi bi-box-arrow-down td_crud" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar"></i>` +
                        '</td>';

                    table.appendChild(row);




                });

                generatePDF()
                budgetEdit(projetos)



            })
            .catch(error => {
                console.error('Erro ao obter dados:', error);
            });

    })


    let filtro = document.getElementById('Filter')
    document.getElementById('filtrar').addEventListener('click', () => {
        let selectedOption = filtro.value
        console.log(selectedOption)


        let filtrado;
        fetch('/filterTable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filter: selectedOption })
        })
            .then(response => {
                if (response.ok) {
                    try {

                        console.log('estou aqui')
                        filtrar()

                    } catch (error) {
                        console.log('Erro ao carregar os dados', error);
                    }
                } else {
                    throw new Error('Erro ao receber a tabela');
                }
            });

        function filtrar() {
            fetch('/ShowTable')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na solicitação: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Dados recebidos:', data);
                    Filter(data); // Processar ou exibir os dados filtrados
                    budgetEdit(data)
                    console.log('Tabela atualizada');
                })
                .catch(error => {
                    console.log('Erro ao carregar os dados', error);
                });
        }
    })
    let menuHeader = false
    document.getElementById('register').addEventListener('click', () => {
        let menu = document.getElementById('head')
        if (menuHeader == false) {
            menu.classList.add('transition-Start-head');
            menuHeader = true
        } else {
            menu.classList.remove('transition-Start-head');

            menuHeader = false
        }
    })


}


const storedID = localStorage.getItem('ID');
let STATUS = ""


if (verificarPagina == storedID) {
    // console.log('estou aqui')
    const storedHtmlContent = localStorage.getItem('htmlContent');

    const guide = document.getElementById('Guide')
    const part = document.createElement('div')
    part.innerHTML = storedHtmlContent
    part.style.wordSpacing = "10px"
    guide.appendChild(part);

    const status = document.getElementById('status');


    //PERSONALIZA UM ALERTE PARA DECISÃO DE CANCELAR UM ORÇAMENTO

    function AlertPersonalized() {
        Swal.fire({
            title: 'Tem certeza que deseja cancelar?',
            showDenyButton: true,
            confirmButtonText: `Sim`,
            denyButtonText: `Não`
        }).then((result) => {

            if (result.isConfirmed) {
                STATUS = "cancelado"

                fetch('/orderStatusChanged', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: storedID, status: STATUS })
                })
                    .then(response => {
                        if (response.ok) {
                            console.log(storedID)
                            alert("Ordem cancelada com sucesso");
                            window.close();
                        } else {
                            throw new Error('Erro ao enviar o formulário');
                        }
                    })



                    .catch(error => {
                        console.error('Erro ao enviar o formulário:', error);
                        alert("Erro ao enviar o formulário. Por favor, tente novamente.");
                    });


            } else if (result.isDenied) {

            }
        });
    }

    //FUNÇÃO PARA SALVAR AS INFORMAÇÕES DO ORÇAMENTO EM JSON

    function salvar(payment, value, condition) {
        let projeto = document.getElementById('projetoName').textContent
        let cliente = document.getElementById('clienteName').value
        localStorage.setItem('NomeCliente', cliente)
        localStorage.setItem('NomeProjeto', projeto)
        let formaPagamento = payment
        let valor = value
        let condicao = condition

        const objeto = {
            projeto: `${projeto}`,
            cliente: `${cliente}`,
            formaPagamento: `${formaPagamento}`,
            valor: `${valor}`,
            condição: `${condicao}`
        }

        const jsonString = JSON.stringify(objeto);

        fetch('/saveBudget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonString
        })
            .then(response => {
                if (!response.ok) {
                    alert("Erro ao enviar os dados")
                    throw new Error('Erro ao enviar a solicitação.');

                } else {
                    console.log('Objeto JavaScript foi gravado como JSON com sucesso.');
                    alert("Dados salvo com sucesso")
                    setTimeout(() => { window.close() }, 1000)
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });

    }





    //VERIFICA A SELEÇÃO DE STATUS DO ORÇAMENTO

    status.addEventListener('change', function (e) {
        const selectedOption = e.target.value;

        if (selectedOption === 'Cancelar') {
            AlertPersonalized()

        } else if (selectedOption === 'Concluir') {

            const pay = document.createElement('div')
            let formPay = true
            pay.innerHTML = `<a href="#" id="add_pay" id="payment">Adicionar uma forma de pagamento</a>`
            guide.appendChild(pay)

            let pagamentoAdicionado = false
            let formPagamentoAdicionado = false

            if (formPay) {
                document.getElementById('add_pay').addEventListener('click', () => {

                    //CRIA A ESTRUTURA DE FORMAS DE PAGAMENTO E EXIBE NA TELA

                    if (!pagamentoAdicionado) {


                        const payment = document.createElement('div')
                        payment.style.marginTop = "50px";
                        payment.innerHTML = `
                                                        <label for="payment" class="form-label">Forma de pagamento</label>
                                                        <select id="type_pay" class="form-select" name = "payment" required>
                                                        <option selected></option>
                                                        <option value ="Dinheiro">Dinheiro</option>
                                                        <option value ="Debito">Cartão de Débito</option>
                                                        <option value ="Credito">Cartão de Crédito</option>
                                                        <option value ="PIX">PIX</option>
                                                        </select></div>
                                                        `

                        pay.appendChild(payment)

                        pagamentoAdicionado = true
                    }



                    let descontoCriado = false
                    let parcelasCriadas = false
                    let pixCriado = false
                    let saveCriado = false


                    // INDENTIFICA A FORMA DE PAGAMENTO E SALVA O ORÇAMENTO    

                    if (pagamentoAdicionado && !formPagamentoAdicionado) {
                        document.getElementById('type_pay').addEventListener('change', (e) => {

                            if (!saveCriado) {
                                let save = document.createElement('button')
                                save.type = "button";
                                save.textContent = "Salvar";
                                save.id = "salvar"
                                save.style.marginTop = "20px"
                                save.style.width = "80px"
                                pay.appendChild(save)
                                saveCriado = true
                            }

                            let type_payment = e.target.value;
                            console.log(type_payment)


                            if (type_payment == "Dinheiro" || type_payment == "Debito") {

                                if (parcelasCriadas) {
                                    document.getElementById('parcelamento').remove()
                                    parcelasCriadas = false
                                }
                                if (pixCriado) {
                                    document.getElementById('pix').remove()
                                    pixCriado = false
                                }

                                if (!descontoCriado) {
                                    let a = document.createElement('div')
                                    a.style.display = "flex"
                                    a.style.justifyContent = "space-between"
                                    a.id = "pagamento"

                                    pay.insertBefore(a, pay.lastChild)


                                    let b = document.createElement('div')
                                    a.appendChild(b)

                                    let label = document.createElement('label')
                                    label.textContent = "Desconto (%)"
                                    label.style.marginRight = "10px"

                                    let desconto = document.createElement('input')

                                    desconto.id = "desconto"
                                    desconto.style.marginTop = "20px"
                                    desconto.style.width = "50px"


                                    b.appendChild(label)
                                    b.appendChild(desconto)

                                    let c = document.createElement('div')
                                    c.style.display = "flex"
                                    c.style.flexDirection = "column"
                                    c.style.alignItems = "flex-end"

                                    let v = 20000
                                    let d = 0

                                    let valorProjeto = document.createElement('div')
                                    valorProjeto.innerHTML = `<span style= "color:grey;">Valor do Projeto:  </span> R$${v} <br>`
                                    valorProjeto.style.marginTop = "20%"

                                    let valorProjetoDesconto = document.createElement('div')
                                    valorProjetoDesconto.style.marginTop = "5%"
                                    valorProjetoDesconto.style.display = "none"



                                    a.appendChild(c)
                                    c.appendChild(valorProjeto)
                                    c.appendChild(valorProjetoDesconto)


                                    let condition = "Á vista (s/ desconto)"
                                    let value;

                                    if (valorProjeto) {
                                        document.getElementById('desconto').addEventListener('change', (e) => {
                                            let descontoAplicado = e.target.value
                                            console.log(descontoAplicado)
                                            d = v - ((descontoAplicado / 100) * v)
                                            valorProjetoDesconto.innerHTML = `<span style= "color:grey;">Valor com Desconto:</span> R$${d} <br>`
                                            valorProjetoDesconto.style.display = "initial"
                                            value = d
                                            condition = "Á vista " + `(${descontoAplicado}% off)`
                                        })
                                    }

                                    if (d == 0) {
                                        value = v
                                    } else {
                                        value = d
                                    }

                                    document.getElementById('salvar').addEventListener('click', () => {
                                        salvar(type_payment, value, condition)
                                    })

                                    descontoCriado = true
                                }


                            } else if (type_payment == "Credito") {

                                if (descontoCriado) {
                                    document.getElementById('pagamento').remove()
                                    descontoCriado = false
                                }
                                let v = 20000
                                let value = v
                                let condition;



                                if (!parcelasCriadas) {

                                    let a = document.createElement('div')
                                    a.style.display = "flex"
                                    a.style.justifyContent = "space-between"
                                    a.style.height = "50px"
                                    a.style.alignItems = "end"
                                    a.id = "parcelamento"


                                    let b = document.createElement('select')
                                    b.id = "parcelas"
                                    b.style.width = "150px"
                                    b.style.marginTop = "20px"

                                    pay.insertBefore(a, pay.lastChild)
                                    a.appendChild(b)




                                    function formatarNumero(numero) {
                                        var partes = numero.toFixed(2).split('.');
                                        partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                                        return partes.join(',');
                                    }

                                    for (let i = 1; i <= 12; i++) {
                                        let option = document.createElement('option');
                                        option.id = "parcela" + i
                                        let parcela = (v / i)
                                        var formattedNumber = formatarNumero(parcela)
                                        option.textContent = i + "x R$" + formattedNumber
                                        console.log(formattedNumber)
                                        b.appendChild(option);

                                    }

                                    let valorProjeto = document.createElement('div')
                                    valorProjeto.innerHTML = `<span style= "color:grey;">Valor do Projeto:  </span> R$${v} <br>`
                                    valorProjeto.style.marginTop = "20%"

                                    a.appendChild(valorProjeto)


                                    let optionSelected = false
                                    document.getElementById('parcelas').addEventListener('change', (e) => {
                                        console.log('estou aqui')
                                        condition = e.target.value;
                                        console.log(condition)
                                        optionSelected = true
                                    })



                                    document.getElementById('salvar').addEventListener('click', () => {

                                        if (!optionSelected) {
                                            condition = document.getElementById('parcela1').textContent
                                            console.log(condition)
                                            salvar(type_payment, value, condition)
                                        } else {
                                            salvar(type_payment, value, condition)

                                        }
                                    })
                                    parcelasCriadas = true
                                }

                            } else if (type_payment == "PIX") {

                                if (parcelasCriadas) {
                                    console.log("removido aqui")
                                    document.getElementById('parcelamento').remove();
                                    parcelasCriadas = false
                                }

                                if (descontoCriado) {
                                    document.getElementById('pagamento').remove()
                                    descontoCriado = false
                                }



                            }
                        })
                        formPagamentoAdicionado = true
                    }
                })


            }
        }
    })
}




if (verificarPagina == "BudgetProcessed") {

    document.addEventListener('DOMContentLoaded', function () {
        const table = document.querySelector('.tbody_');

        fetch('/budgetProcessed')
            .then(response => response.json())
            .then(data => {
                console.log('Lista de projetos acessada');

                const projetos = data;

                projetos.forEach(projeto => {
                    let row = document.createElement('tr');
                    let dataFormatada = new Date(projeto.Data_Projeto).toISOString().split("T")[0]
                    row.innerHTML =
                        '<td class="td_">' + projeto.id_Projetos + '</td>' +
                        '<td class="td_">' + projeto.Nome_Projeto + '</td>' +
                        '<td class="td_">' + projeto.Cliente + '</td>' +
                        '<td class="td_">' + dataFormatada + '</td>' +
                        '<td class="td_">' + projeto.Vendedor + '</td>' +
                        '<td class="td_">' + projeto.Status_Processo + '</td>'

                    table.appendChild(row);

                });

                document.getElementById('filtrar').addEventListener('click', () => {

                    let filtro_Ordem = document.getElementById('Filter')
                    let selectedOption = filtro_Ordem.value
                    if (selectedOption != "id_Projetos"){

                    console.log(selectedOption)

                        console.log("aqui")


                        fetch('/filterTable', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ filter: selectedOption })
                        })
                            .then(response => {
                                if (response.ok) {
                                    try {

                                        console.log('estou aqui')
                                        filtrar()

                                    } catch (error) {
                                        console.log('Erro ao carregar os dados', error);
                                    }
                                } else {
                                    throw new Error('Erro ao receber a tabela');
                                }
                    
                            });

                        function filtrar() {
                            fetch('/ShowTableProcessed')
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Erro na solicitação: ' + response.status);
                                    }
                                    return response.json();
                                })
                                .then(data => {
                                    console.log('Dados recebidos:', data);
                                    Filter(data); // Processar ou exibir os dados filtrados
                                    console.log('Tabela atualizada');
                                })
                                .catch(error => {
                                    console.log('Erro ao carregar os dados', error);
                                });
                        }


                    }else{

                        let filtro_Nome = document.getElementById('pesquisa')
                        let nameSearch = filtro_Nome.value
                        if (nameSearch) {

                            console.log(nameSearch)

                            fetch('/filterTable', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ filter: nameSearch })
                            })
                                .then(response => {
                                    if (response.ok) {
                                        try {

                                            console.log('estou aqui')
                                            filtrarPorNome()

                                        } catch (error) {
                                            console.log('Erro ao carregar os dados', error);
                                        }
                                    } else {
                                        throw new Error('Erro ao receber a tabela');
                                    }
                                });

                            function filtrarPorNome() {
                                fetch('/nameSearch')
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error('Erro na solicitação: ' + response.status);
                                        }
                                        return response.json();
                                    })
                                    .then(data => {
                                        console.log('Dados recebidos:', data);
                                        Filter(data); // Processar ou exibir os dados filtrados
                                        console.log('Tabela atualizada');
                                    })
                                    .catch(error => {
                                        console.log('Erro ao carregar os dados', error);
                                    });
                            }
                        }
                    }


                })


            })
    })


}



