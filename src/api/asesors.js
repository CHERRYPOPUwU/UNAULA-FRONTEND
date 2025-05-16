import axios from "./axios";

export const getAsesors = async () => axios.get("/asesores");
export const getAsesorsById = async (id_asesor) => axios.get("/asesores/" + id_asesor);
export const createAsesor = async (asesor) => axios.post(`/asesores`, asesor);
export const updateAsesor = async (id_asesor, asesor) => axios.put(`/asesores/` + id_asesor, asesor);

