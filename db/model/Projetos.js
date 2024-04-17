import { DataTypes } from 'sequelize';
import { DATABASE } from '../config/db_config.js';

const PROJETO = DATABASE.define('relatorio_projetos', {

    id_relatorio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Cliente: {
        type: DataTypes.STRING,
        

    },
    Projeto: {
        type: DataTypes.STRING,

    },
    Data_Projeto: {
        type: DataTypes.DATE,

    },
    Data_Orcamento: {
        type: DataTypes.DATE,

    },
    Vendedor: {
        type: DataTypes.STRING,

    },
    Status_process: {
        type: DataTypes.STRING,

    }
}, {
    tableName: 'relatorio_projetos',
    timestamps: false
});

export default PROJETO;