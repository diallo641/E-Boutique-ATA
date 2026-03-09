import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./composants/Headers";
import Home from "./pages/Accueil/Home"; 
import Produits from "./pages/Accueil/Produits";
import Apropos from "./pages/Accueil/Apropos";
import Contact from "./pages/Accueil/contact";
import Connexion from "./pages/Authentification/Connexion"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/apropos" element={<Apropos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Connexion" element={<Connexion />} />
      </Routes>
    </Router>
  );
}

export default App;