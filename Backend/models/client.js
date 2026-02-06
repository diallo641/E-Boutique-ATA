const db = require('../config/db');

// Créer un client
const createClient = async (Nom, Adresse, Telephone, ID_compte) => {
    const [result] = await db.query(
        "INSERT INTO client (Nom, Adresse, Telephone, ID_compte) VALUES (?, ?, ?, ?)", 
        [Nom, Adresse, Telephone, ID_compte]
    );
    return { insertId: result.insertId, 
             Nom, Adresse, Telephone, ID_compte };
};

//Tous les clients
const getAllClients = async () => {
    const [rows] = await db.query("SELECT * FROM client");
    return rows;
};

//un client 
const getClientByID = async (id) => {
    const [rows] = await db.query("SELECT * FROM client WHERE ID_client = ?", [id]);
    return rows[0];
};

//editer un client
const updateClient = async (id, Nom, Adresse, Telephone, ID_compte) => {
    await db.query(
        "UPDATE client SET Nom = ?, Adresse = ?, Telephone = ?, ID_compte = ? WHERE ID_client = ?", 
        [Nom, Adresse, Telephone, ID_compte, id]
    );
    return { ID_client: id, Nom, Adresse, Telephone, ID_compte };
};

// Supprimer un client
const deleteClient = async (id) => {
    const client = await getClientByID(id);
    if (!client) return null;
    await db.query("DELETE FROM client WHERE ID_client = ?", [id]);
    return { message: "Client supprimé avec succès", ID_client: id };
};

// Vérifier si un client existe via l'ID_compte
const getClientByCompteID = async (ID_compte) => {
    const [rows] = await db.query("SELECT * FROM client WHERE ID_compte = ?", [ID_compte]);
    return rows[0];
};

//Pour avoir un numero de telephone unique
const getClientByTelephone = async (telephone) => {
    const [rows] = await db.query(
        `SELECT * FROM client WHERE Telephone = ?`,
        [telephone]
    );
    return rows[0];
};

// Exporter les fonctions
module.exports = {
    createClient,
    getAllClients,
    getClientByID,
    updateClient,
    deleteClient,
    getClientByCompteID,
    getClientByTelephone 
};
