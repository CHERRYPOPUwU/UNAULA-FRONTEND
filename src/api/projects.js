import axios from "./axios";

export const getProjects = async () => axios.get("/proyectos");

export const createProject = async (project) => axios.post(`/proyectos`, project);

export const getProjectById = async (id_project) => axios.get(`/proyectos/` + id_project);

export const updateProject = async (id_project, project) => axios.put(`/proyectos/` + id_project, project);
