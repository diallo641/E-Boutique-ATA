import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeFromCart, clearCart, getTotal } from "/src/pages/JS/Panier";

function Panier() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleCancel = () => {
    clearCart();
    setCart([]);
  };

  const handleConfirm = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Mon Panier</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 mb-6">
          Votre panier est vide 😔
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          {/* Liste des articles */}
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b py-4">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.nom} className="w-16 h-16 object-cover rounded"/>
                <div>{item.nom}</div>
              </div>
              <div>{item.prix * item.quantity} CFA</div>
              <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:underline">Supprimer</button>
            </div>
          ))}

          <div className="text-right font-bold text-lg mt-4">
            Total : {getTotal()} CFA
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <button onClick={handleCancel} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
              Annuler
            </button>
            <button onClick={handleConfirm} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              Confirmer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Panier;