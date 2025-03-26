import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import Layout from '../components/Layout';

const Almacenes = () => {
  // Estados [Mantener igual...]
  const [almacenes, setAlmacenes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre_a: '',
    direccion_a: ''
  });
  const [editId, setEditId] = useState(null);

  // Efectos y funciones [Mantener igual...]
  useEffect(() => { fetchAlmacenes(); }, []);

  const fetchAlmacenes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/almacenes');
      const data = await response.json();
      setAlmacenes(data);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'No se pudieron cargar los almacenes', 'error');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId 
      ? `http://localhost:5000/api/almacenes/${editId}`
      : 'http://localhost:5000/api/almacenes';
    const method = editId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        Swal.fire('Éxito', editId ? 'Almacen actualizado' : 'Almacen agregado', 'success');
        setShowModal(false);
        setFormData({ nombre_a: '', direccion_a: '' });
        fetchAlmacenes();
      }
    } catch (error) {
      Swal.fire('Error', 'Error al guardar', 'error');
    }
  };

  const handleEdit = (almacen) => {
    setFormData({
        nombre_a: almacen.nombre_a,
      direccion_a: almacen.direccion_a
    });
    setEditId(almacen.almacen_id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar Almacen?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:5000/api/almacenes/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          Swal.fire('Eliminado', 'Almacen eliminado', 'success');
          fetchAlmacenes();
        }
      }
    });
  };

  return (
    <Layout rol="admin">
      {}
      
      <div className="" style={{ minHeight: "" }}>
        <section className="content-header p-3 bg-white">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="m-0">Gestión de Almacenes</h1>
              <Button 
                variant="primary" 
                onClick={() => { 
                  setEditId(null); 
                  setShowModal(true); 
                }}
                size="sm"
              >
                <i className="fas fa-plus mr-1"></i> Nuevo Almacen
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
                <th style={{ width: '40%' }}>Nombre</th>
                <th style={{ width: '40%' }}>Dirección</th>
                <th style={{ width: '20%' }}>Acciones</th>
                </tr>
                </thead>
                <tbody>
    {almacenes.length > 0 ? (
      almacenes.map((almacen) => (
        <tr key={almacen.almacen_id}>
          <td>{almacen.nombre_a}</td>
          <td>{almacen.direccion_a}</td>
          <td className="text-center">
            <Button 
              variant="outline-warning" 
              size="sm" 
              onClick={() => handleEdit(almacen)}
              className="mr-1"
              title="Editar"
            >
              <i className="fas fa-edit"></i>
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm" 
              onClick={() => handleDelete(almacen.almacen_id)}
              title="Eliminar"
            >
              <i className="fas fa-trash"></i>
            </Button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="3" className="text-center text-muted py-4">
          No hay almacenes registrados
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
          <Modal.Title>{editId ? 'Editar' : 'Nuevo'} Almacen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Almacen</Form.Label>
              <Form.Control
                type="text"
                name="nombre_a"
                value={formData.nombre_a}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion_a"
                value={formData.direccion_a}
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

export default Almacenes;