// src/components/Directores.js
import React, { useState, useEffect } from "react";
import { getDirectores, createDirector, updateDirector, deleteDirector } from "../services/api";

const Directores = () => {
  const [directores, setDirectores] = useState([]);
  const [form, setForm] = useState({
    Nombres: "",
    Estado: "Activo"
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cargarDirectores();
  }, []);

  const cargarDirectores = async () => {
    try {
      const res = await getDirectores();
      setDirectores(res.data);
    } catch (error) {
      console.error("Error cargando directores:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDirector(editId, form);
      } else {
        await createDirector(form);
      }
      setForm({ Nombres: "", Estado: "Activo" });
      setEditId(null);
      cargarDirectores();
    } catch (error) {
      console.error("Error guardando director:", error);
    }
  };

  const handleEdit = (director) => {
    setForm({
      Nombres: director.Nombres,
      Estado: director.Estado
    });
    setEditId(director._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este director?")) {
      try {
        await deleteDirector(id);
        cargarDirectores();
      } catch (error) {
        console.error("Error eliminando director:", error);
      }
    }
  };

  const handleCancel = () => {
    setForm({ Nombres: "", Estado: "Activo" });
    setEditId(null);
  };

  const directoresFiltrados = directores.filter((d) =>
    d.Nombres.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="module-container">
      <h2>🎬 Gestión de Directores</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Nombres:</label>
          <input
            type="text"
            name="Nombres"
            value={form.Nombres}
            onChange={handleChange}
            required
            placeholder="Nombre del director"
          />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <select name="Estado" value={form.Estado} onChange={handleChange}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
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
            <th>Nombres</th>
            <th>Estado</th>
            <th>Fecha Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directoresFiltrados.map((director) => (
            <tr key={director._id}>
              <td>{director.Nombres}</td>
              <td>
                <span className={`estado ${director.Estado.toLowerCase()}`}>
                  {director.Estado}
                </span>
              </td>
              <td>{new Date(director.FechaCre).toLocaleDateString()}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(director)}>
                  ✏️ Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(director._id)}>
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

export default Directores;