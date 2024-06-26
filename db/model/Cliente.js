
import { connection } from '../config/db_config.js';

export class CLIENTE {
  constructor(user) {
    this.table = "cliente_empresa";
    this.user = user

  }

  SELECT() {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${this.table}
      WHERE Empresa_Usuario_ID = '${this.user}'`,
       function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  SELECT_WHERE(column, value) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${this.table} 
      WHERE Empresa_Usuario_ID = '${this.user}'
      AND ${column} = '${value}'`, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  
  SELECT_WHERE_IN(column,value) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM ${this.table} 
       WHERE Empresa_Usuario_ID = '${this.user}'
      AND ?? IN (?)`;
        connection.query(sql,[column,value], function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  
  SELECT_WHERE_OR(column1,column2,value) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${this.table}
      WHERE Empresa_Usuario_ID = '${this.user}'
      AND${column1} LIKE '%${value}%' OR  ${column2} LIKE '%${value}%'`, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  SELECT_COLUMN(column) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT ${column} FROM ${this.table} 
      WHERE Empresa_Usuario_ID = '${this.user}`, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  
  ORDER_BY(column,value,order) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${this.table}
        WHERE Empresa_Usuario_ID = '${this.user}'
        AND ${column} = '${value}' ORDER BY ${order}`, function (err, result) {
          if (err) throw err;
          resolve(result);
        });
      });
  }
  
  ORDER_BY_WHERE(column,value,order) {
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM ${this.table}
        WHERE Empresa_Usuario_ID = '${this.user}'
        AND ?? IN (?) ORDER BY ${order}`
        connection.query(sql,[column,value], function (err, result) {
          if (err) throw err;
          resolve(result);
        });
      });
  }


  INSERT(dados) {
    return new Promise((resolve, reject) => {
      let columns = Object.keys(dados).join(', ');
      let columnValues = Object.values(dados).map(value => `'${value}'`).join(', ');

      var sql = `INSERT INTO ${this.table} (${columns}) VALUES (${columnValues})`;
      connection.query(sql, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  DELETE(column, value) {
    return new Promise((resolve, reject) => {
      var sql = `DELETE FROM ${this.table}
      WHERE Empresa_Usuario_ID = '${this.user}'
      AND${column} = '${value}'`;
      connection.query(sql, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  UPDATE(column, value, condition, VALUE) {
    return new Promise((resolve, reject) => {
      var sql = `UPDATE ${this.table} SET ${column} = '${value}'
      WHERE Empresa_Usuario_ID = '${this.user}'
      AND${condition} = '${VALUE}'`;
      connection.query(sql, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}