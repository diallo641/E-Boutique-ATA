const db = require('../config/db');

// -------------------
// Créer une commande
// -------------------
const createCommande = async (data) => {
    const {
        Total,
        Statut_commande = 'En attente',
        Mode_paiement,
        ID_client,
        ID_employe = null,
        ID_boutique
    } = data;

    // 🔥 force sécurité des types
    const values = [
        Number(Total),
        Statut_commande,
        Mode_paiement,
        Number(ID_client),
        ID_employe ? Number(ID_employe) : null,
        Number(ID_boutique)
    ];

    const [result] = await db.query(
        `INSERT INTO commande 
        (Total, Statut_commande, Mode_paiement, ID_client, ID_employe, ID_boutique, Date_commande, Date_modification)
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        values
    );

    const ID_commande = result.insertId;

    const annee = new Date().getFullYear();
    const Reference_commande = `CMD-${annee}-${String(ID_commande).padStart(5, '0')}`;

    await db.query(
        "UPDATE commande SET Reference_commande = ? WHERE ID_commande = ?",
        [Reference_commande, ID_commande]
    );

    const [rows] = await db.query(
        "SELECT * FROM commande WHERE ID_commande = ?",
        [ID_commande]
    );

    return rows[0];
};


// -------------------
// ADMIN
// -------------------
const getAllCommandes = async () => {
    const [rows] = await db.query("SELECT * FROM commande");
    return rows;
};

// -------------------
// PAR ID
// -------------------
const getCommandeByID = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM commande WHERE ID_commande = ?",
        [id]
    );
    return rows[0];
};

// -------------------
// CLIENT
// -------------------
const getCommandesByClientID = async (ID_client) => {
    const [rows] = await db.query(
        "SELECT * FROM commande WHERE ID_client = ?",
        [ID_client]
    );
    return rows;
};

// -------------------
// BOUTIQUE (Manager / Employé)
// -------------------
const getCommandesByBoutiqueID = async (ID_boutique) => {
    const [rows] = await db.query(
        "SELECT * FROM commande WHERE ID_boutique = ?",
        [ID_boutique]
    );
    return rows;
};

// -------------------
// EMPLOYÉ
// -------------------
const getCommandesByEmployeID = async (ID_employe) => {
    const [rows] = await db.query(
        "SELECT * FROM commande WHERE ID_employe = ?",
        [ID_employe]
    );
    return rows;
};

// -------------------
// UPDATE
// -------------------
const updateCommande = async ({ id, Total, Statut_commande, Mode_paiement, ID_client, ID_employe, ID_boutique }) => {
    await db.query(
        "UPDATE commande SET Total=?, Statut_commande=?, Mode_paiement=?, Date_modification=NOW(), ID_client=?, ID_employe=?, ID_boutique=? WHERE ID_commande=?",
        [Total, Statut_commande, Mode_paiement, ID_client, ID_employe, ID_boutique, id]
    );

    return {
        ID_commande: id,
        Total,
        Statut_commande,
        Mode_paiement,
        ID_client,
        ID_employe,
        ID_boutique
    };
};

// -------------------
// DELETE
// -------------------
const deleteCommande = async (id) => {
    await db.query(
        "DELETE FROM commande WHERE ID_commande = ?",
        [id]
    );

    return {
        message: "Commande supprimée avec succès",
        ID_commande: id
    };
};

// -------------------
module.exports = {
    createCommande,
    getAllCommandes,
    getCommandeByID,
    getCommandesByClientID,
    getCommandesByBoutiqueID,
    getCommandesByEmployeID,
    updateCommande,
    deleteCommande
};