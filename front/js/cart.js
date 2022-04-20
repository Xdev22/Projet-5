//Variable pour recuperer le panier du localStorage
let basket = JSON.parse(localStorage.getItem("basket"));

/*********************Récupération des éléments du panier et les afficher*********************/
if (basket) {
  for (let product of basket) {
    fetch(`http://localhost:3000/api/products/${product.id}`)
      .then((response) => response.json())
      .then(function (productApi) {
        let sectionCartItems = document.getElementById("cart__items");
        sectionCartItems.innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
        <div class="cart__item__img">
          <img src="${productApi.imageUrl}" alt="${productApi.altText}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productApi.name}</h2>
            <p>${product.color}</p>
            <p>${productApi.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
      })
      .catch((err) => console.log(err));

    console.log(product.id);
  }
  /*********************Afficher "Panier vide" si vide*********************/
} else {
  let basketTitle = document.querySelector("#cartAndFormContainer h1");
  let cart = document.querySelector("#cartAndFormContainer .cart");
  basketTitle.textContent = "Votre panier est vide";
  cart.style.display = "none";
}

/*********************Supprimé le produit*********************/

window.addEventListener("load", () => {
  let btnDelete = document.querySelectorAll(".deleteItem");
  console.log(btnDelete);
});
