import axios from "./axios";

export const getCarreras = async () => axios.get("/carreras");
export const getCarreraById = async (id_carrera) => axios.get("/carreras/" + id_carrera);
export const createCarrera = async (carrera) => axios.post(`/carreras`, carrera);
export const updateCarrera = async (id_carrera, carrera) => axios.put(`/carreras/` + id_carrera, carrera);

