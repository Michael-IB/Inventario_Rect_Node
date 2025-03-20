import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    rol: 'empleado', // Valor por defecto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Usuario registrado correctamente',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          // Redirigir al login después de aceptar la alerta
          window.location.href = '/';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error registrando usuario',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error registrando usuario',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="hold-transition register-page">
      <div className="register-box">
        <div className="register-logo">
          <a href="/"><b>Inventario</b>LTE</a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Registrar una nueva membresía</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre completo"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo electrónico"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <select
                  className="form-control"
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  required
                >
                  <option value="admin">Administrador</option>
                  <option value="empleado">Empleado</option>
                </select>
              </div>
              <div className="row">
                <div className="col-8"></div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">Registrar</button>
                </div>
              </div>
            </form>

            <p className="mb-0">
              <a href="/login" className="text-center">Ya tengo una cuenta</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;