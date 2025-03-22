import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children, rol }) => {
  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar rol={rol} />

      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            {children}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;