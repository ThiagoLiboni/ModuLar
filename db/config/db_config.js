
import {Sequelize} from 'sequelize';
import mysql2 from 'mysql2';

export const DATABASE = new Sequelize({
  database: "ftsmodular",
  username:"root",
  password: "admin",
  host: 'localhost',
  dialect: 'mysql',
  dialectModule: mysql2,
  benchmark: true
});

export default DATABASE;
