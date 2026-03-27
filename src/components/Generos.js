// src/components/Generos.js
import React, { useState, useEffect } from "react";
import { getGeneros, createGenero, updateGenero, deleteGenero } from "../services/api";

const Generos = () => {
  const [generos, setGeneros] = useState([]);
  const [form, setForm] = useState({
    Nombre: "",
    Estado: "Activo",
    Descripcion: ""
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // Cargar géneros al inicio
  useEffect(() => {
    cargarGeneros();
  }, []);

  const cargarGeneros = async () => {
    try {
      const res = await getGeneros();
      setGeneros(res.data);
    } catch (error) {
      console.error("Error cargando géneros:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateGenero(editId, form);
      } else {
        await createGenero(form);
      }
      setForm({ Nombre: "", Estado: "Activo", Descripcion: "" });
      setEditId(null);
      cargarGeneros();
    } catch (error) {
      console.error("Error guardando género:", error);
    }
  };

  const handleEdit = (genero) => {
    setForm({
      Nombre: genero.Nombre,
      Estado: genero.Estado,
      Descripcion: genero.Descripcion || ""
    });
    setEditId(genero._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este género?")) {
      try {
        await deleteGenero(id);
        cargarGeneros();
      } catch (error) {
        console.error("Error eliminando género:", error);
      }
    }
  };

  const handleCancel = () => {
    setForm({ Nombre: "", Estado: "Activo", Descripcion: "" });
    setEditId(null);
  };

  const generosFiltrados = generos.filter((g) =>
    g.Nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="module-container">
      <h2>🎭 Gestión de Géneros</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="Nombre"
            value={form.Nombre}
            onChange={handleChange}
            required
            placeholder="Nombre del género"
          />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <select name="Estado" value={form.Estado} onChange={handleChange}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            name="Descripcion"
            value={form.Descripcion}
            onChange={handleChange}
            placeholder="Descripción del género"
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

      {/* Buscador */}
      <input
        type="text"
        placeholder="🔍 Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Tabla */}
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Fecha Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generosFiltrados.map((genero) => (
            <tr key={genero._id}>
              <td>{genero.Nombre}</td>
              <td>
                <span className={`estado ${genero.Estado.toLowerCase()}`}>
                  {genero.Estado}
                </span>
              </td>
              <td>{genero.Descripcion}</td>
              <td>{new Date(genero.FechaCre).toLocaleDateString()}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(genero)}>
                  ✏️ Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(genero._id)}>
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

export default Generos;