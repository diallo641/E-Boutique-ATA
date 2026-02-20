const db = require('../config/db');
// Créer une boutique
const createBoutique = async(Nom_boutique, Email, Adresse, Telephone) => 
{
    const [resultat] = await db.query(
        "Insert into boutique (Nom_boutique, Email, Adresse, Telephone) values(?, ?, ?, ?)",
        [Nom_boutique, Email, Adresse, Telephone]
    );
    return { ID_boutique: resultat.insertId, Nom_boutique, Email, Adresse, Telephone };
};

//Tous les boutiqueq
const getAllBoutiques = async() =>
{
    const [rows] = await db.query ("select * from boutique");
    return rows;
};

//Avoir les informations d'une seule boutique
const getBoutiqueByID = async(id) =>
{
    const [rows] =await db.query ("select * from boutique where ID_boutique = ?" , [id]);
    return rows[0];
}

//Modifier une boutique
const updateBoutique = async(id, Nom_boutique, Email, Adresse, Telephone) =>
{
    const boutique = await getBoutiqueByID(id);
    if(!boutique)
    {
        return null;
    }
    await db.query("update boutique set Nom_boutique = ?, Email = ?, Adresse = ?, Telephone = ? where ID_boutique = ?",
    [Nom_boutique, Email, Adresse, Telephone, id]);
    return { ID_boutique: id, Nom_boutique, Email, Adresse, Telephone };
}
    
//Supprimer une boutique
const deleteBoutique = async(id) =>
{
    const boutique = await getBoutiqueByID(id);
    if(!boutique)
    {
        return null;
    }
    else
    {
        await db.query ("delete from boutique where ID_boutique = ?" , [id]);
        return { message: "Boutique supprimé avec succès", ID_boutique: id };
    }
};

//Verifier si une boutique existe via l'email
const getBoutiqueByEmail = async(Email) =>
{
    const [rows] = await db.query ("select * from boutique where Email = ?", [Email]);
    return rows[0];
};

//Verifier l'unicite du numero de telephone
const getBoutiqueByTelephone = async(Telephone) =>
{
    const [rows] = await db.query ("select * from boutique where Telephone = ?", [Telephone]);
    return rows[0];
};

//Exporter les fonctions
module.exports = 
{
    createBoutique,
    getAllBoutiques,
    getBoutiqueByID,
    updateBoutique,
    deleteBoutique,
    getBoutiqueByEmail,
    getBoutiqueByTelephone
};