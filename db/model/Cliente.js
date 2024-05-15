
import { connection } from '../config/db_config.js';

export class CLIENTE {
  constructor() {
    this.table = "cliente";

  }

  
  SELECT() {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${this.table}`, function (err, result, fields) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  SELECT_WHERE(column, value) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${this.table} WHERE ${column} = '${value}'`, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  SELECT_COLUMN(column) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT ${column} FROM ${this.table}`, function (err, result) {
        if (err) reject(err);
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
      var sql = `DELETE FROM ${this.table} WHERE ${column} = '${value}'`;
      connection.query(sql, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  UPDATE(column, value, condition, VALUE) {
    return new Promise((resolve, reject) => {
      var sql = `UPDATE ${this.table} SET ${column} = '${value}' WHERE ${condition} = '${VALUE}'`;
      connection.query(sql, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}