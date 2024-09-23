const BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
    LOGIN: `${BASE_URL}/login`,
    REGISTER: `${BASE_URL}/register`,
    TODOS: `${BASE_URL}/todos`,
    GET_TODO: (id) => `${BASE_URL}/todos/${id}`,
    UPDATE_TODO: (id) => `${BASE_URL}/todos/${id}`,
    DELETE_TODO: (id) => `${BASE_URL}/todos/${id}`,
};