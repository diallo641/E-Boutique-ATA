const db = require('../config/db');

// Creer un employé de la boite (sans Email)
const createEmploye = async (Nom, Prenom, Adresse, Telephone, ID_compte, ID_boutique, ID_manager) =>
{
    const [result] = await db.query(
        "INSERT INTO employe (Nom, Prenom, Adresse, Telephone, ID_compte, ID_boutique, ID_manager) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [Nom, Prenom, Adresse, Telephone, ID_compte, ID_boutique, ID_manager]
    );

    return {
        ID_employe: result.insertId,
        Nom,
        Prenom,
        Adresse,
        Telephone,
        ID_compte,
        ID_boutique,
        ID_manager
    };
};

// Tous les employés
const getAllEmployes = async () =>
{
    const [rows] = await db.query("SELECT * FROM employe");
    return rows;
};

// Un employé
const getEmployeByID = async (id) =>
{
    const [rows] = await db.query(
        "SELECT * FROM employe WHERE ID_employe = ?",
        [id]
    );
    return rows[0];
};

// Modifier un employé (sans Email)
const updateEmploye = async (id, Nom, Prenom, Adresse, Telephone, ID_boutique, ID_manager) =>
{
    const [result] = await db.query(
        "UPDATE employe SET Nom = ?, Prenom = ?, Adresse = ?, Telephone = ?, ID_boutique = ?, ID_manager = ? WHERE ID_employe = ?",
        [Nom, Prenom, Adresse, Telephone, ID_boutique, ID_manager, id]
    );

    return {
        ID_employe: id,
        Nom,
        Prenom,
        Adresse,
        Telephone,
        ID_boutique,
        ID_manager
    };
};

// Supprimer un employé
const deleteEmploye = async (id, id_compte) => {
    // 🔥 supprimer employé
    await db.query(
        "DELETE FROM employe WHERE ID_employe = ?",
        [id]
    );

    // 🔥 supprimer compte lié
    if (id_compte) {
        await db.query(
            "DELETE FROM compte WHERE ID_compte = ?",
            [id_compte]
        );
    }

    return {
        message: "Employé supprimé avec succès",
        ID_employe: id
    };
};

// Les employés d'une boutique
const getEmployesByBoutiqueID = async (ID_boutique) =>
{
    const [rows] = await db.query(
        "SELECT * FROM employe WHERE ID_boutique = ?",
        [ID_boutique]
    );
    return rows;
};

// Les employés d'un manager
const getEmployesByManagerID = async (ID_manager) =>
{
    const [rows] = await db.query(
        "SELECT * FROM employe WHERE ID_manager = ?",
        [ID_manager]
    );
    return rows;
};

// Vérifier téléphone unique
const getEmployeByTelephone = async (Telephone) =>
{
    const [rows] = await db.query(
        "SELECT * FROM employe WHERE Telephone = ?",
        [Telephone]
    );
    return rows[0];
};


const getEmployeByCompteID = async (ID_compte) => {
    const [rows] = await db.query(
        "SELECT * FROM employe WHERE ID_compte = ?",
        [ID_compte]
    );

    return rows[0] || null;
};





// Exporter les fonctions
module.exports =
{
    createEmploye,
    getAllEmployes,
    getEmployeByID,
    updateEmploye,
    deleteEmploye,
    getEmployesByBoutiqueID,
    getEmployesByManagerID,
    getEmployeByTelephone,
    getEmployeByCompteID

};