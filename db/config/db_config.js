import {Sequelize} from 'sequelize';

export const DATABASE = new Sequelize("ftsmodular","root","admin",{
  host: 'localhost',
  dialect: 'mysql',
  dialectModule: require('mysql2'),
});