const db = require("../config/db"); 

// Créer une categorie
const createCategorie = async (Nom_categorie, Description) => {
    const [result] = await db.query(
        "INSERT INTO categorie (Nom_categorie, Description) VALUES (?, ?)",
        [Nom_categorie, Description]
    );

    return {
        ID_categorie: result.insertId,
        Nom_categorie,
        Description
    };
};

// Toutes les categories
const getAllCategories = async () => {
    const [rows] = await db.query("SELECT * FROM categorie");
    return rows;
};

// Une seule categorie
const getCategorieByID = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM categorie WHERE ID_categorie = ?",
        [id]
    );
    return rows[0];
};

// Modifier une categorie
const updateCategorie = async (id, Nom_categorie, Description) => {
    const [result] = await db.query(
        "UPDATE categorie SET Nom_categorie = ?, Description = ? WHERE ID_categorie = ?",
        [Nom_categorie, Description, id]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        ID_categorie: id,
        Nom_categorie,
        Description
    };
};

// Supprimer une categorie
const deleteCategorie = async (id) => {
    const categorie = await getCategorieByID(id);

    if (!categorie) {
        return null;
    }

    await db.query(
        "DELETE FROM categorie WHERE ID_categorie = ?",
        [id]
    );

    return {
        message: "Categorie supprimée avec succès",
        ID_categorie: id
    };
};
// Rechercher une categorie par nom
const getCategorieByName = async (Nom_categorie) => {
    const nom = Nom_categorie.trim().toLowerCase();
    const [rows] = await db.query(
        "SELECT * FROM categorie WHERE LOWER(TRIM(Nom_categorie)) = ?",
        [nom]
    );
    return rows[0];
};

module.exports = {
    createCategorie,
    getAllCategories,
    getCategorieByID,
    updateCategorie,
    deleteCategorie,
    getCategorieByName
};