import React from 'react';
import Layout from '../components/Layout';

const Dashboard = () => {
  const rol = 'admin'; // Obtén el rol del usuario desde el estado o el backend

  return (
    <Layout rol={rol}>
      <h1>Bienvenido al Dashboard</h1>
      <p>Aquí puedes gestionar tu inventario.</p>
    </Layout>
  );
};

export default Dashboard;