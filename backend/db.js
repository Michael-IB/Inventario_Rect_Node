const mysql = require('mysql2');

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',      // Dirección del servidor MySQL
  user: 'root',           // Usuario de MySQL
  password: 'root',           // Contraseña de MySQL
  database: 'inventario'  // Nombre de la base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Exportar la conexión para usarla en otros archivos
module.exports = db;