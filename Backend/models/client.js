const db = require('../config/db');

// Créer un client
const createClient = async (Nom, Adresse, Telephone, ID_compte) => {
    const [result] = await db.query(
        "INSERT INTO client (Nom, Adresse, Telephone, ID_compte) VALUES (?, ?, ?, ?)", 
        [Nom, Adresse, Telephone, ID_compte]
    );

    return { 
        ID_client: result.insertId,
        Nom, 
        Adresse, 
        Telephone, 
        ID_compte 
    };
};


//Tous les clients (réservé admin)
const getAllClients = async () => {
    const [rows] = await db.query(`
        SELECT c.ID_client, c.Nom, c.Adresse, c.Telephone, cp.Email
        FROM client c
        JOIN compte cp ON c.ID_compte = cp.ID_compte
    `);
    return rows;
};


//Un client par ID_client
const getClientByID = async (id) => {
    const [rows] = await db.query(
        `SELECT c.ID_client, c.Nom, c.Adresse, c.Telephone, cp.Email
         FROM client c
         JOIN compte cp ON c.ID_compte = cp.ID_compte
         WHERE c.ID_client = ?`,
        [id]
    );
    return rows[0];
};


//Profil du client connecté (via ID_compte)
const getClientProfile = async (ID_compte) => {
    const [rows] = await db.query(
        `SELECT c.ID_client, c.Nom, c.Adresse, c.Telephone, cp.Email
         FROM client c
         JOIN compte cp ON c.ID_compte = cp.ID_compte
         WHERE c.ID_compte = ?`,
        [ID_compte]
    );
    return rows[0];
};


//Modifier profil (sans toucher ID_compte)
const updateClientProfile = async (ID_compte, Nom, Adresse, Telephone) => {
    await db.query(
        `UPDATE client 
         SET Nom = ?, Adresse = ?, Telephone = ?
         WHERE ID_compte = ?`,
        [Nom, Adresse, Telephone, ID_compte]
    );

    return { Nom, Adresse, Telephone };
};


//Supprimer un client
const deleteClient = async (id) => {
    const client = await getClientByID(id);
    if (!client) return null;

    await db.query("DELETE FROM client WHERE ID_client = ?", [id]);

    return { 
        message: "Client supprimé avec succès", 
        ID_client: id 
    };
};


//Vérifier téléphone unique
const getClientByTelephone = async (telephone) => {
    const [rows] = await db.query(
        `SELECT * FROM client WHERE Telephone = ?`,
        [telephone]
    );
    return rows[0];
};


// Export
module.exports = {
    createClient,
    getAllClients,
    getClientByID,
    getClientProfile,
    updateClientProfile,
    deleteClient,
    getClientByTelephone
}