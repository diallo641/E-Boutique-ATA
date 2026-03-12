import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Accueil/Home"; 
import Produits from "./pages/Accueil/Produits";
import Apropos from "./pages/Accueil/Apropos";
import Contact from "./pages/Accueil/contact";
import Connexion from "./pages/Authentification/Connexion";
import Inscription from "./pages/Authentification/Inscription";
import Reinitialiser_password from "./pages/Authentification/Reinitialiser_password";
import Panier from "./pages/Accueil/Panier"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/apropos" element={<Apropos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Reinitialiser_password" element={<Reinitialiser_password />} />
        <Route path="/Panier" element={<Panier />} />
      </Routes>
    </Router>
  );
}

export default App;