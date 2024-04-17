
import {Sequelize} from 'sequelize';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const DATABASE = new Sequelize({

    database: `${process.env.DB_DATABASE}`,
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    host: `${process.env.DB_HOST}`,
    dialect: 'mysql',
  dialectModule: mysql2,
  benchmark: true
});


