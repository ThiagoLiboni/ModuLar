// Passo 1: Definição de Observadores e Sujeito

// Defina uma interface para Observadores
class Observador {
    update() {
      // Método a ser implementado pelos Observadores
    }
  }
  
  // Crie um Sujeito
  class Sujeito {
    constructor() {
      this.observadores = [];
    }
  
    // Métodos para adicionar e notificar Observadores
    adicionarObservador(observador) {
      this.observadores.push(observador);
    }
  
    notificarObservadores() {
      for (const observador of this.observadores) {
        observador.update();
      }
    }
  
    // Outros métodos e lógica do Sujeito
  }
  
  // Passo 2: Registro e Notificação de Observadores
  
  // Crie instâncias de Observadores
  const observador1 = new Observador();
  const observador2 = new Observador();
  
  // Crie uma instância do Sujeito
  const sujeito = new Sujeito();
  
  // Registre os Observadores no Sujeito
  sujeito.adicionarObservador(observador1);
  sujeito.adicionarObservador(observador2);
  
  // Quando um evento ocorrer, notifique os Observadores
  sujeito.notificarObservadores();
  