import axios from "./axios";

export const getInformeById = async (id_proyecto) => axios.get("/informes/proyectos/" + id_proyecto, {
    responseType: 'blob',
  });

