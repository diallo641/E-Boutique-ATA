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
        `SELECT 
            c.ID_client, 
            c.Nom, 
            c.Adresse, 
            c.Telephone, 
            c.ID_compte,
            cp.Email
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
    //récupérer le client pour avoir ID_compte
    const client = await getClientByID(id);
    if (!client) return null;

    const ID_compte = client.ID_compte;

    //supprimer le client
    await db.query("DELETE FROM client WHERE ID_client = ?", [id]);

    //supprimer le compte associé
    await db.query("DELETE FROM compte WHERE ID_compte = ?", [ID_compte]);

    return {
        message: "Client et compte supprimés avec succès",
        ID_client: id,
        ID_compte
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

const getClientsByBoutiqueID = async (id_boutique) => {
    const [rows] = await db.query(`
        SELECT DISTINCT c.*
        FROM client c
        INNER JOIN commande cmd ON c.ID_client = cmd.ID_client
        WHERE cmd.ID_boutique = ?
    `, [id_boutique]);

    return rows;
};

const getClientByCompteID = async (ID_compte) => {
    const [rows] = await db.query(
        "SELECT * FROM client WHERE ID_compte = ?",
        [ID_compte]
    );
    return rows[0];
};

const updateClient = async (id, Nom, Adresse, Telephone) => {
    await db.query(
        `UPDATE client 
         SET Nom = ?, Adresse = ?, Telephone = ?
         WHERE ID_client = ?`,
        [Nom, Adresse, Telephone, id]
    );

    return {
        ID_client: id,
        Nom,
        Adresse,
        Telephone
    };
};

// Export
module.exports = {
    createClient,
    getAllClients,
    getClientByID,
    getClientProfile,
    updateClientProfile,
    deleteClient,
    getClientByTelephone,
    getClientsByBoutiqueID,
    getClientByCompteID,
    updateClient
}