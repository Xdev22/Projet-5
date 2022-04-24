//Variable pour recuperer le panier du localStorage
let basket = JSON.parse(localStorage.getItem("basket"));

/*********************Récupération des éléments du panier et les afficher*********************/
const getBasket = async function (product) {
  await fetch(`http://localhost:3000/api/products/${product.id}`)
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
      console.log(productApi);
    })
    .catch((err) => console.log(err));

  console.log("2");
  btnDlt();
};
console.log("dehors");

//Fonction affichage du panier
const previewBasket = async () => {
  //Si le panier contient un produit
  if (basket) {
    for (let product of basket) {
      getBasket(product);
    }
    //Sinon Afficher "Panier vide"
  } else {
    let basketTitle = document.querySelector("#cartAndFormContainer h1");
    let cart = document.querySelector("#cartAndFormContainer .cart");
    basketTitle.textContent = "Votre panier est vide";
    cart.style.display = "none";
  }
};

previewBasket();

/*********************Supprimé le produit*********************/
const btnDlt = () => {
  let btnsDelete = document.querySelectorAll("deleteItem");
  console.log(btnsDelete);
};
// for (let btn in btnsDelete) {
//   btn.onclick = function () {
//     console.log("ls");
//   };
// }
