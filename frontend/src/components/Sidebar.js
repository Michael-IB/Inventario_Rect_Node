import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ rol }) => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/" className="brand-link">
        <span className="brand-text font-weight-light">Inventario</span>
      </a>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <i className="nav-icon fas fa-home"></i>
                <p>Dashboard</p>
              </Link>
            </li>

            {rol === 'admin' && (
              <>
                <li className="nav-item">
                  <Link to="/productos" className="nav-link">
                    <i className="nav-icon fas fa-box"></i>
                    <p>Productos</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/proveedores" className="nav-link">
                    <i className="nav-icon fas fa-truck"></i>
                    <p>Proveedores</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ventas" className="nav-link">
                    <i className="nav-icon fas fa-shopping-cart"></i>
                    <p>Ventas</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/compras" className="nav-link">
                    <i className="nav-icon fas fa-cart-plus"></i>
                    <p>Compras</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/almacenes" className="nav-link">
                    <i className="nav-icon fas fa-warehouse"></i>
                    <p>Almacenes Múltiples</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/movimientos" className="nav-link">
                    <i className="nav-icon fas fa-exchange-alt"></i>
                    <p>Movimientos</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/auditoria" className="nav-link">
                    <i className="nav-icon fas fa-clipboard-list"></i>
                    <p>Auditoría</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/reportes" className="nav-link">
                    <i className="nav-icon fas fa-chart-bar"></i>
                    <p>Reportes</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/configuracion" className="nav-link">
                    <i className="nav-icon fas fa-cog"></i>
                    <p>Configuración</p>
                  </Link>
                </li>
              </>
            )}

            {rol === 'empleado' && (
              <>
                <li className="nav-item">
                  <Link to="/productos" className="nav-link">
                    <i className="nav-icon fas fa-box"></i>
                    <p>Productos</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ventas" className="nav-link">
                    <i className="nav-icon fas fa-shopping-cart"></i>
                    <p>Ventas</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/compras" className="nav-link">
                    <i className="nav-icon fas fa-cart-plus"></i>
                    <p>Compras</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/movimientos" className="nav-link">
                    <i className="nav-icon fas fa-exchange-alt"></i>
                    <p>Movimientos</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/reportes" className="nav-link">
                    <i className="nav-icon fas fa-chart-bar"></i>
                    <p>Reportes</p>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;