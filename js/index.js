import { sendToRuby } from "./middle.js";
import { sendToRubyTex } from "./middle.js";
import { GetID } from "./storage.js";

const verificarPagina = window.location.pathname.split("/").pop();

const botaoComp = document.querySelector("#buttonComp");
const lista = document.getElementById("lista");
const Item1 = document.getElementById("item1");
const Item2 = document.getElementById("item2");

let a = 0;
botaoComp.addEventListener("mouseenter", function () {
  lista.classList.add("transition-Start-4");
  lista.style.display = "flex";
});

lista.addEventListener("mouseenter", function () {
  lista.style.display = "flex";
});
lista.addEventListener("mouseleave", function () {
  setTimeout(() => {
    lista.style.display = "none";
    a = 0;
  }, 1000);
});

document.addEventListener("click", function (event) {
  if (!lista.contains(event.target) && lista.style.display === "flex") {
    lista.style.display = "none";
  }
});

Item1.addEventListener("click", function () {
  window.location.href = "/component/DRYComponent";
});

Item2.addEventListener("click", function () {
  window.location.href = "/component/WETComponent";
});

const botaoHome = document.getElementById("buttonHome");

botaoHome.addEventListener("click", function () {
  window.location.href = "/Home";
});

const botaoMaterials = document.getElementById("buttonMaterials");

botaoMaterials.addEventListener("click", function () {
  window.location.href = "/Materials";
});

let iconBar = null;

window.addEventListener("resize", statusBar);

function statusBar() {
  if (window.innerWidth > 483 && iconBar != null) {
    let A = document.querySelector(".iconActiveMenu");
    if (A) {
      A.classList.replace("iconActiveMenu", "menu");
    }
    let B = document.querySelector(".iconActiveBoxMenu");
    if (B) {
      B.classList.replace("iconActiveBoxMenu", "boxMenu");
    }
    let C = document.querySelector(".iconActiveMenuDiv");
    if (C) {
      C.classList.replace("iconActiveMenuDiv", "content");
    }
    let D = document.querySelector(".iconActiveCompList");
    if (D) {
      D.classList.replace("iconActiveCompList", "Hidden");
    }
    let F = document.querySelector(".alt_Home");
    if (F) {
      F.classList.replace("alt_Home", "Home");
    }
    let G = document.querySelector(".alt_Comp");
    if (G) {
      G.classList.replace("alt_Comp", "Comp");
    }
    let H = document.querySelector(".alt_Materials");
    if (H) {
      H.classList.replace("alt_Materials", "Materiais");
    }
    let I = document.querySelector(".alt_spt1");
    if (I) {
      I.classList.replace("alt_spt1", "spt-1");
    }
    let M = document.querySelector(".alt_spt2");
    if (M) {
      M.classList.replace("alt_spt2", "spt-2");
    }
    let J = document.querySelector(".alt-Item1");
    if (J) {
      J.classList.replace("alt-Item1", "Item1");
    }
    let K = document.querySelector(".alt-Item2");
    if (K) {
      K.classList.replace("alt-Item2", "Item2");
    }

    document.querySelector(".boxMenu").style.display = "flex";
    document.querySelector(".menu").style.display = "flex";

    validar = 0;
    console.log(validar);
  } else if (window.innerWidth < 483 && iconBar != null) {
    let A = document.querySelector(".boxMenu");
    if (A) {
      A.style.display = "none";
    }
  }
}

let validar = 0;

