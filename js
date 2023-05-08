import * as mysql from 'mysql';
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'PROYECTO_FINAL'
  });
  
  connection.connect((error) => {
    if (error) {
      console.error('Error de conexión: ' + error.stack);
      return;
    }
  
    console.log('Conectado a la base de datos MySQL.');
  });
  
/*  connection.query('SELECT * FROM tabla', (error, results, fields) => {
    if (error) {
      console.error('Error de consulta: ' + error.stack);
      return;
    }
  
    console.log('Resultados de la consulta: ', results);
  });

  connection.end((error) => {
    if (error) {
      console.error('Error al cerrar la conexión: ' + error.stack);
      return;
    }
  
    console.log('Conexión cerrada correctamente.');
  });*/
