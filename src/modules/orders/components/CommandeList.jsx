// src/modules/orders/components/CommandeList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import commandeApi from '../services/commandeApi';

function CommandeList() {
    const [commandes, setCommandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Récupérer les commandes de l'utilisateur au chargement
    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                setLoading(true);
                // Utiliser un ID utilisateur fixe pour le développement
                const userId = localStorage.getItem('userId') || '1';
                const data = await commandeApi.getUserCommandes(userId);
                setCommandes(data);
            } catch (err) {
                setError(err.message || 'Une erreur est survenue');
            } finally {
                setLoading(false);
            }
        };

        fetchCommandes();
    }, []);

    // Formater la date pour l'affichage
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div>Chargement des commandes...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="commandes-list">
            <h2>Mes Commandes</h2>

            {commandes.length === 0 ? (
                <div className="no-commandes">
                    <p>Vous n'avez pas encore de commandes.</p>
                    <Link to="/products">Découvrir nos produits</Link>
                </div>
            ) : (
                <div className="commandes-table">
                    <table>
                        <thead>
                        <tr>
                            <th>Référence</th>
                            <th>Date</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {commandes.map(commande => (
                            <tr key={commande.id}>
                                <td>{commande.reference}</td>
                                <td>{formatDate(commande.date)}</td>
                                <td>
                    <span className={`status status-${commande.statut.toLowerCase()}`}>
                      {commande.statut}
                    </span>
                                </td>
                                <td>
                                    <Link to={`/commandes/${commande.id}`}>
                                        Détails
                                    </Link>
                                    {commande.statut === 'CREEE' && (
                                        <button
                                            onClick={async () => {
                                                if (window.confirm('Êtes-vous sûr de vouloir annuler cette commande ?')) {
                                                    try {
                                                        await commandeApi.cancelCommande(commande.id);
                                                        // Mettre à jour la liste après annulation
                                                        setCommandes(commandes.map(c =>
                                                            c.id === commande.id ? {...c, statut: 'ANNULEE'} : c
                                                        ));
                                                    } catch (err) {
                                                        setError(err.message || 'Erreur lors de l\'annulation');
                                                    }
                                                }
                                            }}
                                        >
                                            Annuler
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CommandeList;