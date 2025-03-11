// src/modules/orders/pages/CommandesPage.jsx
import React from 'react';
import CommandeList from '../components/CommandeList';

function CommandesPage() {
    return (
        <div className="commandes-page">
            <h1>Gestion de vos commandes</h1>
            <CommandeList />
        </div>
    );
}

export default CommandesPage;