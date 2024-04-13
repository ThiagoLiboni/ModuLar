import { DataTypes } from 'sequelize';
import { DATABASE } from '../config/db_config.js';

export const VENDEDOR = DATABASE.define('vendedor', {
    Contato: {
        type: DataTypes.INTEGER,
        primaryKey: true // Definir Contato como chave primária
    },
    Nome: {
        type: DataTypes.STRING
    },
    Email: {
        type: DataTypes.STRING
    },
    Endereco: {
        type: DataTypes.STRING
    },
    Cidade: {
        type: DataTypes.STRING
    },
    Estado: {
        type: DataTypes.STRING(2)
    }
}, {
    tableName: 'vendedor', // Especifica o nome da tabela
    timestamps: false
});
