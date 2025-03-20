import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import 'admin-lte/dist/css/adminlte.min.css';
import $ from 'jquery'; // eslint-disable-line no-unused-vars
import 'admin-lte';

// Selecciona el contenedor raíz
const container = document.getElementById('root');

// Crea una raíz para renderizar la aplicación
const root = createRoot(container);

// Renderiza la aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);