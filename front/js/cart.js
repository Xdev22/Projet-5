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
    .catch((err) => console.log("Erreur de promesse: " + err));
};

/*********************Supprimé le produit*********************/
const removeFromBasket = (product) => {
  //Variable du boutton delete
  let btnsDelete = document.querySelectorAll(".deleteItem");
  for (let btn of btnsDelete) {
    btn.addEventListener("click", function () {
      //On cherche le produit avec même id et couleur dans le localStorage
      let findProductToDelete = basket.find(
        (p) => p.id === product.id && p.color === product.color
      );
      //On récupère l'index du produit pour faire la mise à jour du produit dû à suppression
      let findProductToDeleteIndex = basket.findIndex(
        (p) => p.id === product.id && p.color === product.color
      );

      basket.splice(findProductToDeleteIndex, 1);
      localStorage.setItem("basket", JSON.stringify(basket));
      window.location.reload();
      console.log(basket);

      console.log("Le produit à été supprimé");
    });
  }
  console.log(btnsDelete);
};

const changeQuantity = (product) => {
  //Variable du boutton changeQuantity
  let itemQuantityInput = document.querySelectorAll(".itemQuantity");
  for (let input of itemQuantityInput) {
    input.addEventListener("change", function (e) {
      //On recupere un produit avec même id et couleur dans le localStorage
      let findProductToChange = basket.find(
        (p) => p.id === product.id && p.color === product.color
      );
      //On récupère l'index du produit pour faire la mise à jour du produit dû à la modification de la quantité
      let findProductToChangeIndex = basket.findIndex(
        (p) => p.id === product.id && p.color === product.color
      );
      if (e.target.value.length <= 3 && e.target.value <= 100) {
        product.quantity = e.target.value;
        findProductToChange.quantity = product.quantity;

        basket[findProductToChangeIndex].quantity =
          findProductToChange.quantity;

        if (findProductToChange.quantity <= 0) {
          basket.splice(findProductToChangeIndex, 1);
          window.location.reload();
        }
        localStorage.setItem("basket", JSON.stringify(basket));

        console.log("La quantité du produit " + product.id + " à été modifié");
      } else {
        console.log("err");
      }
    });
  }
  console.log(itemQuantityInput);
};

/*********************Fonction affichage du panier*********************/

const previewBasket = async () => {
  //Si le panier contient un produit
  if (basket && basket.length > 0) {
    for (var product of basket) {
      await getBasket(product);
      console.log(product.id);
    }
    removeFromBasket(product);
    changeQuantity(product);
    //Sinon Afficher "Panier vide"
  } else {
    let basketTitle = document.querySelector("#cartAndFormContainer h1");
    let cart = document.querySelector("#cartAndFormContainer .cart");
    basketTitle.textContent = "Votre panier est vide";
    cart.style.display = "none";
  }
};

previewBasket();
