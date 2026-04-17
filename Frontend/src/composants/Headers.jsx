import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { obtenirPanier, compterArticlesPanier } from "/src/pages/JS/Panier";

function Headers() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  // 🔥 mise à jour du badge
  const updateCart = () => {
    setCartCount(compterArticlesPanier());
  };

  // 🔥 charger au montage + à chaque changement de page
  useEffect(() => {
    updateCart();
  }, [location]);

  // 🔥 sync live (ajout/suppression/validation)
  useEffect(() => {
    const interval = setInterval(() => {
      updateCart();
    }, 500); // léger polling pour sync localStorage

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">

      <div className="flex justify-between items-center">

        {/* Logo */}
        <div className="logo">
          <img src="/images/logo.jpg" alt="logo" className="w-32" />
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-10 font-bold text-gray-700">
          <Link to="/">Accueil</Link>
          <Link to="/produits">Produits</Link>
          <Link to="/apropos">À propos</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Icônes */}
        <div className="hidden md:flex items-center gap-6">

          {/* Cart */}
          <Link to="/Panier" className="relative">

            <svg xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-700 hover:text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7.5M7 13H5.4m0 0L3 3m2.4 10L5 21h14l-1.5-7.5M16 16a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />

            </svg>

            {/* 🔥 BADGE LIVE */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>

          </Link>

          {/* User */}
          <Link to="/Connexion">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-700 hover:text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M5.121 17.804A6.002 6.002 0 0112 15a6.002 6.002 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />

            </svg>
          </Link>

        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden mt-2 flex flex-col gap-2 font-bold">
          <Link to="/">Accueil</Link>
          <Link to="/produits">Produits</Link>
          <Link to="/apropos">À propos</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      )}

    </header>
  );
}

export default Headers;