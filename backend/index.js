const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;
const bcrypt = require('bcrypt');

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'inventario'
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Ruta para registrar usuarios
app.post('/api/register', async (req, res) => {
  const { nombre, email, contraseña, rol } = req.body;

  try {
    // Encriptar la contraseña
    const saltRounds = 10; // Número de rondas de hashing
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    const sql = 'INSERT INTO usuarios (usu_nombre, usu_email, usu_contraseña, usu_rol) VALUES (?, ?, ?, ?)';
    const values = [nombre, email, hashedPassword, rol];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error registrando usuario:', err);
        res.status(500).send('Error registrando usuario');
      } else {
        res.status(201).send('Usuario registrado correctamente');
      }
    });
  } catch (error) {
    console.error('Error encriptando la contraseña:', error);
    res.status(500).send('Error en el servidor');
  }
});

app.post('/api/login', async (req, res) => {
  const { email, contraseña } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE usu_email = ?';
  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.error('Error buscando usuario:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuario = result[0];

    // Comparar la contraseña ingresada con el hash almacenado
    const match = await bcrypt.compare(contraseña, usuario.usu_contraseña);

    if (match) {
      res.status(200).json({ message: 'Inicio de sesión exitoso', usuario });
    } else {
      res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});