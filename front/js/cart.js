//Variable pour recuperer le panier du localStorage
let basket = JSON.parse(localStorage.getItem("basket"));
console.log(basket);

/*********************Afficher "Panier vide*********************/

if (basket == null) {
  let basketTitle = document.querySelector("#cartAndFormContainer h1");
  let cart = document.querySelector("#cartAndFormContainer .cart");
  basketTitle.textContent = "Votre panier est vide";
  cart.style.display = "none";
}
