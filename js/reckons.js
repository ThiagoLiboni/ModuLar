const verificarPagina = window.location.pathname.split("/").pop();

import { Section } from './objectCut.js';



console.log(verificarPagina)

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
                option.value = cliente;
                option.textContent = cliente;
                clientes.appendChild(option);
            });

            // E você pode fazer o mesmo para os vendedores
            listaVendedores.forEach(vendedor => {
                const option = document.createElement('option');
                option.value = vendedor;
                option.textContent = vendedor;
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

let htmlContent;
let idCurrent;

if (verificarPagina === "Projects") {
    let processAccessed = false;
    console.log("estou aqui")
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
                    row.innerHTML =
                        '<td class="td_">' + projeto.id_relatorio + '</td>' +
                        '<td class="td_">' + projeto.Projeto + '</td>' +
                        '<td class="td_">' + projeto.Cliente + '</td>' +
                        '<td class="td_">' + projeto.Data_Projeto + '</td>' +
                        '<td class="td_">' + projeto.Vendedor + '</td>' +
                        '<td class="td_">' + projeto.Status_process + '</td>' +
                        '<td class="td_">' +
                        `<i class="bi bi-pencil td_crud" id="${projeto.id_relatorio}" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"></i>` +
                        `<i class="bi bi-box-arrow-down td_crud" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizar"></i>` +
                        '</td>';
                    table.appendChild(row);
                });

                const editProcessButtons = document.querySelectorAll('.bi-pencil');
                editProcessButtons.forEach(button => {
                    button.addEventListener('click', (e) => {

                        const ID = e.target.id;
                        const projeto = projetos.find(projeto => projeto.id_relatorio == ID);
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
                                        console.log(cpf)
                                    } else {
                                        console.log('Cliente não encontrado para o nome', projeto.Cliente);
                                    }



                                    // Lógica para definir htmlContent com base nos dados recebidos
                                    htmlContent = ` <div style="word-spacing: 10px;">
                                                        <h1 class="border-bottom">${projeto.Projeto}</h1><br>
                                                        <div><b>CLIENTE:</b> <input type="text" value="${projeto.Cliente}" 
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
                                        window.open(`Budget-Guide/${ID}`, '_blank', 'width=600,height=400')
                                    }

                                })
                                .catch(error => {
                                    console.log('Erro ao carregar os dados', error);
                                });

                        }

                    });
                });
            })
            .catch(error => {
                console.error('Erro ao obter dados:', error);
            });

    });

}

;

const storedID = localStorage.getItem('ID');

if (verificarPagina == storedID) {
    console.log('estou aqui')
    const storedHtmlContent = localStorage.getItem('htmlContent');

    const guide = document.getElementById('Guide')
    const part = document.createElement('div')
    part.innerHTML = storedHtmlContent
    part.style.wordSpacing = "10px"
    guide.appendChild(part);

    const status = document.getElementById('status');

    function AlertPersonalized() {
        Swal.fire({
            title: 'Tem certeza que deseja cancelar?',
            showDenyButton: true,
            confirmButtonText: `Sim`,
            denyButtonText: `Não`
        }).then((result) => {

            if (result.isConfirmed) {

                fetch('/canceledOrder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain' 
                    },
                    body: storedID
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

    status.addEventListener('change', function (e) {
        const selectedOption = e.target.value;

        if (selectedOption === 'Cancelar') {
            AlertPersonalized()

        } else if (selectedOption === 'Concluir') {
            // console.log('Ola,Mundo')
            const pay = document.createElement('div')
            pay.innerHTML = `<a href="#" id="payment">Adicionar uma forma de pagamento</a>`
            guide.appendChild(pay)
        }
    });
};



