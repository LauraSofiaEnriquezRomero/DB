const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yine2701',
  database: 'proyecto_final'
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');

  // Ejemplo de consulta y muestra de resultados en la consola
  db.query('SELECT * FROM empleado LIMIT 10;', (err, result) => {
    if (err) {
      console.error('Error al realizar la consulta: ', err);
      return;
    }
    console.log('Resultados de la consulta:', result);
    db.end(); // Cerrar la conexión a la base de datos cuando hayas terminado
  });
});
