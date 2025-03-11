// src/modules/orders/services/commandeApi.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api';

// Configuration de base axios avec intercepteurs
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Ajout d'un intercepteur pour inclure l'ID utilisateur
apiClient.interceptors.request.use(
    (config) => {
        // Pour simuler un utilisateur connecté
        config.headers['X-User-Id'] = localStorage.getItem('userId') || '1';
        return config;
    },
    (error) => Promise.reject(error)
);

const commandeApi = {
    // Récupérer les commandes d'un utilisateur
    getUserCommandes: async (userId) => {
        try {
            const response = await apiClient.get(`/commandes/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des commandes:", error);
            throw error;
        }
    },

    // Récupérer une commande par son ID
    getCommandeById: async (id) => {
        try {
            const response = await apiClient.get(`/commandes/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de la récupération de la commande ${id}:`, error);
            throw error;
        }
    },

    // Créer une nouvelle commande
    createCommande: async (commandeData) => {
        try {
            const response = await apiClient.post('/commandes', commandeData);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la création de la commande:", error);
            throw error;
        }
    },

    // Annuler une commande
    cancelCommande: async (id) => {
        try {
            const response = await apiClient.post(`/commandes/${id}/cancel`);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de l'annulation de la commande ${id}:`, error);
            throw error;
        }
    },

    // Mettre à jour le statut d'une commande
    updateCommandeStatus: async (id, status) => {
        try {
            const response = await apiClient.put(`/commandes/${id}/status?status=${status}`);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de la mise à jour du statut de la commande ${id}:`, error);
            throw error;
        }
    }
};

export default commandeApi;