document.querySelector(".IconMenu").addEventListener("click", () => {
  iconBar = "Actived";
  if (validar == 0) {
    let A = document.querySelector(".menu");
    if (A) {
      A.classList.replace("menu", "iconActiveMenu");
    }
    let B = document.querySelector(".boxMenu");
    B.classList.replace("boxMenu", "iconActiveBoxMenu");
    let C = document.querySelector(".content");
    C.classList.replace("content", "iconActiveMenuDiv");
    let E = document.querySelector(".Hidden");
    E.classList.replace("Hidden", "iconActiveCompList");
    let F = document.querySelector(".Home");
    F.classList.replace("Home", "alt_Home");
    let G = document.querySelector(".Comp");
    G.classList.replace("Comp", "alt_Comp");
    let H = document.querySelector(".Materiais");
    H.classList.replace("Materiais", "alt_Materials");
    let I = document.querySelector(".spt-1");
    I.classList.replace("spt-1", "alt_spt1");
    let M = document.querySelector(".spt-2");
    M.classList.replace("spt-2", "alt_spt2");
    let J = document.querySelector(".Item1");
    J.classList.replace("Item1", "alt-Item1");
    let K = document.querySelector(".Item2");
    if (A) {
      K.classList.replace("Item2", "alt-Item2");
    }

    B.style.display = "flex";
    A.style.display = "flex";
    A.classList.add("transition-Start-4");

    console.log(iconBar);

    validar = 1;
    console.log(validar);
  } else if (validar != 0) {
    let A = document.querySelector(".iconActiveMenu");
    let B = document.querySelector(".iconActiveBoxMenu");

    B.style.display = "flex";
    A.style.display = "flex";
    validar = 2;
    console.log(iconBar);
  }
});

document.addEventListener("click", (event) => {
  if (validar == 1 || validar == 2) {
    console.log(iconBar);

    let B = document.querySelector(".iconActiveMenu");
    let A = document.querySelector(".IconMenu svg");
    let C = document.querySelector(".iconActiveCompList");

    if (
      !B.contains(event.target) &&
      B.style.display == "flex" &&
      !A.contains(event.target)
    ) {
      B.style.display = "none";
      C.style.display = "none";
      validar = 3;
      console.log(validar);
      console.log(iconBar);
    }
  }
});

if (verificarPagina == "Materials") {
  document.getElementById("MDFLibrary").addEventListener("click", () => {
    window.location.href = "/Materials/MDF";
  });
}
if (verificarPagina == "MDF") {
  let A = document.querySelector(".texLibrary");
  let B = document.querySelector("#registerTex");
  let C = document.querySelector("#MDFList");
  A.style.display = "none";
  B.style.display = "flex";
  C.style.display = "flex";
}

if (verificarPagina === "Home") {
  let slideIndex = 0;
  showSlides();

  function showSlides() {
    //Animação slide de imagens
    let slides = document.getElementsByClassName("slide");

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.opacity = 0;
    }

    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    slides[slideIndex - 1].style.opacity = 1;

    setTimeout(showSlides, 3000); // Muda a imagem a cada 2 segundos
  }
}

//--------------------------

const ListaComp = document.querySelector(".componentList");
const info_Comp = document.querySelector("#infoComponent");
const componenteData = [];

