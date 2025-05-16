import axios from "./axios";

export const getEstudiantes = async () => axios.get("/estudiantes");
export const getEstudianteById = async (id_estudiante) => axios.get("/estudiantes/" + id_estudiante);
export const createEstudiante = async (estudiante) => axios.post(`/estudiantes`, estudiante);
export const updateEstudiante = async (id_estudiante, estudiante) => axios.put(`/estudiantes/` + id_estudiante, estudiante);

