const db = require("../config/db"); // connexion à MySQL

// avoir tous les rôles
const getAllRoles = async () => {
  const [rows] = await db.query("SELECT * FROM role");
  return rows;
};

// Récupérer un rôle par son ID
const getRoleById = async (id) => {
  const [rows] = await db.query("SELECT * FROM role WHERE ID_role = ?", [id]);
  return rows[0];
};

// Créer un nouveau rôle
const createRole = async (nom_role, description) => {
  const [result] = await db.query(
    "INSERT INTO role (Nom_role, Description) VALUES (?, ?)",
    [nom_role, description]
  );
  return result.insertId;
};

// editer un rôle
const updateRole = async (id, nom_role, description) => {
  const [result] = await db.query(
    "UPDATE role SET Nom_role = ?, Description = ? WHERE ID_role = ?",
    [nom_role, description, id]
  );
  return result.affectedRows;
};

// Supprimer un rôle
const deleteRole = async (id) => {
  const [result] = await db.query(
    "DELETE FROM role WHERE ID_role = ?",
    [id]
  );
  return result.affectedRows;
};

// Vérifier si un rôle existe par nom
const getRoleByName = async (nom_role) => {
  const [rows] = await db.query("SELECT * FROM role WHERE Nom_role = ?", [nom_role]);
  return rows[0]; 
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  getRoleByName
};
