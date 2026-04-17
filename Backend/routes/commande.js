const express = require('express');
const router = express.Router();

const commandeController = require('../controllers/commande');
const authentification = require('../middlewares/authentification');
const checkrole = require('../middlewares/checkrole');

// ===============================
// CRÉER
// ===============================
router.post(
  '/ajoutercommande',
  authentification,
  checkrole(['Admin', 'Manager', 'Employe', 'Client']),
  commandeController.createCommande
);

// ===============================
// LISTER (par rôle)
// ===============================
router.get(
  '/getAllCommandes',
  authentification,
  checkrole(['Admin', 'Manager', 'Employe', 'Client']),
  commandeController.getAllCommandes
);

// ===============================
// PAR ID
// ===============================
router.get(
  '/getCommandeByID/:id',
  authentification,
  checkrole(['Admin', 'Manager', 'Employe', 'Client']),
  commandeController.getCommandeByID
);

// ===============================
// PAR BOUTIQUE
// ===============================
router.get(
  '/getCommandeByBoutique/:id',
  authentification,
  checkrole(['Admin', 'Manager', 'Employe']),
  commandeController.getCommandeByBoutique
);

router.get(
  '/getCommandesByClient/:id',
  authentification,
  checkrole(['Admin', 'Manager', 'Employe', 'Client']),
  commandeController.getCommandesByClient
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