function Registrar(Nome, Descrição, Url, img, ID) {
  //Cadastrar novo item

  const projeto = document.createElement("div");

  projeto.className = `Modulo_${ID}`;
  projeto.id = `Componente${ID}`;

  projeto.innerHTML = ` <img src="${img}"id="icon" name="logo">
                                    <input type="checkbox" name="checkbox" style= "display: none" id="validar${ID}">
                                   <div class="Novo_infoComponent${ID}">
                                   <div id="Novo_Component${ID}">${Nome}</div>
                                   <div id="Novo_info-box">${Descrição}</div>
                                   <div id="Componente${ID}URL">${Url}</div>
                                   </div> 
                                   `;
  let NewStyle = document.createElement("Style");

  NewStyle.textContent = ` #Componente${ID} {
    
                                   position:relative;
                                   align-items: baseline;
                                   width: calc(80vw - 15px);
                                   height: auto;
                                   background-color: rgba(13, 14, 13, 0.788);
                                   border: unset;
                              
                                   margin-bottom: 20px;
                                   left: 10px;
                                   margin-top: 30px;
                                   display: flex;
                                   max-width: 400px;
                              
                                   
                              }
                               #Componente${ID}:hover, #Componente${ID}.selected  {
                                   border: 1px solid blue;
                               }


                              .Modulo_${ID} #validar${ID}{
                                   position: absolute;
                                   left: -30px;
                                   width: 20px;
                                   height: 20px;
                                   top: calc(40%);
                                   

                               }
                              
                              .Modulo_${ID} img{
                                   position: relative;
                                   width: 140px;
                                   height: 140px;
                                   align-self: center;
                                   border: 1px solid rgba(0, 0, 0, 0.356);
                              
                                   }
                              
                              .Modulo_${ID} .Novo_infoComponent${ID} {
                                   border: 1px solid rgba(255, 255, 255, 0.288);
                                   border-radius: 4px;
                                   color: white;
                                   width: 300px;
                                   height: 140px;
                                   flex-direction: column;
                                   display: flex;
                                   background-color: unset;
                                   
                                   
                              }
                              
                              .Modulo_${ID} .Novo_infoComponent${ID} #Novo_Component${ID} { 
                                   font-weight: bold; 
                                   font-size: 16px;
                                   margin-top: 5px;
                                   margin-left: 5px;
                                   margin-right: 5px;
                                   background-color: unset;
                                   font-size: 20px;
                                   border-bottom: 1px solid rgba(255, 255, 255, 0.288);
                                   font-family: 'Arial';
                                   text-align: center;
                              }
                              
                              .Modulo_${ID} .Novo_infoComponent${ID} #Novo_info-box{
                                   display: initial;
                                   text-align: justify;
                                   margin-left: 10px;
                                   margin-right: 10px;
                                   margin-bottom: 30px;
                                   margin-top: 5px;
                                   
                                   }

                              .Modulo_${ID} #Componente${ID}URL{
                                   display: none;
                              }
                `;
  document.head.appendChild(NewStyle);
  ListaComp.appendChild(projeto);

  componenteData.push({
    Nome: Nome,
    Descrição: Descrição,
    Url: Url,
    img: img,
    id: ID,
  });
}

const arraycomp = [];
let Newcomponente = null;

if (
  (verificarPagina === "DRYComponent") |
  (verificarPagina === "WETComponent")
) {
  document.getElementById("newComponent").addEventListener("click", addNew);
}

function addNew() {
  //Enviar dados para Registrar

  let novoNome = document.querySelector("#name_project").value;
  let novoDescricao = document.querySelector("#Description").value;
  let novoUrl = document.querySelector("#project_URL").value;
  let novoimg = document.querySelector("#img_URL").value;
  let novoid = document.querySelector("#project_ID").value;

  Registrar(novoNome, novoDescricao, novoUrl, novoimg, novoid);
  arraycomp.push({ novoid });

  console.log(arraycomp);
  console.log(novoNome, novoDescricao, novoUrl, novoimg, novoid);

  if (arraycomp.length >= 0) {
    Newcomponente = document.querySelector(`#Componente${novoid}`);
    //ShowID(Newcomponente);
    console.log("componente add");
  }

  notificarObservadores();
}

//adiconar um observador para atualizar Array(componenteData)
const observadores = [];

function adicionarObservador(observador) {
  observadores.push(observador);
}

function notificarObservadores() {
  for (const observador of observadores) {
    observador();
  }
}

export { componenteData, addNew, adicionarObservador };

//------------------------------------------------------------

if (
  (verificarPagina === "DRYComponent") |
  (verificarPagina === "WETComponent")
) {
  document.getElementById("RemoveComponent").addEventListener("click", Remover);
  document.getElementById("deletar").addEventListener("click", Excluir);
  document.getElementById("Save").addEventListener("click", SaveData);
}

/*function ShowID(event){

          
     let ID =  event.id;
     
     console.log (ID);
     }*/

function select(element) {
  //Seleciona o item a ser utilizado.

  console.log(`Componente ${element} selecionado !`);
  //console.log(arraycomp.length);
  let nameElement = document.getElementById(`Novo_Component${element}`);
  let name_Element = nameElement.textContent;
  //console.log(name_Element);
  let Element = document.getElementById(`Componente${element}`);
  let elementID = Element.id;

  Element.classList.add("selected");

  //console.log(Class)
  /// console.log(elementID);

  document.addEventListener("click", function (event) {
    if (
      !Element.contains(event.target) &&
      Element.classList.contains("selected")
    ) {
      Element.classList.remove("selected");
    }
  });

  GetID(elementID, name_Element);
}

