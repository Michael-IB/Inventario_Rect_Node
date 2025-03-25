import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Obtener datos del usuario

  const handleLogout = () => {
    Swal.fire({
      title: `¿Cerrar sesión, ${user.nombre}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    });
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Botón para colapsar el sidebar (opcional) */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <button className="nav-link" data-widget="pushmenu">
            <i className="fas fa-bars"></i>
          </button>
        </li>
      </ul>

      {/* Botón de cerrar sesión con el nombre del usuario */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <button 
            onClick={handleLogout} 
            className="nav-link btn btn-transparent"
            style={{ cursor: 'pointer' }}
          >
            <span className="mr-2">{user?.nombre || 'Usuario'} 👋</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;