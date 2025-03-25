import React from 'react';
import Layout from '../components/Layout';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Layout rol={user.rol}>
      <h1>Bienvenido, {user.nombre}!</h1>
      <p>Rol: {user.rol}</p>
      {/* Contenido del dashboard */}
    </Layout>
  );
};

export default Dashboard;