function selectTexture(element,url){
     
  console.log(`Textura ${element} selecionado !`);
  //console.log(arraycomp.length);
//   let nameElement = document.getElementById(`ID${element}`);
//   let name_Element = nameElement.textContent;
  //console.log(name_Element);
  let Element = document.getElementById(`${element}`);
  

  Element.classList.add("Tex-Selected");

  //console.log(Class)
  /// console.log(elementID);

  document.addEventListener("click", function (event) {
    if (
      !Element.contains(event.target) &&
      Element.classList.contains(`Tex-Selected`)
    ) {
      Element.classList.remove("Tex-Selected");
    }
  });
  
  sendToRubyTex(url, element);

}

function Remover() {
  //Habilitar a seleção dos itens a serem excluídos.
  const boxes = document.querySelectorAll('input[Type="checkbox"]');
  const input = document.querySelector("#deletar");

  if (input.style.display === "none") {
    input.style.display = "initial";
  } else {
    input.style.display = "none";
  }

  boxes.forEach(function (check) {
    if (check.style.display === "none") {
      check.style.display = "initial";
    } else {
      check.style.display = "none";
    }
  });
  //console.log(boxes)
}

function Excluir() {
  // Remove componente da lista. (Para êxito, salvar lista posteriormente)
  const boxes = document.querySelectorAll('input[Type="checkbox"]:checked');

  boxes.forEach(function (box) {
    let elemento = box.parentElement;
    elemento.remove();
  });
}

function SaveData() {
  // salvar componentes registrado em JSON

  fetch("/savedData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Data: componenteData }),
  })
    .then((response) => response.text())
    .then((message) => {
      alert(message);
    })
    .catch((error) => {
      console.log("Erro ao salvar os dados:", error);
    });
}

if (
  (verificarPagina === "DRYComponent") |
  (verificarPagina === "WETComponent") |
  (verificarPagina === "MDF")
  ) {
       window.onload = Restorge;
       //console.log(componenteData)
       console.log("Componentes carregados com sucesso!!");
     }

     
     //aplicações para texturas dos componentes
     if (verificarPagina == "MDF") {
     //adiciona uma nova textura a lista
     document.querySelector("#Apply").addEventListener("click", () => {
    let Nome = document.querySelector("#IMGname").value;
    let Categoria = document.querySelector("#IMGclass").value;
    console.log(Nome, Categoria);
    
    New_texture_Mdf(Nome, Categoria);
    
}) 
//salva a lista atual
  document.querySelector("#saveTex").addEventListener("click", () => {
    fetch("/SaveTex", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Data: DataTex }),
    })
      .then((response) => response.text())
      .then((message) => {
        alert(message);
      })
      .catch((error) => {
           console.log("Erro ao salvar os dados:", error);
          });
     });
}
let urlChoosed = '';
let user = localStorage.getItem("userID");
console.log(user)


//Autenticação para cadastro de textura padrão
if(verificarPagina==='MDF' && user==="SyzDcAldfteL9vclQWyN5Zcnx2i1"){
let box = document.querySelector('#Personal[Type="checkbox"]');
let method2 = document.querySelector("#fileInput");
let method = document.querySelector("#IMGclass");

let checkboxStatus;

box.addEventListener('change', function() {
     // Atualize a variável checkboxStatus com o status da caixa de seleção
     checkboxStatus = this.checked;
     console.log('Status da caixa de seleção:', checkboxStatus); // Exibe o status atual


     
     if (checkboxStatus) {
          console.log('marcado')
          method.style.display = "none";
          method2.style.display = "initial";
          
          
          let fileInput = method2
        fileInput.click();

         fileInput.addEventListener("change", function () {
           const selectedFile = fileInput.files[0];
             if (selectedFile) {
                  const fileUrl = URL.createObjectURL(selectedFile);
                  urlChoosed = fileUrl;
               }
          });
          
     } else {
          console.log('desmarcado')
          method.style.display = "initial";
          method2.style.display = "none";
     }
})
}else if(verificarPagina==='MDF'){
     let box = document.querySelector('#Personal[Type="checkbox"]');
     let method2 = document.querySelector("#fileInput");
     let method = document.querySelector("#IMGclass");
     
     
               box.style.display = "none"
               method.style.display = "none";
               method2.style.display = "initial";
               
               
               let fileInput = method2
               fileInput.click();
     
              fileInput.addEventListener("change", function () {
                const selectedFile = fileInput.files[0];
                  if (selectedFile) {
                       const fileUrl = URL.createObjectURL(selectedFile);
                       urlChoosed = fileUrl;
                    }
               });
     }

