import { DataTypes } from 'sequelize';
import { DATABASE } from '../config/db_config.js';


export const CLIENTE = DATABASE.define('cliente', {
    CPF: {
      type: DataTypes.STRING,
      primaryKey: true, // Definir como chave primaria
    
    },
    Nome: {
      type: DataTypes.STRING
    },
    Contato: {
      type: DataTypes.INTEGER
    },
    Email: {
      type: DataTypes.STRING
    },
    Endereço: {
      type: DataTypes.STRING
    },
    Cidade: {
      type: DataTypes.STRING
    },
    Estado: {
      type: DataTypes.STRING(2) 
    }
  }, {
    tableName: 'cliente', // Especificar o nome da tabela
    timestamps: false // Desativar timestamps
  });
  