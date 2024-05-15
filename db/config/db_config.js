

import dotenv from 'dotenv';
import mysql from 'mysql2';
dotenv.config();

export const connection = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
<<<<<<< HEAD
    user: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`
  })
=======
    dialect: 'mysql',
    dialectModule: mysql2,
    benchmark: true
});
>>>>>>> 8f85b745bc4cbe8235b653883a2c9b364434ce45


