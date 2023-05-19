const express = require('express');
const app = express();
const db = require('./db'); // Ruta correcta al archivo de conexión a la base de datos
const port = 5500;
app.use('/', express.static('index.html'));

// Configuración de rutas y lógica del servidor

// Ejemplo de ruta que realiza una consulta a la base de datos
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM empleado LIMIT 10;', (err, result) => {
    if (err) {
      console.error('Error al obtener empleados: ', err);
      res.status(500).send('Error del servidor');
      return;
    }
    res.send(generarHTML(result));
  });
});

// Función para generar el HTML con los resultados de la consulta
function generarHTML(resultados) {
  let html = '<html><body><ul>';
  for (let i = 0; i < resultados.length; i++) {
    html += `<li>${resultados[i].nombre_em}</li>`;
  }
  html += '</ul></body></html>';
  return html;
}

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

