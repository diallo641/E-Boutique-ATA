import { createContext, useState, useEffect } from "react";
import { getCart as getCartFromStorage, addToCart as addToCartStorage, removeFromCart as removeFromCartStorage, clearCart as clearCartStorage } from "/src/pages/JS/Panier";

// Création du context
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Initialiser le panier au montage
  useEffect(() => {
    const initialCart = getCartFromStorage();
    setCart(initialCart);
    updateCartCount(initialCart);
  }, []);

  // Met à jour le compteur
  const updateCartCount = (cartArray) => {
    const total = cartArray.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  // Ajouter un produit
  const addToCart = (produit, quantity = 1) => {
    addToCartStorage(produit, quantity);
    const updatedCart = getCartFromStorage();
    setCart(updatedCart);
    updateCartCount(updatedCart);
  };

  // Supprimer un produit
  const removeFromCart = (id) => {
    removeFromCartStorage(id);
    const updatedCart = getCartFromStorage();
    setCart(updatedCart);
    updateCartCount(updatedCart);
  };

  // Vider le panier
  const clearCart = () => {
    clearCartStorage();
    setCart([]);
    setCartCount(0);
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}