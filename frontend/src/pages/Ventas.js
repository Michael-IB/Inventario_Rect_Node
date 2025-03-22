import React from 'react';
import Layout from '../components/Layout';

const Ventas = () => {
  return (
    <Layout rol="admin"> {/* Pasa el rol del usuario */}
      <h1>Ventas</h1>
      <p>Aquí puedes gestionar las ventas.</p>
    </Layout>
  );
};

export default Ventas;