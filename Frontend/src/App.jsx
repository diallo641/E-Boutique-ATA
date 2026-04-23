import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Accueil/Home"; 
import Produits from "./pages/Accueil/Produits";
import Apropos from "./pages/Accueil/Apropos";
import Contact from "./pages/Accueil/Contact";
import Connexion from "./pages/Authentification/Connexion";
import Inscription from "./pages/Authentification/Inscription";
import Reinitialiser_password from "./pages/Authentification/Reinitialiser_password";
import Panier from "./pages/Accueil/Panier";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import Managers from "./pages/Managers/managers";
import Employes from "./pages/Employes/employes";
import DashboardClient from "./pages/Clients/DashboardClient";  
import Clients from "./pages/Clients/Clients";  
import DashboardComptes from "./pages/Comptes/DashboardComptes";
import CategoriesAdmin from "./pages/Categories/CategoriesAdmin";
import ProduitsAdmin from "./pages/Produits/produitsAdmin";
import PageProduitsClient from "./pages/Clients/ProduitsClients";
import AjouterCommande from "./pages/Commandes/AjouterCommande"; 
import CommandeSuccess from "./pages/Clients/commande_success";
import AjoutManager from "./pages/Managers/AjoutManager";
import EditerManager from "./pages/Managers/EditerManager";
import DeleteManager from "./pages/Managers/DeleteManager";
import AjoutEmploye from "./pages/Employes/AjoutEmploye";
import EditerEmploye from "./pages/Employes/EditerEmploye";
import DeleteEmploye from "./pages/Employes/DeleteEmploye";
import DashboardEmploye from "./pages/Employes/DashboardEmploye";
import AjoutClient from "./pages/Clients/AjoutClient";
import ProfilClient from "./pages/Clients/ProfilClient";
import EditerClient from "./pages/Clients/EditerClient";
import DeleteClient from "./pages/Clients/DeleteClient";
import AjoutCompte from "./pages/Comptes/AjoutCompte";
import EditerCompte from "./pages/Comptes/EditerCompte";
import DeleteCompte from "./pages/Comptes/DeleteCompte";
import AjoutCategorie from "./pages/Categories/AjoutCategorie"
import EditerCategorie from "./pages/Categories/EditerCategorie";
import DeleteCategorie from "./pages/Categories/DeleteCategorie";
import Ajoutproduit from "./pages/Produits/AjoutProduit";
import EditerProduit from "./pages/Produits/EditerProduit";
import DeleteProduit from "./pages/Produits/DeleteProduit";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/apropos" element={<Apropos />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Reinitialiser_password" element={<Reinitialiser_password />} />
        <Route path="/Panier" element={<Panier />} />
        <Route path="/Dashboardadmin" element={<DashboardAdmin />} />
        <Route path="/Manager" element={<Managers />} />
        <Route path="/employes" element={<Employes />} />
        <Route path="/Dashboardclient" element={<DashboardClient />} />
        <Route path="/AjouterCommande" element={<AjouterCommande />} />
        <Route path="/Clients" element={<Clients />} />
        <Route path="/Comptes" element={<DashboardComptes />} />
        <Route path="/Categories" element={<CategoriesAdmin />} />
        <Route path="/Produits" element={<ProduitsAdmin />} />
        <Route path="/client/produits" element={<PageProduitsClient />} />
        <Route path="/commande_success" element={<CommandeSuccess />} />
        <Route path="/AjoutManager" element={<AjoutManager />} />
        <Route path="/EditerManager/:id" element={<EditerManager />} />
        <Route path="/DeleteManager/:id" element={<DeleteManager />} />
        <Route path="/AjoutEmploye" element={<AjoutEmploye />} />
        <Route path="/EditerEmploye/:id" element={<EditerEmploye />} />
        <Route path="/DeleteEmploye/:id" element={<DeleteEmploye />} />
        <Route path="/Dashboardemploye" element={<DashboardEmploye />} />
        <Route path="/AjoutClient" element={<AjoutClient />} />
        <Route path="/ProfilClient/:id" element={<ProfilClient />} />
        <Route path="/EditerClient/:id" element={<EditerClient />} />
        <Route path="/DeleteClient/:id" element={<DeleteClient />} />
        <Route path="/AjoutCompte" element={<AjoutCompte />} />
        <Route path="/EditerCompte/:id" element={<EditerCompte />} />
        <Route path="/DeleteCompte/:id" element={<DeleteCompte />} />
        <Route path="/AjoutCategorie" element={<AjoutCategorie />} />
        <Route path="/EditerCategorie/:id" element={<EditerCategorie />} />
        <Route path="/DeleteCategorie/:id" element={<DeleteCategorie />} />
        <Route path="/AjoutProduit" element={<Ajoutproduit />} />
        <Route path="/EditerProduit/:id" element={<EditerProduit />} />
        <Route path="/DeleteProduit/:id" element={<DeleteProduit />} />

      
      </Routes>
    </Router>
  );
}

export default App;