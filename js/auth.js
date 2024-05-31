const verificarPagina = window.location.pathname.split("/").pop();
import {firebaseAccess} from '../fb/model.js'


let Status = "";
let verificadorIniciado = false;


function inicializar() {
  //inicializar com a verificação para autenticação do usuario
  if (verificadorIniciado == true) {
    return console.log("Login verificado");
  } else {

    verificadorIniciado = true;
    const messageWellcome = document.getElementById('mwelcome')

    const account = new firebaseAccess()
    account.checkStatusUser(messageWellcome)

    if (Status == "offline" && verificarPagina != "Authentication") {
      window.location.href = "/Authentication";
    } else if (Status == "online" && verificarPagina == "Authentication") {
      window.location.href = "/Home";
    }


  }
}

inicializar();
console.log(verificadorIniciado);

//validar acesso por login do usuário

if (verificarPagina == "Authentication") {
  document.querySelector("#login").addEventListener("click", (e) => {

      e.preventDefault();
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      let nome = document.getElementById("nome").value;
      let nextPage = "/Home"

      const account = new firebaseAccess()
      account.Login(email, password,nome, nextPage)

    })

  }



// Realizar o logout do usuário
if (verificarPagina != "Authentication") {
  document.querySelector("#logout").addEventListener("click", () => {

    const account = new firebaseAccess()
    account.Logout()

  });
}
