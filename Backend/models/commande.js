const db = require('../config/db');

// -------------------
// Créer une commande
// -------------------
const createCommande = async ({ Total, Statut_commande = 'En cours', Mode_paiement, ID_client, ID_employe, ID_boutique }) => {
    const [result] = await db.query(
        "INSERT INTO commande (Total, Statut_commande, Mode_paiement, Date_commande, Date_modification, ID_client, ID_employe, ID_boutique) VALUES (?, ?, ?, NOW(), NOW(), ?, ?, ?)",
        [Total, Statut_commande, Mode_paiement, ID_client, ID_employe, ID_boutique]
    );

    const ID_commande = result.insertId;

    // 🔥 Génération référence
    const annee = new Date().getFullYear();
    const Reference_commande = `CMD-${annee}-${String(ID_commande).padStart(5, '0')}`;

    await db.query(
        "UPDATE commande SET Reference_commande = ? WHERE ID_commande = ?",
        [Reference_commande, ID_commande]
    );

    return {
        ID_commande,
        Reference_commande,
        Total,
        Statut_commande,
        Mode_paiement,
        Date_commande: new Date(),
        Date_modification: new Date(),
        ID_boutique,
        ID_employe,
        ID_client
    };
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