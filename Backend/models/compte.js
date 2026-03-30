const db = require('../config/db');


// Créer un compte
const createCompte = async (Email, Mot_de_passe, ID_role) => {
    const [result] = await db.query(
        "INSERT INTO compte (Email, Mot_de_passe, ID_role) VALUES (?, ?, ?)",
        [Email, Mot_de_passe, ID_role]
    );

    return {
        ID_compte: result.insertId,
        Email,
        ID_role
    };
};


// Tous les comptes + nom du rôle
const getAllComptes = async () => {
    const [rows] = await db.query(`
        SELECT 
            c.ID_compte,
            c.Email,
            r.ID_role,
            r.Nom_role
        FROM compte c
        JOIN role r ON c.ID_role = r.ID_role
    `);
    return rows;
};


// Un seul compte + nom du rôle
const getCompteByID = async (id) => {
    const [rows] = await db.query(`
        SELECT 
            c.ID_compte,
            c.Email,
            r.ID_role,
            r.Nom_role
        FROM compte c
        JOIN role r ON c.ID_role = r.ID_role
        WHERE c.ID_compte = ?
    `, [id]);

    return rows[0];
};


// Modifier un compte
const updateCompte = async (id, Email, Mot_de_passe, ID_role) => {
    await db.query(
        "UPDATE compte SET Email = ?, Mot_de_passe = ?, ID_role = ? WHERE ID_compte = ?",
        [Email, Mot_de_passe, ID_role, id]
    );

    return {
        ID_compte: id,
        Email,
        ID_role
    };
};


// Supprimer un compte
const deleteCompte = async (id) => {
    const compte = await getCompteByID(id);
    if (!compte) {
        return null;
    }

    await db.query(
        "DELETE FROM compte WHERE ID_compte = ?",
        [id]
    );

    return {
        message: "Compte supprimé avec succès",
        ID_compte: id
    };
};


// Éviter les doublons email
const getCompteByEmail = async (Email) => {
    const [rows] = await db.query(`
        SELECT 
            c.ID_compte,
            c.Email,
            c.Mot_de_passe,
            r.ID_role,
            r.Nom_role
        FROM compte c
        JOIN role r ON c.ID_role = r.ID_role
        WHERE c.Email = ?
    `, [Email]);

    return rows[0];
};



// Export
module.exports = {
    createCompte,
    getAllComptes,
    getCompteByID,
    updateCompte,
    deleteCompte,
    getCompteByEmail
};
