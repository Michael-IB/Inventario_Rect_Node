/*
const db = require('../db');

// Obtener todos los productos
const getProductos = (req, res) => {
  const sql = 'SELECT * FROM productos';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error obteniendo productos:', err);
      res.status(500).send('Error obteniendo productos');
    } else {
      res.json(result);
    }
  });
};

// Añadir un nuevo producto
const addProducto = (req, res) => {
  const { nombre, descripcion, precio, costo, stock, stock_minimo, categoria_id, proveedor_id, almacen_id } = req.body;
  const sql = 'INSERT INTO productos (nombre, descripcion, precio, costo, stock, stock_minimo, categoria_id, proveedor_id, almacen_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [nombre, descripcion, precio, costo, stock, stock_minimo, categoria_id, proveedor_id, almacen_id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error añadiendo producto:', err);
      res.status(500).send('Error añadiendo producto');
    } else {
      res.status(201).send('Producto añadido correctamente');
    }
  });
};

module.exports = { getProductos, addProducto };
*/