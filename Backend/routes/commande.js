const express = require('express');
const router = express.Router();

const commandeController = require('../controllers/commande');
const authentification = require('../middlewares/authentification');
const checkrole = require('../middlewares/checkrole');


// ===============================
// CRÉER UNE COMMANDE
// ===============================
router.post(
  '/ajoutercommande',
  authentification,
  checkrole(['Admin', 'Client', 'Employe']),
  commandeController.createCommande
);


// ===============================
// MES COMMANDES (CLIENT)
// ===============================
router.get(
  '/mes-commandes',
  authentification,
  checkrole(['Client']),
  commandeController.getMyCommandes
);


// ===============================
// TOUTES COMMANDES (ADMIN / STAFF)
// ===============================
router.get(
  '/getAllCommandes',
  authentification,
  checkrole(['Admin', 'Manager', 'Employe']),
  commandeController.getAllCommandes
);


// ===============================
// GET BY ID
// ===============================
router.get(
  '/getCommandeByID/:id',
  authentification,
  checkrole(['Admin', 'Manager', 'Employe', 'Client']),
  commandeController.getCommandeByID
);


// ===============================
// UPDATE
// ===============================
router.put(
  '/updateCommande/:id',
  authentification,
  checkrole(['Admin', 'Manager']),
  commandeController.updateCommande
);


// ===============================
// DELETE
// ===============================
router.delete(
  '/deleteCommande/:id',
  authentification,
  checkrole(['Admin', 'Manager']),
  commandeController.deleteCommande
);

module.exports = router;