// src/components/Productoras.js
import React, { useState, useEffect } from "react";
import { getProductoras, createProductora, updateProductora, deleteProductora } from "../services/api";

const Productoras = () => {
  const [productoras, setProductoras] = useState([]);
  const [form, setForm] = useState({
    NombresPro: "",
    Estado: "Activo",
    Eslogan: "",
    Descripcion: ""
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cargarProductoras();
  }, []);

  const cargarProductoras = async () => {
    try {
      const res = await getProductoras();
      setProductoras(res.data);
    } catch (error) {
      console.error("Error cargando productoras:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateProductora(editId, form);
      } else {
        await createProductora(form);
      }
      setForm({ NombresPro: "", Estado: "Activo", Eslogan: "", Descripcion: "" });
      setEditId(null);
      cargarProductoras();
    } catch (error) {
      console.error("Error guardando productora:", error);
    }
  };

  const handleEdit = (productora) => {
    setForm({
      NombresPro: productora.NombresPro,
      Estado: productora.Estado,
      Eslogan: productora.Eslogan,
      Descripcion: productora.Descripcion || ""
    });
    setEditId(productora._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta productora?")) {
      try {
        await deleteProductora(id);
        cargarProductoras();
      } catch (error) {
        console.error("Error eliminando productora:", error);
      }
    }
  };

  const handleCancel = () => {
    setForm({ NombresPro: "", Estado: "Activo", Eslogan: "", Descripcion: "" });
    setEditId(null);
  };

  const productorasFiltradas = productoras.filter((p) =>
    p.NombresPro.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="module-container">
      <h2>🏢 Gestión de Productoras</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="NombresPro"
            value={form.NombresPro}
            onChange={handleChange}
            required
            placeholder="Nombre de la productora"
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
          <label>Eslogan:</label>
          <input
            type="text"
            name="Eslogan"
            value={form.Eslogan}
            onChange={handleChange}
            required
            placeholder="Eslogan de la productora"
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            name="Descripcion"
            value={form.Descripcion}
            onChange={handleChange}
            placeholder="Descripción de la productora"
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
            <th>Estado</th>
            <th>Eslogan</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productorasFiltradas.map((productora) => (
            <tr key={productora._id}>
              <td>{productora.NombresPro}</td>
              <td>
                <span className={`estado ${productora.Estado.toLowerCase()}`}>
                  {productora.Estado}
                </span>
              </td>
              <td>{productora.Eslogan}</td>
              <td>{productora.Descripcion}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(productora)}>
                  ✏️ Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(productora._id)}>
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

export default Productoras;