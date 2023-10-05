const verificarPagina = window.location.pathname.split("/").pop();

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
  get,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4iQ76GUf9G5-cZ9ojnI8RqTR1fsJ3SxA",
  authDomain: "modularplugin.firebaseapp.com",
  databaseURL: "https://modularplugin-default-rtdb.firebaseio.com",
  projectId: "modularplugin",
  storageBucket: "modularplugin.appspot.com",
  messagingSenderId: "459181592799",
  appId: "1:459181592799:web:b5a3d3a6bad34cbb63996a",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
let Status = "";
let local = 0;
let verificadorIniciado = false;


function inicializar() {
  //inicializar com a verificação para autenticação do usuario
  if (verificadorIniciado == true) {
    return console.log("Login verificado");
  } else {
    verificadorIniciado = true;

    const CurrentID = localStorage.getItem("userID");
    //console.log(CurrentID);

    let Ref = ref(database, `/user/${CurrentID}/`);

    get(Ref)
      .then(function (snapshot) {
        Status = snapshot.child("/status").val();
        console.log("User Status : " + Status);

        if (verificarPagina == "Home") {
          let CurrentUser = snapshot.child("/info/username").val();
          mwelcome.innerHTML = `Seja bem-vindo,&nbsp <span style="color: blue;">${CurrentUser}</span>`;
        }
        
        if (
          verificarPagina != "Authentication" &&
          verificarPagina != "Home" &&
          verificarPagina != "Materials" &&
          CurrentID === "SyzDcAldfteL9vclQWyN5Zcnx2i1"
        ) {
          let save = document.querySelector("#Save");
          let config = document.querySelector("form");
          config.style.display = "initial";
          save.style.display = "initial";
        }

        if (Status == "offline" && verificarPagina != "Authentication") {
          window.location.href = "/Authentication";
        } else if (Status == "online" && verificarPagina == "Authentication") {
          window.location.href = "/Home";
        }
      })
      .catch((error) => console.log("Status não indetificado", error));
    }
    
    local = 1;
  }
  
  inicializar();
  console.log(verificadorIniciado);
  
//validar acesso por login do usuário

if (verificarPagina == "Authentication") {
  document.querySelector("#login").addEventListener("click", SignIn);
}
let alerta = document.querySelector("#alerta");

function SignIn(e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let Nome = document.querySelector("#nome").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const uid = user.uid;
      localStorage.setItem("userID", uid); //ID armazenado
      local = 1;

      // ...

      set(ref(database, "/user/" + uid), {
        info: {
          email: email,
          username: Nome,
        },
        status: "online",
      }).then(() => {
        alert("Login realizado com Sucesso!!");

        window.location.href = "/Home";

        localStorage.setItem("userID", uid);
      });
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      handleSignError(errorCode, errorMessage);
      document.body.addEventListener("click", refreshPage);
    });
}

function handleSignError(errorCode) {
  if (errorCode === "auth/wrong-password") {
    alerta.style.display = "initial";
  } else if (errorCode === "auth/user-not-found") {
    alerta.style.display = "initial";
  }
}

function refreshPage() {
  location.reload();
}
// Realizar o logout do usuário
if (verificarPagina == "Home") {
  document.querySelector("#logout").addEventListener("click", LogoutAndUpdate);
}

function LogoutAndUpdate() {
  let user = auth.currentUser;
  let uid = user.uid;

  if (user) {
    const updates = {};
    updates["/user/" + uid + "/status"] = "offline";

    auth.signOut();

    update(ref(database), updates)
      .then(() => {
        console.log("Status atualizado para offline");
        window.location.href = "/Authentication";
      })

      .catch(() => {
        console.log("Erro ao atualizar o status para offline:", error);
      });
  }
}

//--------------------
