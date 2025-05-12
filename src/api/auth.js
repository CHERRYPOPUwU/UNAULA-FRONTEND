import axios from './axios'

export const loginRequest = async (user) => axios.post(`/usuarios/login`, user, { withCredentials: true});

export const verifyTokenRequest = async (user) => axios.get('/verify');