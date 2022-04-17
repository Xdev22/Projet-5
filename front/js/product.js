/*************************Recuperation de la chaine de requête (id)************************/
let searchParams = new URLSearchParams(window.location.search);
let productId = searchParams.get("id");
//Si l'url contient id alors ouvre la page qui lui correspond
if (searchParams.has("id")) {
  fetch(`http://localhost:3000/api/products/${productId}`);
  //sinon, renvoyer à l'accueil
} else {
  window.location.pathname = "/front/html/index.html";
}

/*********************Recupération du produit depuis l'API*********************/
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => response.json())
  /*****************Integration des éléments dynamiquement****************/
  .then(function (product) {
    document.querySelector("title").textContent = product.name;
    document.querySelector(
      ".item article .item__img"
    ).innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.getElementById("title").textContent = product.name;
    document.getElementById("price").textContent = product.price;
    document.getElementById("description").textContent = product.description;
    for (color of product.colors) {
      let newOpt = document.createElement("option");
      let parent = document.querySelector(
        ".item__content__settings__color select"
      );
      parent.appendChild(newOpt).textContent = color;
      newOpt.value = color;
    }
  })

  .catch((err) => console.log(err));

/************************************************************/
/*********************Gestion du panier*********************/

//Boutton ajouter au panier
const btnAddToBasket = document.getElementById("addToCart");

//lors du clique sur le boutton on recupère les éléments suivant
btnAddToBasket.addEventListener("click", function () {
  let product = {
    id: productId,
    quantity: Number(document.getElementById("quantity").value),
    color: document.getElementById("colors").value,
  };

  //Variable contenant les clés et valeurs du localStorage
  let basket = JSON.parse(localStorage.getItem("basket"));

  //Si le localStorage est vide alors :
  if (basket == null) {
    //on créer un array
    basket = [];
    //On y injecte le produit avec ses données
    basket.push(product);
    //Et l'enregistre dans le localStorage en le stringifiant car la valeur se doit d'être en string.
    localStorage.setItem("basket", JSON.stringify(basket));
    console.table(basket);
    console.log("Panier crée");

    //Sinon
  } else {
    //On push le produit dans l'array
    basket.push(product);
    //on l'enregistre
    localStorage.setItem("basket", JSON.stringify(basket));
    console.log("article ajouté");
  }
});
