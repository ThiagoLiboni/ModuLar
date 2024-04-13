const verificarPagina = window.location.pathname.split('/').pop();
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {  getStorage, ref, updateMetadata, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";
import {componenteData, adicionarObservador} from "./index.js"


import { sendToRuby } from "./middle.js";





// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyC4iQ76GUf9G5-cZ9ojnI8RqTR1fsJ3SxA",
    authDomain: "modularplugin.firebaseapp.com",
    databaseURL: "https://modularplugin-default-rtdb.firebaseio.com",
    projectId: "modularplugin",
    storageBucket: "modularplugin.appspot.com",
    messagingSenderId: "459181592799",
    appId: "1:459181592799:web:b5a3d3a6bad34cbb63996a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

function ObserverData (){
    console.log(componenteData)};

    if (verificarPagina === "views/DRYComponent.html" | verificarPagina === "views/WETComponent.html"  ) {
      adicionarObservador(ObserverData);}
      
      let currentID = null
      const destino =  `C:/Users/Liboni/AppData/Roaming/SketchUp/SketchUp 2022/SketchUp/Components`
      
      window.rubyBridge = {
        call: function (methodName, parameter){
        console.log(`Chamando método Ruby: ${methodName} com parâmetro: ${parameter}`);
    // Lógica para chamar uma função Ruby com o nome 'methodName' e passar 'parameter'
        }
};
    
let url ="";

export function GetID (ID, nome){ //Obter informações para disponibilizar download
    currentID = ID;
    console.log(currentID);
    const element = document.getElementById(`${currentID}URL`);
    const currentURL = element.textContent;
    console.log(currentURL)

    const data = {Nome:nome, URL:currentURL}
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) }
    
      fetch('/download', requestOptions)
      .then(response => {
        if(!response.ok) {
          throw new Error(`Erro na solicitação. ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      
      .then(data => {
        console.log(data); //Retorna a resposta da solicitação no console
        url = destino+'/'+nome+'.skp';
        //Chamar a função Ruby para receber a Url

        sendToRuby(url)
      })
      .catch(error =>{
        console.error('Erro',error);
      })
      
       
}

  
