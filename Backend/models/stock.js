const db = require("../config/db");

// =========================
// CREATE STOCK
// =========================
const createStock = async (ID_boutique, ID_produit, Quantite) => {
    await db.query(
        "INSERT INTO stock (ID_boutique, ID_produit, Quantite) VALUES (?, ?, ?)",
        [ID_boutique, ID_produit, Quantite]
    );

    return { ID_boutique, ID_produit, Quantite };
};

// =========================
// ALL STOCKS (RAW)
// =========================
const getAllStocks = async () => {
    const [rows] = await db.query("SELECT * FROM stock");
    return rows;
};

// =========================
// STOCK BY ID
// =========================
const getStockByID = async (ID_boutique, ID_produit) => {
    const [rows] = await db.query(
        "SELECT * FROM stock WHERE ID_boutique = ? AND ID_produit = ?",
        [ID_boutique, ID_produit]
    );

    return rows[0];
};

// =========================
// STOCK BY BOUTIQUE (🔥 FIX IMPORTANT)
// =========================
const getStockByBoutique = async (ID_boutique) => {
    const [rows] = await db.query(`
        SELECT 
            s.ID_boutique,
            s.ID_produit,
            s.Quantite,
            p.Nom_produit,
            p.Prix
        FROM stock s
        JOIN produit p ON s.ID_produit = p.ID_produit
        WHERE s.ID_boutique = ?
    `, [ID_boutique]);

    return rows;
};

// =========================
// STOCK BY PRODUCT + BOUTIQUE (🔥 FIX IMPORTANT)
// =========================
const getStockByProductAndBoutique = async (ID_produit, ID_boutique) => {
    const [rows] = await db.query(`
        SELECT 
            s.ID_boutique,
            s.ID_produit,
            s.Quantite,
            p.Nom_produit,
            p.Prix
        FROM stock s
        JOIN produit p ON s.ID_produit = p.ID_produit
        WHERE s.ID_produit = ? AND s.ID_boutique = ?
    `, [ID_produit, ID_boutique]);

    return rows[0];
};

// =========================
// UPDATE STOCK
// =========================
const updateStock = async (ID_boutique, ID_produit, Quantite) => {
    await db.query(
        "UPDATE stock SET Quantite = ? WHERE ID_boutique = ? AND ID_produit = ?",
        [Quantite, ID_boutique, ID_produit]
    );

    return { ID_boutique, ID_produit, Quantite };
};

// =========================
// DELETE STOCK
// =========================
const deleteStock = async (ID_boutique, ID_produit) => {
    const [result] = await db.query(
        "DELETE FROM stock WHERE ID_boutique = ? AND ID_produit = ?",
        [ID_boutique, ID_produit]
    );

    return result.affectedRows;
};

// =========================
// DECREMENT STOCK
// =========================
const decrement_stock = async (ID_produit, ID_boutique, quantite) => {
    const stockActuel = await getStockByProductAndBoutique(ID_produit, ID_boutique);

    if (!stockActuel) throw new Error("produit non trouvé en stock");

    const nouvelleQuantite = stockActuel.Quantite - quantite;

    if (nouvelleQuantite < 0) throw new Error("stock insuffisant");

    await updateStock(ID_boutique, ID_produit, nouvelleQuantite);

    return nouvelleQuantite;
};

// =========================
// INCREMENT STOCK
// =========================
const increment_stock = async (ID_produit, ID_boutique, quantite) => {
    const stockActuel = await getStockByProductAndBoutique(ID_produit, ID_boutique);

    if (!stockActuel) throw new Error("produit non trouvé en stock");

    const nouvelleQuantite = stockActuel.Quantite + quantite;

    await updateStock(ID_boutique, ID_produit, nouvelleQuantite);

    return nouvelleQuantite;
};

const getStockByProductID = async (ID_produit) => {
    const [rows] = await db.query(
        "SELECT SUM(Quantite) as Quantite FROM stock WHERE ID_produit = ?",
        [ID_produit]
    );

    return rows[0];
};


// EXPORT

module.exports = {
    createStock,
    getAllStocks,
    getStockByID,
    updateStock,
    deleteStock,
    getStockByBoutique,
    getStockByProductAndBoutique,
    decrement_stock,
    increment_stock,
    getStockByProductID
};