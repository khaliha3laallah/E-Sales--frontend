// src/modules/orders/components/LivraisonTracker.jsx
import React from 'react';

function LivraisonTracker({ livraison }) {
    // Définir les états possibles de livraison dans l'ordre
    const etapes = ['PREPAREE', 'EXPEDIEE', 'LIVREE'];

    // Déterminer l'étape actuelle
    const etapeActuelle = etapes.indexOf(livraison.statut);

    return (
        <div className="livraison-tracker">
            <h4>Suivi de votre commande</h4>

            <div className="tracker-steps">
                {etapes.map((etape, index) => (
                    <div
                        key={etape}
                        className={`tracker-step ${index <= etapeActuelle ? 'active' : ''}`}
                    >
                        <div className="step-indicator">{index + 1}</div>
                        <div className="step-label">{
                            etape === 'PREPAREE' ? 'Préparation' :
                                etape === 'EXPEDIEE' ? 'Expédition' : 'Livraison'
                        }</div>
                    </div>
                ))}

                {/* Lignes de connexion entre les étapes */}
                <div className="tracker-lines">
                    {etapes.slice(0, -1).map((_, index) => (
                        <div
                            key={index}
                            className={`tracker-line ${index < etapeActuelle ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>

            {livraison.numeroSuivi && (
                <div className="tracking-info">
                    <p>Suivez votre colis avec le numéro: <strong>{livraison.numeroSuivi}</strong></p>
                    {/* Ici vous pourriez ajouter un lien vers un service de suivi de colis */}
                </div>
            )}
        </div>
    );
}

export default LivraisonTracker;