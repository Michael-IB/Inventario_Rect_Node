import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import Layout from '../components/Layout';

const Proveedores = () => {
  // Estados [Mantener igual...]
  const [proveedores, setProveedores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre_pro: '',
    contacto_pro: '',
    direccion_pro: ''
  });
  const [editId, setEditId] = useState(null);

  // Efectos y funciones [Mantener igual...]
  useEffect(() => { fetchProveedores(); }, []);

  const fetchProveedores = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/proveedores');
      const data = await response.json();
      setProveedores(data);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'No se pudieron cargar los proveedores', 'error');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId 
      ? `http://localhost:5000/api/proveedores/${editId}`
      : 'http://localhost:5000/api/proveedores';
    const method = editId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        Swal.fire('Éxito', editId ? 'Proveedor actualizado' : 'Proveedor agregado', 'success');
        setShowModal(false);
        setFormData({ nombre_pro: '', contacto_pro: '', direccion_pro: '' });
        fetchProveedores();
      }
    } catch (error) {
      Swal.fire('Error', 'Error al guardar', 'error');
    }
  };

  const handleEdit = (proveedor) => {
    setFormData({
      nombre_pro: proveedor.nombre_pro,
      contacto_pro: proveedor.contacto_pro,
      direccion_pro: proveedor.direccion_pro
    });
    setEditId(proveedor.provedor_id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar proveedor?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:5000/api/proveedores/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          Swal.fire('Eliminado', 'Proveedor eliminado', 'success');
          fetchProveedores();
        }
      }
    });
  };

  return (
    <Layout rol="admin">
      {/* Contenido principal optimizado para espacio completo */}
      <div className="" style={{ minHeight: "" }}>
        <section className="content-header p-3 bg-white">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="m-0">Gestión de Proveedores</h1>
              <Button 
                variant="primary" 
                onClick={() => { 
                  setEditId(null); 
                  setShowModal(true); 
                }}
                size="sm"
              >
                <i className="fas fa-plus mr-1"></i> Nuevo Proveedor
              </Button>
            </div>
          </div>
        </section>

        <section className="content p-3">
          <div className="container-fluid p-0">
            <div className="card">
              <div className="card-body p-0">
                <Table striped bordered hover className="m-0">
                  <thead className="bg-dark">
                    <tr>
                      <th style={{ width: '10%' }}>ID</th>
                      <th style={{ width: '30%' }}>Nombre</th>
                      <th style={{ width: '20%' }}>Contacto</th>
                      <th style={{ width: '30%' }}>Dirección</th>
                      <th style={{ width: '10%' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proveedores.length > 0 ? (
                      proveedores.map((proveedor) => (
                        <tr key={proveedor.provedor_id}>
                          <td>{proveedor.provedor_id}</td>
                          <td>{proveedor.nombre_pro}</td>
                          <td>{proveedor.contacto_pro}</td>
                          <td>{proveedor.direccion_pro}</td>
                          <td className="text-center">
                            <Button 
                              variant="outline-warning" 
                              size="sm" 
                              onClick={() => handleEdit(proveedor)}
                              className="mr-1"
                              title="Editar"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm" 
                              onClick={() => handleDelete(proveedor.provedor_id)}
                              title="Eliminar"
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-4">
                          No hay proveedores registrados
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal del formulario (mantener igual) */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Editar' : 'Nuevo'} Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Proveedor</Form.Label>
              <Form.Control
                type="text"
                name="nombre_pro"
                value={formData.nombre_pro}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contacto</Form.Label>
              <Form.Control
                type="text"
                name="contacto_pro"
                value={formData.contacto_pro}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion_pro"
                value={formData.direccion_pro}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="mr-2">
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editId ? 'Actualizar' : 'Guardar'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default Proveedores;