// src/components/Tipos.js
import React, { useState, useEffect } from "react";
import { getTipos, createTipo, updateTipo, deleteTipo } from "../services/api";

const Tipos = () => {
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({
    Nombre: "",
    Descripcion: ""
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cargarTipos();
  }, []);

  const cargarTipos = async () => {
    try {
      const res = await getTipos();
      setTipos(res.data);
    } catch (error) {
      console.error("Error cargando tipos:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateTipo(editId, form);
      } else {
        await createTipo(form);
      }
      setForm({ Nombre: "", Descripcion: "" });
      setEditId(null);
      cargarTipos();
    } catch (error) {
      console.error("Error guardando tipo:", error);
    }
  };

  const handleEdit = (tipo) => {
    setForm({
      Nombre: tipo.Nombre,
      Descripcion: tipo.Descripcion
    });
    setEditId(tipo._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este tipo?")) {
      try {
        await deleteTipo(id);
        cargarTipos();
      } catch (error) {
        console.error("Error eliminando tipo:", error);
      }
    }
  };

  const handleCancel = () => {
    setForm({ Nombre: "", Descripcion: "" });
    setEditId(null);
  };

  const tiposFiltrados = tipos.filter((t) =>
    t.Nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="module-container">
      <h2>📋 Gestión de Tipos</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="Nombre"
            value={form.Nombre}
            onChange={handleChange}
            required
            placeholder="Nombre del tipo"
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            name="Descripcion"
            value={form.Descripcion}
            onChange={handleChange}
            required
            placeholder="Descripción del tipo"
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-save">
            {editId ? "Actualizar" : "Guardar"}
          </button>
          {editId && (
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <input
        type="text"
        placeholder="🔍 Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tiposFiltrados.map((tipo) => (
            <tr key={tipo._id}>
              <td>{tipo.Nombre}</td>
              <td>{tipo.Descripcion}</td>
              <td>{new Date(tipo.FechaCre).toLocaleDateString()}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(tipo)}>
                  ✏️ Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(tipo._id)}>
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tipos;