const db = require('../config/db');


// Créer un manager
const createManager = async (Nom, Prenom, Adresse, Telephone, ID_compte, ID_boutique) => {
    const [result] = await db.query(
        "insert into manager (Nom, Prenom, Adresse, Telephone, ID_compte, ID_boutique) VALUES (?, ?, ?, ?, ?, ?)",
        [Nom, Prenom, Adresse, Telephone, ID_compte, ID_boutique]
    );
    return { ID_manager: result.insertId, Nom, Prenom, Adresse, Telephone, ID_compte, ID_boutique };
};


// Liste de tous les managers
const getAllManagers = async () => {
    const [rows] = await db.query("select * from manager");
    return rows;
};


// Récupérer un manager par ID
const getManagerByID = async (id) => {
    const [rows] = await db.query("select * from manager where ID_manager = ?", [id]);
    return rows[0];
};


// Modifier un manager
const updateManager = async (id, Nom, Prenom, Adresse, Telephone, ID_boutique) => {
    const [result] = await db.query(
        "update  manager set Nom = ?, Prenom = ?, Adresse = ?, Telephone = ?, ID_boutique = ? WHERE ID_manager = ?",
        [Nom, Prenom, Adresse, Telephone, ID_boutique, id]
    );
    return { ID_manager: id, Nom, Prenom, Adresse, Telephone, ID_boutique };
};


// Supprimer un manager
const deleteManager = async (id) => {
    await db.query("delete from manager where ID_manager = ?", [id]);
    return { message: "Manager supprimé avec succès", ID_manager: id };
};


// Vérifier numéro de téléphone unique
const getManagerByTelephone = async (Telephone) => {
    const [rows] = await db.query("select * from manager where Telephone = ?", [Telephone]);
    return rows[0];
};


// récupérer les employés dirigés par un manager
const getEmployesByManagerID = async (id) => {
    const [rows] = await db.query(
        "select * from manager WHERE ID_manager = ?",
        [id]
    );
    return rows;
};

// managerModel.js
// Récupérer un manager par ID_compte
const getManagerByCompteID = async (ID_compte) => {
    const [rows] = await db.execute(
        "SELECT * FROM manager WHERE ID_compte = ?",
        [ID_compte]
    );
    return rows[0]; // retourne le manager correspondant
};



// Exporter les fonctions
module.exports = {
    createManager,
    getAllManagers,
    getManagerByID,
    updateManager,
    deleteManager,
    getManagerByTelephone,
    getEmployesByManagerID,
    getManagerByCompteID
};