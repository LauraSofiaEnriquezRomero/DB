const express = require('express');
const app = express();
const db = require('./db'); // Ruta correcta al archivo de conexión a la base de datos
const port = process.env.PORT || 5500; // Usa el puerto especificado o utiliza el puerto 3000 por defecto

const path = require('path')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// AQUÍ EMPIEZAN LAS CONSULTAS DE TABLAS 

//Consulta de 10 empleados 

app.get('/empleados', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.js
  db.query('SELECT * FROM empleado LIMIT 10;', (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }
  });
});

//Consulta de 10 cursos 

app.get('/cursos', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.js
  db.query('SELECT * FROM curso ORDER BY Id_Curso DESC LIMIT 10;', (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }
  });
});

//Consulta cantidad de empleados de panamá que han realizado cursos 

app.get('/cursosPanama', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.js
  db.query('SELECT c.id_curso, COUNT(*) AS cantidad_empleados FROM curso c JOIN empleado_curso yo ON yo.id_curso_e_c = c.id_curso JOIN empleado e ON yo.id_empleado_e_c = e.id_empleado JOIN ubicacion_principal u ON e.id_ubicacion_em = u.id_ubicacion_principal JOIN ciudad ci ON ci.id_ciudad = u.id_ciudad JOIN estado es ON es.id_estado = ci.id_estado_ciu JOIN pais p ON p.id_pais = es.id_pais_est WHERE p.nombre_pais = "Panama" GROUP BY c.id_curso ORDER BY cantidad_empleados DESC LIMIT 5;', 
  (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }

  });
});

//Consulta cantidad de empleados de Honduras que han realizado cursos 

app.get('/cursosHonduras', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.js
  db.query('SELECT c.id_curso, COUNT(*) AS cantidad_empleados FROM curso c JOIN empleado_curso yo ON yo.id_curso_e_c = c.id_curso JOIN empleado e ON yo.id_empleado_e_c = e.id_empleado JOIN ubicacion_principal u ON e.id_ubicacion_em = u.id_ubicacion_principal JOIN ciudad ci ON ci.id_ciudad = u.id_ciudad JOIN estado es ON es.id_estado = ci.id_estado_ciu JOIN pais p ON p.id_pais = es.id_pais_est WHERE p.nombre_pais = "Honduras" GROUP BY c.id_curso ORDER BY cantidad_empleados DESC LIMIT 5;', 
  (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }

  });
});

//Consulta cantidad de empleados de Colombia que han realizado cursos virtuales

app.get('/cursosColombiaV', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.js
  db.query('SELECT c.id_curso, COUNT(*) AS cantidad_empleados FROM curso c JOIN empleado_curso yo ON yo.id_curso_e_c = c.id_curso JOIN empleado e ON yo.id_empleado_e_c = e.id_empleado JOIN ubicacion_principal u ON e.id_ubicacion_em = u.id_ubicacion_principal JOIN ciudad ci ON ci.id_ciudad = u.id_ciudad JOIN estado es ON es.id_estado = ci.id_estado_ciu JOIN pais p ON p.id_pais = es.id_pais_est WHERE p.nombre_pais = "Colombia" AND c.Tipo_cur Like "VIRTUAL" GROUP BY c.id_curso ORDER BY cantidad_empleados DESC LIMIT 10; ', 
  (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }

  });
});

//Consulta cantidad de empleados de Colombia que han realizado cursos presenciales

app.get('/cursosColombiaP', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.js
  db.query('SELECT c.id_curso, COUNT(*) AS cantidad_empleados FROM curso c JOIN empleado_curso yo ON yo.id_curso_e_c = c.id_curso JOIN empleado e ON yo.id_empleado_e_c = e.id_empleado JOIN ubicacion_principal u ON e.id_ubicacion_em = u.id_ubicacion_principal JOIN ciudad ci ON ci.id_ciudad = u.id_ciudad JOIN estado es ON es.id_estado = ci.id_estado_ciu JOIN pais p ON p.id_pais = es.id_pais_est WHERE p.nombre_pais = "Colombia" AND c.Tipo_cur Like "PRES" GROUP BY c.id_curso ORDER BY cantidad_empleados DESC LIMIT 10; ', 
  (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }

  });
});

//Consulta mejores promedios de los cursos 

