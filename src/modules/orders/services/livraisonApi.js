// src/modules/orders/services/livraisonApi.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        config.headers['X-User-Id'] = localStorage.getItem('userId') || '1';
        return config;
    },
    (error) => Promise.reject(error)
);

const livraisonApi = {
    // Récupérer une livraison par son ID de commande
    getLivraisonByCommandeId: async (commandeId) => {
        try {
            const response = await apiClient.get(`/livraisons/commande/${commandeId}`);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de la récupération de la livraison pour la commande ${commandeId}:`, error);
            throw error;
        }
    },

    // Mettre à jour le statut d'une livraison
    updateLivraisonStatus: async (id, status) => {
        try {
            const response = await apiClient.put(`/livraisons/${id}/status?status=${status}`);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de la mise à jour du statut de la livraison ${id}:`, error);
            throw error;
        }
    },

    // Ajouter un numéro de suivi
    addNumeroSuivi: async (id, numeroSuivi) => {
        try {
            const response = await apiClient.put(`/livraisons/${id}/numero-suivi?numeroSuivi=${numeroSuivi}`);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de l'ajout du numéro de suivi pour la livraison ${id}:`, error);
            throw error;
        }
    }
};

export default livraisonApi;