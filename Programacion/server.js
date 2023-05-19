
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 5500;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yine2701',
  database: 'proyecto_final'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

app.use(express.static('Vista'));
