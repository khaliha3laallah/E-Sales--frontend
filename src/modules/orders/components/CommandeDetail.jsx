// src/modules/orders/components/CommandeDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import commandeApi from '../services/commandeApi';
import LivraisonTracker from './LivraisonTracker';

function CommandeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [commande, setCommande] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCommande = async () => {
            try {
                setLoading(true);
                const data = await commandeApi.getCommandeById(id);
                setCommande(data);
            } catch (err) {
                setError(err.message || 'Une erreur est survenue');
            } finally {
                setLoading(false);
            }
        };

        fetchCommande();
    }, [id]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (montant) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(montant);
    };

    const handleCancelCommande = async () => {
        if (!window.confirm('Êtes-vous sûr de vouloir annuler cette commande ?')) return;

        try {
            const updatedCommande = await commandeApi.cancelCommande(id);
            setCommande(updatedCommande);
        } catch (err) {
            setError(err.message || 'Erreur lors de l\'annulation');
        }
    };

    if (loading) return <div>Chargement des détails de la commande...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!commande) return <div>Commande introuvable</div>;

    // Calculer le total de la commande
    const total = commande.items.reduce((sum, item) => sum + (item.prix * item.quantite), 0);

    return (
        <div className="commande-detail">
            <button onClick={() => navigate(-1)}>&larr; Retour</button>

            <h2>Détails de la commande #{commande.reference}</h2>

            <div className="commande-info">
                <p><strong>Date:</strong> {formatDate(commande.date)}</p>
                <p>
                    <strong>Statut:</strong>
                    <span className={`status status-${commande.statut.toLowerCase()}`}>
            {commande.statut}
          </span>
                </p>

                {commande.statut === 'CREEE' && (
                    <button onClick={handleCancelCommande} className="cancel-btn">
                        Annuler la commande
                    </button>
                )}
            </div>

            <div className="commande-items">
                <h3>Articles</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Quantité</th>
                        <th>Prix unitaire</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {commande.items.map(item => (
                        <tr key={item.id}>
                            <td>Produit #{item.produitId}</td>
                            <td>{item.quantite}</td>
                            <td>{formatCurrency(item.prix)}</td>
                            <td>{formatCurrency(item.prix * item.quantite)}</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="3"><strong>Total</strong></td>
                        <td><strong>{formatCurrency(total)}</strong></td>
                    </tr>
                    </tfoot>
                </table>
            </div>

            {commande.livraison && (
                <div className="livraison-info">
                    <h3>Informations de livraison</h3>
                    <p><strong>Statut:</strong> {commande.livraison.statut}</p>
                    {commande.livraison.numeroSuivi && (
                        <p><strong>Numéro de suivi:</strong> {commande.livraison.numeroSuivi}</p>
                    )}

                    <LivraisonTracker livraison={commande.livraison} />
                </div>
            )}
        </div>
    );
}

export default CommandeDetail;