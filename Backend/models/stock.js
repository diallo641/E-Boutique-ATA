const db = require("../config/db");

//Creer un stock de prodouit
const createStock = async(ID_boutique, ID_produit,  Quantite) =>
{
    const [result] = await db.query("insert into stock (ID_boutique, ID_produit, Quantite) values (?, ?, ?)",
    [ID_boutique, ID_produit, Quantite]);
    return {ID_boutique, ID_produit, Quantite};
};

//Avoir l'ensemble des stocks
const getAllStocks = async() =>
{
    const [rows] = await db.query ("select * from stock");
    return rows;
}

//Avoir un seul produit en stock
const getStockByID = async(ID_boutique, ID_produit) =>
{
    const [rows] = await db.query("select * from stock where ID_boutique = ? AND ID_produit = ?",
         [ID_boutique, ID_produit]);
    return rows[0];
};

//Modifier un stock
const updateStock = async(ID_boutique, ID_produit, Quantite) =>
{
    await db.query("update stock set Quantite= ? where ID_boutique = ? AND ID_produit = ?",
    [Quantite, ID_boutique, ID_produit]);
    return {ID_boutique, ID_produit, Quantite};
};

//Supprimer un stock
const deleteStock = async(ID_boutique, ID_produit) =>
{

    const [result] = await db.query("delete from stock where ID_boutique = ? AND ID_produit = ?",
    [ID_boutique, ID_produit]);
    return result.affectedRows;
};

//Avoir le stock des produits
const getStockByProductID = async(ID_produit) =>
{
    const [rows] = await db.query("select * from stock where ID_produit = ?", [ID_produit]);
    return rows;
};

//Avoir le stock d'une boutique
const getStockByBoutique = async(ID_boutique) =>
{
    const [rows] = await db.query("select * from stock where ID_boutique = ?", [ID_boutique]);
    return rows;
};

const getStockByBoutique1 = async (ID_boutique) =>
{
    const [rows] = await db.query(`
        SELECT 
            s.Quantite,
            p.Nom_produit,
            b.Nom_boutique
        FROM stock s
        JOIN produit p ON s.ID_produit = p.ID_produit
        JOIN boutique b ON s.ID_boutique = b.ID_boutique
        WHERE s.ID_boutique = ?
    `, [ID_boutique]);

    return rows;
};
//Avoir le stock d'un produit dans une boutique
const getStockByProductAndBoutique = async(ID_produit, ID_boutique) =>
{
    const [rows] = await db.query("select * from stock where ID_produit = ? AND ID_boutique = ?",
         [ID_produit, ID_boutique]);
    return rows[0];
};

//expoter les fonctions
module.exports = 
{
    createStock,
    getAllStocks,
    getStockByID,
    updateStock,
    deleteStock,
    getStockByProductID,
    getStockByBoutique,
    getStockByBoutique1,
    getStockByProductAndBoutique
};