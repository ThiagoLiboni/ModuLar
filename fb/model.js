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

import { firebaseConfig } from "./config/db_config_fb.js";
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const database = getDatabase(app)

export class firebaseAccess {
    constructor() {
    }

    Login(email, password, nome, nextPage) {



        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                const uid = user.uid;
                localStorage.setItem("userID", uid);

                // ...

                set(ref(database, "/user/" + uid), {
                    info:{
                        username: nome
                    },

                    status: "online",
                }).then(() => {
                    alert("Login realizado com Sucesso!!");

                    window.location.href = `${nextPage}`;

                    localStorage.setItem("userID", uid);
                });
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..

                // function handleSignError(errorCode) {
                //     let alerta = document.querySelector("#alerta");
                //     if (errorCode === "auth/wrong-password") {
                //         alerta.style.display = "initial";
                //     } else if (errorCode === "auth/user-not-found") {
                //         alerta.style.display = "initial";
                //     }
                // }

                // function refreshPage() {
                //     location.reload();
                // }
                // handleSignError(errorCode, errorMessage);
                // document.body.addEventListener("click", refreshPage);
            });
    }




    Logout() {


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



    sendUserID() {

        const user = localStorage.getItem('userID')
        // console.log(user)
        if (user) {

            fetch('/Auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain' // Define o tipo de conteúdo como texto simples
                },
                body: user
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Usuario online');
                    } else {
                        throw new Error('Erro ao acessar o id do usuário');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }


    checkStatusUser(message) {

        const CurrentID = localStorage.getItem("userID");
        if (CurrentID) {

            let Ref = ref(database, `/user/${CurrentID}/`);
            get(Ref)
                .then(function (snapshot) {

                    Status = snapshot.child("/status").val();
                    console.log("User Status : " + Status);

                    if (verificarPagina == "Home") {
                        let CurrentUser = snapshot.child("/info/username").val();

                        message.innerHTML = `Seja bem-vindo,&nbsp <span style="color: blue;">${CurrentUser}</span>`;
                    }

                    

                    // if (
                    //   verificarPagina != "Authentication" &&
                    //   verificarPagina != "Home" &&
                    //   verificarPagina != "Materials" &&
                    //   CurrentID === "SyzDcAldfteL9vclQWyN5Zcnx2i1"
                    // ) {
                    //   let save = document.querySelector("#Save");
                    //   let config = document.querySelector("form");
                    //   config.style.display = "initial";
                    //   save.style.display = "initial";
                    // }

                })
                .catch((error) => console.log("Status não indetificado", error));
        }
    }
}

