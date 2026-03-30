// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://peliculas-api1.onrender.com"
});

// ==================== GÉNERO ====================
export const getGeneros = () => API.get("/genero");
export const getGenero = (id) => API.get(`/genero/${id}`);
export const createGenero = (data) => API.post("/genero", data);
export const updateGenero = (id, data) => API.put(`/genero/${id}`, data);
export const deleteGenero = (id) => API.delete(`/genero/${id}`);

// ==================== DIRECTOR ====================
export const getDirectores = () => API.get("/director");
export const getDirector = (id) => API.get(`/director/${id}`);
export const createDirector = (data) => API.post("/director", data);
export const updateDirector = (id, data) => API.put(`/director/${id}`, data);
export const deleteDirector = (id) => API.delete(`/director/${id}`);

// ==================== PRODUCTORA ====================
export const getProductoras = () => API.get("/productora");
export const getProductora = (id) => API.get(`/productora/${id}`);
export const createProductora = (data) => API.post("/productora", data);
export const updateProductora = (id, data) => API.put(`/productora/${id}`, data);
export const deleteProductora = (id) => API.delete(`/productora/${id}`);

// ==================== TIPO ====================
export const getTipos = () => API.get("/tipo");
export const getTipo = (id) => API.get(`/tipo/${id}`);
export const createTipo = (data) => API.post("/tipo", data);
export const updateTipo = (id, data) => API.put(`/tipo/${id}`, data);
export const deleteTipo = (id) => API.delete(`/tipo/${id}`);

// ==================== MEDIA ====================
export const getMedias = () => API.get("/media");
export const getMedia = (id) => API.get(`/media/${id}`);
export const createMedia = (data) => API.post("/media", data);
export const updateMedia = (id, data) => API.put(`/media/${id}`, data);
export const deleteMedia = (id) => API.delete(`/media/${id}`);