const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commande');
const authentification = require('../middlewares/authentification');
const checkrole = require('../middlewares/checkrole');

//Créer une commande (Admin, Manager, Employé, Client)
router.post('/ajoutercommande', authentification, checkrole(['Admin', 'Manager', 'Employe', 'Client']),
  commandeController.createCommande
);

//Lister toutes les commandes (Admin, Manager, Employé, Client)
router.get('/getAllCommandes', authentification, checkrole(['Admin', 'Manager', 'Employe', 'Client']),
  commandeController.getAllCommandes
);

//Récupérer une commande par ID (Admin, Manager, Employé, Client)
router.get('/getCommandeByID/:id', authentification, checkrole(['Admin', 'Manager', 'Employe', 'Client']),
  commandeController.getCommandeByID
);

//Commandes d'une boutique (Admin, Manager, Employé)
router.get('/getCommandeByBoutique/:id', authentification, checkrole(['Admin', 'Manager', 'Employe']),
  commandeController.getCommandeByBoutique
);

//Commandes d'un employé (Admin, Manager)
router.get('/getCommandeByEmploye/:id', authentification, checkrole(['Admin', 'Manager']),
  commandeController.getCommandeByEmploye
);

//Commandes d'un client (Admin, Manager, Employé, Client)
router.get('/getCommandesClient/:id', authentification, checkrole(['Admin', 'Manager', 'Employe', 'Client']),
  commandeController.getCommandesClient
);

//Modifier une commande (Admin, Manager, Client)
router.put('/updateCommande/:id', authentification, checkrole(['Admin', 'Manager', 'Client']),
  commandeController.updateCommande
);

// Supprimer une commande (Admin, Manager, Client)
router.delete('/deleteCommande/:id', authentification, checkrole(['Admin', 'Manager', 'Client']),
  commandeController.deleteCommande
);

module.exports = router;