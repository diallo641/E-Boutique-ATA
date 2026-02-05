const db = require('../config/db');

//creer un compte
const createCompte = async(Email, Mot_de_passe, ID_role) =>
{
    const [result] = await db.query("INSERT INTO compte (Email, Mot_de_passe, ID_role) VALUES (?, ?, ?)", [Email, Mot_de_passe, ID_role]);
    return {insertId: result.insertId, Email: Email, ID_role: ID_role};
};

//Tous les comptes
const getAllComptes = async()=>
{
    const [rows] = await db.query("SELECT * FROM compte");
    return rows;
}

//Recuperer un seul compte
const getCompteByID = async(id) =>
{
    const [rows] = await db.query("SELECT * FROM compte WHERE ID_compte = ?", [id]);
    return rows[0];
}

//Modifier un compte
const updateCompte = async(id, Email, Mot_de_passe, ID_role) =>
{
    await db.query("UPDATE compte SET Email = ?, Mot_de_passe = ?, ID_role = ? WHERE ID_compte = ?", [Email, Mot_de_passe, ID_role, id]);
    return {ID_compte: id, Email: Email, ID_role: ID_role};
}

//supprimer un compte
const deleteCompte=async(id) =>
{
    const compte = await gerCompteByID(id);
    if (!compte) {
        return null; // Compte non trouvé
    }
    await db.query("DELETE FROM compte WHERE ID_compte = ?", [id]);
    return {message: "Compte supprimé avec succès", ID_compte: id};
}

//Eviter les doublons sur l'email
const getCompteByEmail = async(Email) =>
{
    const [rows] = await db.query("SELECT * FROM compte WHERE Email = ?", [Email]);
    return rows[0];
}

//Exporter les fonctions
module.exports = {
    createCompte,   
    getAllComptes,
    getCompteByID,
    updateCompte,
    deleteCompte,
    getCompteByEmail
};