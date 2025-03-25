const jwt = require('jsonwebtoken');
const secretKey = 'michael2004'; // Cambia esto por una clave segura en producción

const generateToken = (user) => {
  return jwt.sign(
    { id: user.usu_id, rol: user.usu_rol },
    secretKey,
    { expiresIn: '1h' } // El token expira en 1 hora
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { generateToken, verifyToken };