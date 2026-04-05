import axios from 'axios';

// Mock de autenticação para o painel administrativo
const FAKE_SESSION_USER_ID = "us-uuid-12345-abcdef";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
    timeout: 15000,
});

api.interceptors.request.use(config => {
    // Injeta o ID do usuário nas rotas administrativas
    if (config.url.includes('/admin')) {
        config.headers['x-user-id'] = FAKE_SESSION_USER_ID;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
