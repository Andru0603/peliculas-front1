// src/components/Medias.js
import React, { useState, useEffect } from "react";
import {
  getMedias, createMedia, updateMedia, deleteMedia,
  getGeneros, getDirectores, getProductoras, getTipos
} from "../services/api";

const Medias = () => {
  const [medias, setMedias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({
    Serial: "",
    Titulo: "",
    Sinopsis: "",
    URL: "",
    Foto: "",
    AnoEstren: "",
    GeneroPrin: "",
    DirectorPrin: "",
    Productora: "",
    Tipo: ""
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cargarMedias();
    cargarSelects();
  }, []);

  const cargarMedias = async () => {
    try {
      const res = await getMedias();
      setMedias(res.data);
    } catch (error) {
      console.error("Error cargando medias:", error);
    }
  };

  const cargarSelects = async () => {
    try {
      const [gen, dir, prod, tip] = await Promise.all([
        getGeneros(),
        getDirectores(),
        getProductoras(),
        getTipos()
      ]);
      setGeneros(gen.data.filter((g) => g.Estado === "Activo"));
      setDirectores(dir.data.filter((d) => d.Estado === "Activo"));
      setProductoras(prod.data.filter((p) => p.Estado === "Activo"));
      setTipos(tip.data);
    } catch (error) {
      console.error("Error cargando selects:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateMedia(editId, form);
      } else {
        await createMedia(form);
      }
      setForm({
        Serial: "", Titulo: "", Sinopsis: "", URL: "",
        Foto: "", AnoEstren: "", GeneroPrin: "",
        DirectorPrin: "", Productora: "", Tipo: ""
      });
      setEditId(null);
      cargarMedias();
    } catch (error) {
      console.error("Error guardando media:", error);
    }
  };

  const handleEdit = (media) => {
    setForm({
      Serial: media.Serial,
      Titulo: media.Titulo,
      Sinopsis: media.Sinopsis,
      URL: media.URL,
      Foto: media.Foto,
      AnoEstren: media.AnoEstren,
      GeneroPrin: media.GeneroPrin?._id || "",
      DirectorPrin: media.DirectorPrin?._id || "",
      Productora: media.Productora?._id || "",
      Tipo: media.Tipo?._id || ""
    });
    setEditId(media._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta media?")) {
      try {
        await deleteMedia(id);
        cargarMedias();
      } catch (error) {
        console.error("Error eliminando media:", error);
      }
    }
  };

  const handleCancel = () => {
    setForm({
      Serial: "", Titulo: "", Sinopsis: "", URL: "",
      Foto: "", AnoEstren: "", GeneroPrin: "",
      DirectorPrin: "", Productora: "", Tipo: ""
    });
    setEditId(null);
  };

  const mediasFiltradas = medias.filter((m) =>
    m.Titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="module-container">
      <h2>🎬 Gestión de Media (Películas y Series)</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label>Serial:</label>
            <input type="text" name="Serial" value={form.Serial}
              onChange={handleChange} required placeholder="Ej: PEL-001" />
          </div>
          <div className="form-group">
            <label>Título:</label>
            <input type="text" name="Titulo" value={form.Titulo}
              onChange={handleChange} required placeholder="Título" />
          </div>
        </div>
        <div className="form-group">
          <label>Sinopsis:</label>
          <textarea name="Sinopsis" value={form.Sinopsis}
            onChange={handleChange} required placeholder="Sinopsis..." />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>URL:</label>
            <input type="text" name="URL" value={form.URL}
              onChange={handleChange} required placeholder="URL de la película" />
          </div>
          <div className="form-group">
            <label>Foto:</label>
            <input type="text" name="Foto" value={form.Foto}
              onChange={handleChange} required placeholder="URL de la imagen" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Año Estreno:</label>
            <input type="number" name="AnoEstren" value={form.AnoEstren}
              onChange={handleChange} required placeholder="2024" />
          </div>
          <div className="form-group">
            <label>Género:</label>
            <select name="GeneroPrin" value={form.GeneroPrin} onChange={handleChange}>
              <option value="">Seleccione...</option>
              {generos.map((g) => (
                <option key={g._id} value={g._id}>{g.Nombre}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Director:</label>
            <select name="DirectorPrin" value={form.DirectorPrin} onChange={handleChange}>
              <option value="">Seleccione...</option>
              {directores.map((d) => (
                <option key={d._id} value={d._id}>{d.Nombres}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Productora:</label>
            <select name="Productora" value={form.Productora} onChange={handleChange}>
              <option value="">Seleccione...</option>
              {productoras.map((p) => (
                <option key={p._id} value={p._id}>{p.NombresPro}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Tipo:</label>
          <select name="Tipo" value={form.Tipo} onChange={handleChange}>
            <option value="">Seleccione...</option>
            {tipos.map((t) => (
              <option key={t._id} value={t._id}>{t.Nombre}</option>
            ))}
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
        placeholder="🔍 Buscar por título..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <table className="data-table">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Título</th>
            <th>Año</th>
            <th>Género</th>
            <th>Director</th>
            <th>Productora</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mediasFiltradas.map((media) => (
            <tr key={media._id}>
              <td>{media.Serial}</td>
              <td>{media.Titulo}</td>
              <td>{media.AnoEstren}</td>
              <td>{media.GeneroPrin?.Nombre || "N/A"}</td>
              <td>{media.DirectorPrin?.Nombres || "N/A"}</td>
              <td>{media.Productora?.NombresPro || "N/A"}</td>
              <td>{media.Tipo?.Nombre || "N/A"}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(media)}>
                  ✏️ Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(media._id)}>
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

export default Medias;