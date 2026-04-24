import { Link } from "react-router-dom";
import { deconnexion } from "../pages/JS/deconnexion";

function HeaderAdmin() {
  return (
    <header className="bg-white shadow p-4 flex flex-col md:flex-row md:justify-between md:items-center">

      <h1 className="text-xl font-bold mb-4 md:mb-0">
        Dashboard Admin
      </h1>

      <nav className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">

        <Link to="/ManagerAdmin" className="text-blue-500 hover:underline">Managers</Link>
        <Link to="/employes" className="text-blue-500 hover:underline">Employés</Link>
        <Link to="/Clients" className="text-blue-500 hover:underline">Clients</Link>
        <Link to="/Comptes" className="text-blue-500 hover:underline">Comptes</Link>
        <Link to="/Categories" className="text-blue-500 hover:underline">Categories</Link>
        <Link to="/Produits" className="text-blue-500 hover:underline">Produits</Link>
        <Link to="/StockAdmin" className="text-blue-500 hover:underline">Stocks</Link>
        <Link to="/BoutiqueAdmin" className="text-blue-500 hover:underline">Boutiques</Link>
        

        <button
          onClick={deconnexion}
          className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Déconnexion
        </button>

      </nav>
    </header>
  );
}

export default HeaderAdmin;