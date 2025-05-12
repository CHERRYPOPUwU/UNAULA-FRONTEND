import axios from "./axios";

export const getUsersRequest = async () => axios.get("/proyectos");


export const createUserRequest = async (user) => axios.post("/user", user);


// export const updateTaskRequest = async (task) =>
//   axios.put(`/tasks/${task._id}`, task);

// export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

// export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);