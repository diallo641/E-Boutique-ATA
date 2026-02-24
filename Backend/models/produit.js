const db = require('../config/db');

//Creer un produit
const createProduit = async(Nom_produit, Prix, ID_categorie) => 
{
    const [result] = await db.query("Insert into produit (Nom_produit, Prix, ID_categorie) values (?, ?, ?)",
    [Nom_produit, Prix, ID_categorie]);
    return {ID_produit: result.insertId, Nom_produit, Prix, ID_categorie};
}

//Tous les produits
const getAllProduits = async() =>
{
    const [rows] = await db.query ("select * from produit"); 
    return rows;
};

//Un produit
const getProduitByID = async(id) =>
{
    const [rows] = await db.query("select * from produit where ID_produit=?", [id]);
    return rows[0];
}

//Modifier un produit
const updateProduit = async(id, Nom_produit, Prix, ID_categorie) =>
{
    await db.query ("update produit set Nom_produit=?, Prix=?, ID_categorie=? where ID_produit=?",
    [Nom_produit, Prix, ID_categorie, id]);
    return {ID_produit: id, Nom_produit, Prix, ID_categorie};
};

//Supprimer un produit
const deleteProduit = async(id) =>
{
    const produit = await getProduitByID(id);
    if (!produit) return null;
    await db.query("delete from produit where ID_produit=?", [id]);
    return {message: "Produit supprimé avec succès", ID_produit: id};
};

//Chercher un produit par son nom
const getProduitByName = async(Nom_produit) =>
{
    const nom = Nom_produit.trim().toLowerCase();
    const [rows] = await db.query("select * from produit where LOWER(Nom_produit) = ?", [nom]);
    return rows[0];

}

//Exporter les focntions
module.exports = 
{
    createProduit,
    getAllProduits,
    getProduitByID, 
    updateProduit,
    deleteProduit,
    getProduitByName
};