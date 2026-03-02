const db= require('../config/db');


const createCommande = async({ Total, Statut_commande='En cours', Mode_paiement, ID_client, ID_employe, ID_boutique }) =>
{
    const [result] = await db.query(
        "insert into commande (Total, Statut_commande, Mode_paiement, Date_commande, Date_modification, ID_client, ID_employe, ID_boutique) values(?, ?, ?, NOW(), NOW(), ?, ?, ?)",
        [Total, Statut_commande, Mode_paiement, ID_client, ID_employe, ID_boutique]
    );

    const ID_commande = result.insertId; // 🔥 récupérer l'ID généré

    // Générer automatiquement Reference_commande
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
    }
};

//Avoir toutes les commandes pour adminstrateur
const getAllCommandes = async() =>
{
    const [rows] = await db.query("select * from commande");
    return rows
};

//Avoir une seule commande
const getCommandeByID = async(id) =>
{
    const [rows] = await db.query("select * from commande where ID_commande=?", [id]);
    return rows[0];
}
//Avoir les commandes d'un clients
const getCommandesClient = async(id) =>
{
    const [rows] = await db.query("select * from commande where ID_client=?", [id]);
    return rows;
};
//Avoir les commandes d'une boutique
const getCommandeByBoutique = async(id) =>
{
    const [rows] = await db.query("select * from commande where ID_boutique=?", [id]);
    return rows;
}
//Avoir les commandes gerés par un employé
const getCommandeByEmploye = async(id) =>
{
    const [rows] = await db.query("select * from commande where ID_employe=?", [id]);
    return rows;
};

//editer une commande
const updateCommande = async(id, { Total, Statut_commande, Mode_paiement, ID_client, ID_employe, ID_boutique }) =>
{
    const [result] = await db.query("update commande set Total=?, Statut_commande=?, Mode_paiement=?, Date_modification=NOW(), ID_client=?, ID_employe=?, ID_boutique=? where ID_commande= ?", 
        [Total, Statut_commande, Mode_paiement, ID_client, ID_employe, ID_boutique, id]
    );
    return{ID_commande:id, Total, Statut_commande, Mode_paiement, ID_client, ID_employe, ID_boutique}; 
    
};

//Supprimer une commande
const deleteCommande = async(id) =>
{
    await db.query("delete from commande where ID_commande=?", [id]);
    return {message: "Commande supprime avec succés", ID_commande: id};
};

//Exporter les fonctions
module.exports = 
{
    createCommande,
    getAllCommandes,
    getCommandeByBoutique,
    getCommandeByEmploye,
    getCommandeByID,
    getCommandesClient,
    updateCommande,
    deleteCommande
}