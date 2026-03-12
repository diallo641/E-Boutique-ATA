import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart } from "/src/pages/JS/Panier"; // ton fichier JS panier

function Headers() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Mettre à jour le compteur au montage
  useEffect(() => {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
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
          <Link to="/" className="hover:text-blue-500">Accueil</Link>
          <Link to="/produits" className="hover:text-blue-500">Produits</Link>
          <Link to="/apropos" className="hover:text-blue-500">À propos</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
        </nav>

        {/* Icônes desktop */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700 hover:text-blue-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
          </svg>

          {/* Cart avec badge */}
          <Link to="/Panier" className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700 hover:text-blue-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7.5M7 13H5.4m0 0L3 3m2.4 10L5 21h14l-1.5-7.5M16 16a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>

            {/* Badge toujours visible */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

          {/* User */}
          <Link to="/Connexion">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700 hover:text-blue-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A6.002 6.002 0 0112 15a6.002 6.002 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>
        </div>

        {/* Hamburger mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {isOpen && (
        <nav className="md:hidden mt-2 flex flex-col gap-2 font-bold text-gray-700">
          <Link to="/" className="hover:text-blue-500">Accueil</Link>
          <Link to="/produits" className="hover:text-blue-500">Produits</Link>
          <Link to="/apropos" className="hover:text-blue-500">À propos</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
        </nav>
      )}
    </header>
  );
}

export default Headers;