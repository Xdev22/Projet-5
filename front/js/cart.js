//Variable pour recuperer le panier du localStorage
let basket = JSON.parse(localStorage.getItem("basket"));
let totalPrice = 0;
let totalArticle = 0;

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
      <input type="number" onchange="changeQuantity(this.id)" id="${product.id}-${product.color}"  class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
      <p class="deleteItem" onclick="removeFromBasket(this.id)" id="${product.id}/${product.color}">Supprimer</p>
      </div>
      </div>
      </div>
      </article>`;
      totalPriceFunction(productApi.price, product.quantity);
      totalArticleFunction(product.quantity);
    })
    .catch((err) => console.log("Erreur de promesse: " + err));
};

/*********************Supprimé le produit*********************/
const removeFromBasket = (product) => {
  const elements = product.split("/");
  const id = elements[0];
  const color = elements[1];
  console.log("le produit supprimé est: ");
  console.log(id, color);

  let productToDeleteIndex = basket.findIndex(
    (p) => p.id === id && p.color === color
  );

  basket.splice(productToDeleteIndex, 1);

  localStorage.setItem("basket", JSON.stringify(basket));

  console.log("Le produit à été supprimé");
  window.location.reload();
};

const changeQuantity = (product) => {
  const elements = product.split("-");
  const id = elements[0];
  const color = elements[1];
  console.log("le produit changé est: ");
  console.log(id, color);

  //Variable du boutton changeQuantity
  let input = document.getElementById(id + "-" + color);

  //On recupere le produit avec même id et couleur dans le localStorage
  let findProductToChange = basket.find(
    (p) => p.id === id && p.color === color
  );
  //On récupère l'index du produit pour faire la mise à jour du produit dû à la modification de la quantité
  let findProductToChangeIndex = basket.findIndex(
    (p) => p.id === id && p.color === color
  );
  if (input.value.length <= 3 && input.value <= 100) {
    findProductToChange.quantity = input.value;

    basket[findProductToChangeIndex].quantity = findProductToChange.quantity;
    window.location.reload();

    if (findProductToChange.quantity <= 0) {
      basket.splice(findProductToChangeIndex, 1);
      window.location.reload();
    }
    localStorage.setItem("basket", JSON.stringify(basket));

    console.log(
      "La quantité du produit " + findProductToChange.id + " à été modifié"
    );
  } else {
    console.log("err");
  }
  // });
  // }
  console.log(input);
};

/*********************Fonction affichage du panier*********************/

const previewBasket = async () => {
  //Si le panier contient un produit
  if (basket && basket.length > 0) {
    for (var product of basket) {
      await getBasket(product);
    }
    SendForm(product);

    //Sinon Afficher "Panier vide"
  } else {
    let basketTitle = document.querySelector("#cartAndFormContainer h1");
    let cart = document.querySelector("#cartAndFormContainer .cart");
    basketTitle.textContent = "Votre panier est vide";
    cart.style.display = "none";
  }
};

previewBasket();

/*********************Affichage des prix*********************/
//Variables des elements prix
const totalPriceFunction = function (price, quantity) {
  const totalPriceElement = document.getElementById("totalPrice");
  totalPrice += price * quantity;
  totalPriceElement.textContent = totalPrice;
};
/*********************Affichage de la quantité*********************/
const totalArticleFunction = function (quantity) {
  const totalArticleElement = document.getElementById("totalQuantity");
  totalArticle += JSON.parse(quantity);

  if (totalArticle == "1") {
    document.querySelector(
      ".cart__price p"
    ).textContent = `Total (1 article) : ${totalPrice} €`;
  } else {
    totalArticleElement.textContent = totalArticle;
  }
};

/*********************Formulaire verificateur*********************/
//Les elements DOM

const form = document.querySelector(".cart__order__form");

//Elements du DOM pour la verification du formulaire

//Regex pour pour first name, last name et ville
// let textRegExp = new RegExp(
//   "^(?<firstchar>(?=[A-Za-z]))((?<alphachars>[A-Za-z])|(?<specialchars>[A-Za-z]['-](?=[A-Za-z]))|(?<spaces> (?=[A-Za-z])))*$"
// );

// // Regex pour address
// let addressRegExp = new RegExp("[A-Za-z0-9'.-,]");

// // Regex pour email
// let emailRegExp = new RegExp("[A-Za-z0-9'.-,]");

//first name
const firstName = document.getElementById("firstName");
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

//lastName
const lastName = document.getElementById("lastName");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
// console.log(lastName);

//Adresse
const adress = document.getElementById("address");
const addressErrorMsg = document.getElementById("addressErrorMsg");

//Ville
const city = document.getElementById("city");
const cityErrorMsg = document.getElementById("cityErrorMsg");

//Adresse
const email = document.getElementById("email");
const emailErrorMsg = document.getElementById("emailErrorMsg");

// const formVerificator = function (
//   element,
//   errorMsg,
//   backgroundColor,
//   textContent,
//   display
// ) {
//   element.style.backgroundColor = `${backgroundColor}`;
//   errorMsg.textContent = `${textContent}`;
//   errorMsg.style.display = `${display}`;
// };

// //Event pour firstName
// firstName.addEventListener("input", function (e) {
//   let testName = textRegExp.test(e.value);
//   if (firstName.value.length <= 1) {
//     formVerificator(
//       firstName,
//       firstNameErrorMsg,
//       "#c93e3e",
//       "Veuillez entrer un prénom valide",
//       "block"
//     );
//     return false;
//   } else if (testName == false) {
//     formVerificator(
//       firstName,
//       firstNameErrorMsg,
//       "#c93e3e",
//       "Le nom ne doit pas contenir de caractère spéciaux",
//       "block"
//     );
//     console.log(testName + " : " + firstName.value);
//     return false;
//   } else if (testName == true) {
//     formVerificator(
//       firstName,
//       firstNameErrorMsg,
//       "rgb(190 246 173)",
//       "",
//       "none"
//     );
//     return true;
//   }
//   console.log(testName + " : " + firstName.value);
// });

// //Event pour lastName
// lastName.addEventListener("change", function (e) {
//   let testLastName = textRegExp.test(e.value);

//   if (testLastName == false) {
//     formVerificator(
//       lastName,
//       lastNameErrorMsg,
//       "#c93e3e",
//       "Le nom ne doit pas contenir de caractère spéciaux",
//       "block"
//     );
//     console.log(testLastName);
//     return false;
//   } else {
//     formVerificator(lastName, lastNameErrorMsg, "rgb(190 246 173)", "", "none");
//     console.log(testLastName);

//     return true;
//   }
// });

// //Event pour address
// adress.addEventListener("change", function (e) {
//   let testAdress = addressRegExp.test(e.value);
//   if (adress.value.length <= 10) {
//     formVerificator(
//       adress,
//       addressErrorMsg,
//       "#c93e3e",
//       "Veuillez entrer une adresse valide",
//       "block"
//     );
//     console.log(testAdress);
//     return false;
//   } else if (testAdress == false) {
//     formVerificator(
//       adress,
//       addressErrorMsg,
//       "#c93e3e",
//       "Veuillez entrer une adresse valide",
//       "block"
//     );

//     console.log(testAdress);
//     return false;
//   } else {
//     formVerificator(adress, addressErrorMsg, "rgb(190 246 173)", "", "none");
//     adress.style.backgroundColor = "rgb(190 246 173)";
//     addressErrorMsg.style.display = "none";
//     return true;
//   }
// });

// console.log(firstName);

// //Event pour ville
// city.addEventListener("change", function (e) {
//   let testCity = textRegExp.test(e.value);

//   if (testCity == false) {
//     formVerificator(
//       city,
//       cityErrorMsg,
//       "#c93e3e",
//       "Veuillez entrer une ville valide",
//       "block"
//     );
//     console.log(city);
//     return false;
//   } else {
//     formVerificator(city, cityErrorMsg, "rgb(190 246 173)", "", "none");
//     console.log(city);

//     return true;
//   }
// });

// //Event pour email
// email.addEventListener("change", function (e) {
//   let testEmail = emailRegExp.test(e.value);

//   if (testEmail == false) {
//     formVerificator(
//       email,
//       emailErrorMsg,
//       "#c93e3e",
//       "Veuillez entrer une adresse mail valide",
//       "block"
//     );
//     console.log(email);
//     return false;
//   } else {
//     formVerificator(email, emailErrorMsg, "rgb(190 246 173)", "", "none");
//     console.log(email);

//     return true;
//   }
// });

const formResult = function () {
  // if (
  //   firstName == true &&
  //   lastName == true &&
  //   adress == true &&
  //   city == true &&
  //   email == true
  // ) {
};
let btnSubmit = document.getElementById("order");

const SendForm = function (product) {
  btnSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    let cart = [];
    for (product of basket) {
      cart.push(product.id);
    }
    let order = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: adress.value,
        city: city.value,
        email: email.value,
      },
      products: cart,
    };
    console.log(order);

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Renvoi de l'orderID dans l'URL
        console.log(data);
        document.location.href = `confirmation.html?id=${data.orderId}`;
      })
      .catch((err) => console.log(err));
  });
};
