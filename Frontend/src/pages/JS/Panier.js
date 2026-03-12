// cart.js

// récupérer le panier
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// ajouter un produit
export function addToCart(produit, quantity = 1) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === produit.id);
  if (index !== -1) {
    cart[index].quantity += quantity;
  } else {
    cart.push({...produit, quantity});
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// supprimer un produit
export function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// vider le panier
export function clearCart() {
  localStorage.removeItem("cart");
}

// calculer le total
export function getTotal() {
  const cart = getCart();
  return cart.reduce((acc, item) => acc + item.prix * item.quantity, 0);
}