const DataTex = [];
//Cria um novo elemento para a lista 
function New_texture_Mdf(nome, categoria) {
     const newImg = document.createElement("li");
     newImg.id = `${nome}`
     let ID = `${nome}`
     const newImage = document.createElement("img");
     
     let url;
     let diretory;
     let box;

     if(urlChoosed){
          url=urlChoosed;
          diretory=urlChoosed;
          box = document.createElement('input');
          box.type = "checkbox"
          box.id = `${nome}IDbox`;

          newImg.appendChild(box)
     }else{

     url = `../public/src/Texture/Duratex/${categoria}/${nome}.PNG`;}
     diretory = `C:/Users/Liboni/AppData/Roaming/SketchUp/SketchUp 2022/SketchUp/Plugins/su_modular/public/src/Texture/Duratex/${categoria}/${nome}.PNG`;
     
     newImage.src = url;
     
     
     
     console.log(url);


  // const texToApply = diretory.replace(/\//g, "\\");
  newImage.alt = "Not found";

  const figCaption = document.createElement("figcaption");

  figCaption.textContent = `${nome}`;

  const spt = document.createElement("div");
  spt.id = "spt-4";

  // Aninhe os elementos
  newImg.appendChild(newImage);
  newImg.appendChild(figCaption);
  newImg.appendChild(spt);
  
  const mdfLibrary = document.getElementById("MDFList");
  mdfLibrary.appendChild(newImg);
  
  DataTex.push({ nome: nome, categoria: categoria, id: ID, url: diretory});
  console.log(DataTex);
}



//Restaura a configuração salva pelo o usuário
function Restorge() {
  if (verificarPagina === "DRYComponent") {
    fetch("../Storage/dryStorage.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          Registrar(item.Nome, item.Descrição, item.Url, item.img, item.id);
          let element = `${item.id}`;
          let elementToClick = document.querySelector(`#Componente${element}`);

          elementToClick.addEventListener("click", () => select(element));
        });
      })
      .catch((error) => {
        console.error("Erro ao ler o arquivo JSON", error);
      });
  } else if (verificarPagina === "WETComponent") {
    fetch("../Storage/wetStorage.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          Registrar(item.Nome, item.Descrição, item.Url, item.img, item.id);
          let element = `${item.id}`;
          let elementToClick = document.querySelector(`#Componente${element}`);

          elementToClick.addEventListener("click", () => select(element));
        });
      })
      .catch((error) => {
        console.error("Erro ao ler o arquivo JSON", error);
      });
  } else if (verificarPagina === "MDF") {
       
    fetch("../Storage/Texture.json")
      .then((response) => response.json())
      .then((data) => {
          let element = 0
        data.forEach((item) => {
          element++
          New_texture_Mdf(item.nome, item.categoria, item.id, item.url);

          let Element = `${item.id}`;
          let URL = `${item.url}`
          let elementToClick = document.querySelector(`#${Element}`);

          elementToClick.addEventListener("click", () => selectTexture(Element,URL));
          
          DataTex.push({nome: item.nome, categoria: item.categoria, id: item.id })
     });
     console.log(element)
     console.log(DataTex)
     ;
 
      })
      .catch((error) => {
        console.error("Erro ao ler o arquivo JSON", error);
      });
  }
}
