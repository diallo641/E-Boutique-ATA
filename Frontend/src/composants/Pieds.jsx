import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Boutique */}
        <div>
          <h3 className="text-lg font-bold mb-4">Notre Boutique</h3>
          <p className="text-gray-400">
            Découvrez nos produits de qualité et profitez de nos offres exclusives.
          </p>
        </div>

        {/* Liens rapides */}
        <div>
          <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/" className="hover:text-white">Accueil</Link>
            </li>
            <li>
              <Link to="/produits" className="hover:text-white">Produits</Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-white">Catégories</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-bold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/faq" className="hover:text-white">FAQ</Link>
            </li>
            <li>
              <Link to="/livraison" className="hover:text-white">Livraison</Link>
            </li>
            <li>
              <Link to="/retour" className="hover:text-white">Retour produit</Link>
            </li>
            <li>
              <Link to="/conditions" className="hover:text-white">Conditions d'utilisation</Link>
            </li>
          </ul>
        </div>

        {/* Contact & Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact</h3>
          <p className="text-gray-400">Email : contact@boutique.com</p>
          <p className="text-gray-400">Téléphone : +221 77 123 45 67</p>

          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>

        </div>

      </div>

      {/* bas du footer */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} Ma Boutique. Tous droits réservés.
      </div>

    </footer>
  );
}

export default Footer;