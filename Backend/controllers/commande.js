const commandeModel = require('../models/commande');
const clientModel = require('../models/client');
const employeModel = require('../models/employe');
const boutiqueModel = require('../models/boutique');

//Creer une commande
const createCommande = async(req, res) =>
{
    try
    {
        const {Total, Statut_commande='En cours', Mode_paiement, ID_client, ID_employe, ID_boutique} = req.body;
        if(Total === undefined || !Statut_commande || !Mode_paiement || !ID_client || !ID_employe || !ID_boutique)
        {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }
        else
        {
            const clientexistant = await clientModel.getClientByID(ID_client);
            if(!clientexistant)
            {
                return res.status(400).json({message: "Client inexistant"});
            }
            else
            {
                const employeexistent = await employeModel.getEmployeByID(ID_employe);
                if(!employeexistent)
                {
                    return res.status(400).json({message: "Employe inexistant"});
                }
                else
                {
                    const boutiqueexistant = await boutiqueModel.getBoutiqueByID(ID_boutique);
                    if(!boutiqueexistant)
                    {
                        return res.status(400).json({message: "Boutique inexistant"});
                    }
                    else
                    {
                        const nouvellecommande = await commandeModel.createCommande({Total, Statut_commande, Mode_paiement, ID_client, ID_employe, ID_boutique});
                        console.log(req.body)
                        return res.status(201).json({message: "Commande crée avec succés", Commande: nouvellecommande});
                    }
                }
            }
        }

    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};

//Lister les commandes
const getAllCommandes = async(req, res) =>
{
    try
    {
        const commandes = await commandeModel.getAllCommandes();
        if(commandes.length==0)
        {
            return res.status(200).json({message: "Aucune commande trouve",
                                         Total: 0, Commandes: []
            });
        }
        else
        {
            return res.status(200).json({message: "Voici la liste des commandes",
                                          Total: commandes.length,
                                          commandes
            });
        }

    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};

//Avoir une seule commande
const getCommandeByID = async(req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
        if(isNaN(id) || id<=0)
        {
            return res.status(404).json({message: "ID invalide"})
        }
        else
        {
            const commandeexistant = await commandeModel.getCommandeByID(id);
            if(!commandeexistant)
            {
                return res.status(404).json({message: "Pas de commande existant pour cet identifiant"});
            }
            else
            {
                return res.stastus.json({message: "Voici la commande", commandeexistant});
            }
        }

    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};
//Les commandes d'une boutique
const getCommandeByBoutique = async(req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
        if(isNaN(id) || id<=0)
        {
            return res.status(400).json({message: "ID invalide"});
        }
        else
        {
            const commandesboutique = await commandeModel.getCommandeByBoutique(id);
            if(commandesboutique.length==0)
            {
                return res.stastus(200).json({message: "Aucune commande pour cette boutique",
                                            Total: 0, commandes: []
                });
            }
            else
            {
                return res.status(200).json({message: "Vocii la liste des commandes pour cette boutique",
                                            Total: commandesboutique.length, commandesboutique
                })
            }

        }
        

    }
     catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};

//Les commandes d'un employe
const getCommandeByEmploye = async(req, res) =>
{
    try
    {
        const id= parseInt(req.params.id);
        if(isNaN(id) || id<=0)
        {
            return res.status(400).json({message: "ID invalide"});
        }
        else
        {
            const employeexistant = await getCommandeByEmploye(id);
            if(!employeexistant)
            {
                return res.status(404).json({message: "Employe existant"});
            }
            else
            {
                return res.status(200).json({message: "Voici la liste", employeexistant})
            }
        }

    }
     catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};


//Commandes d'un client
const getCommandesClient = async(req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
        if(isNaN(id) || id<=0)
        {
            return res.status(404).json({message: "ID invalide"})
        }
        else
        {
            const commandesclient = await commandeModel.getCommandesClient(id);
            if(!commandesclient || commandesclient.length==0)
            {
                return res.status.json({message: "Liste command evide"})
            }
            else
            {
                return res.status(200).json({message: "Voici la liste", commandesclient, total: commandesclient.length});
            }

        }

    }
     catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};

//Modifier une commande
const updateCommande = async(req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
        const {Total, Statut_commande='En cours', Mode_paiement, ID_client, ID_employe, ID_boutique} = req.body;
        if(isNaN(id) || id<=0)
        {
            return res.status(400).json({message: "ID invalide"});
        }
        else
        {
            const commandemodifier = await commandeModel.updateCommande(req.body);
            return res.status(200).json({message: "Command emodifié avec succés", commandemodifier})
        }

    }
     catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};

//Supprimer une commande
const deleteCommande = async(req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
        if(isNaN(id) || id<=0)
        {
            return res.status(400).json({message: "ID invalide"});
        }
        else
        {
            const commandechercher = await commandeModel.getCommandeByID(id);
            if(!commandechercher)
            {
                return res.status(404).json({message: "Commande inexistant"});
            }
            else
            {
                await commandeModel.deleteCommande(id);
                return res.status(200).json({message: "Command esupprimé avec succés", ID_commande:id})
            }
        }

    }
     catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};

//Exporter les fonctions
module.exports = 
{
    createCommande, 
    getCommandeByBoutique,
    getCommandeByEmploye, 
    getCommandeByID, 
    getCommandesClient,
    getAllCommandes,
    updateCommande,
    deleteCommande
}