app.get('/mejoresPromedios', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.js
  db.query('SELECT * FROM empleado_curso ec, empleado e WHERE ec.id_empleado_e_c = e.id_empleado AND ec.calificacion=100 LIMIT 10;', 
  (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }

  });
});

//AQUI INICIAN LAS CONSULTAS DE UN SOLO DATO 

//Cantidad de cursos en idioma inglés 
app.get('/cIngles', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.js
  db.query('SELECT COUNT(*) AS Cantidad FROM Curso WHERE idioma = "Ingles";', 
  (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }

  });
});

//Cantidad de cursos en idioma español 
app.get('/cEspanol', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.js
  db.query('SELECT COUNT(*) AS Cantidad FROM Curso WHERE idioma = "Español";', 
  (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }

  });
});

//Cantidad de cursos en idioma Holandes 
app.get('/cHolandes', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.js
  db.query('SELECT COUNT(*) AS Cantidad FROM Curso WHERE idioma = "Holandes";', 
  (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }
  });
});

//Cantidad de cursos en idioma Frances 
app.get('/cFrances', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.js
  db.query('SELECT COUNT(*) AS Cantidad FROM Curso WHERE idioma = "Frances";', 
  (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }
  });
});

//cursos aprobados por los empleados 
app.get('/cAprobadosEm', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.js
  db.query('SELECT COUNT(*) AS Cantidad FROM empleado e, empleado_curso ec WHERE  Estado LIKE "Aprobado%" AND ec.id_empleado_e_c = e.id_empleado;',
  (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }
  });
});

//cursos NO aprobados por los empleados 
app.get('/cNoAprobadosEm', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.js
  db.query('SELECT COUNT(*) AS Cantidad FROM empleado e, empleado_curso ec WHERE  Estado LIKE "No Aprobado%" AND ec.id_empleado_e_c = e.id_empleado;',
  (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }
  });
});

//Promedio de notas de los empleados de Colombia
app.get('/PromNotasCol', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.jss
  db.query('SELECT AVG(ec.calificacion) AS Cantidad FROM empleado_curso ec,empleado e , ubicacion_principal u, ciudad c, estado es, pais p WHERE p.nombre_pais="colombia" AND es.id_pais_est = p.id_pais AND c.id_estado_ciu=es.id_estado AND u.id_ciudad = c.id_ciudad AND e.id_ubicacion_em = u.id_ubicacion_principal AND ec.id_empleado_e_c=e.id_empleado;',
  
  (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }
  });
});


//Promedio de notas de los empleados de Costa Rica.
app.get('/PromNotasCR', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.jss
  db.query('SELECT AVG(ec.calificacion) AS Cantidad  FROM empleado_curso ec,empleado e , ubicacion_principal u, ciudad c, estado es, pais p WHERE p.nombre_pais="Costa Rica" AND es.id_pais_est = p.id_pais AND c.id_estado_ciu=es.id_estado AND u.id_ciudad = c.id_ciudad AND e.id_ubicacion_em = u.id_ubicacion_principal AND ec.id_empleado_e_c=e.id_empleado;' ,
  
  (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }
  });
});

//Promedio de notas de los empleados de honduras.
app.get('/PromNotasH', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.jss
  db.query('SELECT AVG(ec.calificacion) AS Cantidad  FROM empleado_curso ec,empleado e , ubicacion_principal u, ciudad c, estado es, pais p WHERE p.nombre_pais="Honduras" AND es.id_pais_est = p.id_pais AND c.id_estado_ciu=es.id_estado AND u.id_ciudad = c.id_ciudad AND e.id_ubicacion_em = u.id_ubicacion_principal AND ec.id_empleado_e_c=e.id_empleado; ' ,
  
  (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      // Devuelve los resultados como respuesta JSON
      res.json(results);
    }
  });
});

//Promedio de notas de los empleados de panama
app.get('/PromNotasP', (req, res) => {
  // Realiza la consulta a la base de datos utilizando el módulo db.jss
  db.query('SELECT AVG(ec.calificacion) AS Cantidad FROM empleado_curso ec,empleado e , ubicacion_principal u, ciudad c, estado es, pais p WHERE p.nombre_pais="Panama" AND es.id_pais_est = p.id_pais AND c.id_estado_ciu=es.id_estado AND u.id_ciudad = c.id_ciudad AND e.id_ubicacion_em = u.id_ubicacion_principal AND ec.id_empleado_e_c=e.id_empleado; ' ,
  
  (error, results) => {
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


