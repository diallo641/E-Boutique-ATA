const db = require('../config/db');

// Ajouter un produit à une commande
const ajouterDetail = async({ ID_commande, ID_produit, Prix, Quantite }) => {
    const [result] = await db.query(
        "insert into details_commande (ID_commande, ID_produit, Prix, Quantite) VALUES (?, ?, ?, ?)",
        [ID_commande, ID_produit, Prix, Quantite]
    );
    return { ID_commande, ID_produit, Prix, Quantite };
};

// Lister les détails d'une commande
const getDetailsByCommande = async(ID_commande) => {
    const [rows] = await db.query(
        "select * from details_commande WHERE ID_commande = ?",
        [ID_commande]
    );
    return rows;
};

//Detail d'une commande
const detailcommande = async (ID_commande, ID_produit) => {
    const [rows] = await db.query(
        "SELECT * FROM details_commande WHERE ID_commande = ? AND ID_produit = ?",
        [ID_commande, ID_produit]
    );
    return rows[0];
};

// Calculer le total d'une commande
const calculerTotalCommande = async(ID_commande) => {
    const [rows] = await db.query(
        "select  SUM(Prix * Quantite) AS Total FROM details_commande WHERE ID_commande = ?",
        [ID_commande]
    );
    return rows[0].Total || 0;
};

//Modifier
const updateDetail = async({ ID_commande, ID_produit, Prix, Quantite }) => {
    await db.query(
        "update details_commande SET Prix = ?, Quantite = ? WHERE ID_commande = ? AND ID_produit = ?",
        [Prix, Quantite, ID_commande, ID_produit]
    );
    return { ID_commande, ID_produit, Prix, Quantite };
};

// Supprimer un produit d'une commande
const supprimerDetail = async(ID_commande, ID_produit) => {
    await db.query(
        "delete from details_commande WHERE ID_commande = ? AND ID_produit = ?",
        [ID_commande, ID_produit]
    );
    return { message: "Produit supprimé de la commande", ID_commande, ID_produit };
};

module.exports = {
    ajouterDetail,
    getDetailsByCommande,
    detailcommande,
    updateDetail,
    calculerTotalCommande,
    supprimerDetail
};