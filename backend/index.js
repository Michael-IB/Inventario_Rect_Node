const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'clave_secreta'; 

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

  // Verificar usuario en la base de datos
  const sql = 'SELECT * FROM usuarios WHERE usu_email = ?';
  db.query(sql, [email], async (err, result) => {
    if (err || result.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const usuario = result[0];
    const match = await bcrypt.compare(contraseña, usuario.usu_contraseña);

    if (match) {
      // Generar token JWT
      const token = jwt.sign(
        { id: usuario.usu_id, rol: usuario.usu_rol },
        secretKey,
        { expiresIn: '1h' }
      );

      res.json({ 
        message: 'Login exitoso', 
        token, 
        usuario: { 
          id: usuario.usu_id, 
          nombre: usuario.usu_nombre, 
          rol: usuario.usu_rol 
        } 
      });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  });
});

// Obtener todos los proveedores
app.get('/api/proveedores', (req, res) => {
  const sql = 'SELECT * FROM proveedores';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Crear nuevo proveedor
app.post('/api/proveedores', (req, res) => {
  const { nombre_pro, contacto_pro, direccion_pro } = req.body;
  const sql = 'INSERT INTO proveedores (nombre_pro, contacto_pro, direccion_pro) VALUES (?, ?, ?)';
  db.query(sql, [nombre_pro, contacto_pro, direccion_pro], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Proveedor creado' });
  });
});

// Actualizar proveedor
app.put('/api/proveedores/:id', (req, res) => {
  const { nombre_pro, contacto_pro, direccion_pro } = req.body;
  const sql = 'UPDATE proveedores SET nombre_pro = ?, contacto_pro = ?, direccion_pro = ? WHERE provedor_id = ?';
  db.query(sql, [nombre_pro, contacto_pro, direccion_pro, req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Proveedor actualizado' });
  });
});

// Eliminar proveedor
app.delete('/api/proveedores/:id', (req, res) => {
  const sql = 'DELETE FROM proveedores WHERE provedor_id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Proveedor eliminado' });
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});