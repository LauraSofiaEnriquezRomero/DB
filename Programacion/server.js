const express = require('express');
const app = express();
const db = require('./db'); // Ruta correcta al archivo de conexión a la base de datos
const port = process.env.PORT || 5500; // Usa el puerto especificado o utiliza el puerto 3000 por defecto


// Configuración de rutas y lógica del servidor

// Ejemplo de ruta que realiza una consulta a la base de datos
app.get('/', (req, res) => {
  db.query('SELECT * FROM empleado LIMIT 10;', (error, result) => {
    if (error) throw error;

    const processedResults = results.map(item => ({
      id: item.id,
      nombre: item.nombre,
    }));

    res.sendFile(__dirname + '/index.html');

  });

});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

