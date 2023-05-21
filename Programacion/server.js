const express = require('express');
const app = express();
const db = require('./db'); // Ruta correcta al archivo de conexión a la base de datos
const port = process.env.PORT || 5500; // Usa el puerto especificado o utiliza el puerto 3000 por defecto

const path = require('path')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
//Consulta 

app.get('/consulta', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.js
  db.query('SELECT * FROM recursos_humanos LIMIT 10;', (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});


