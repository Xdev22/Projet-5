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

/*********************Gestion du panier*********************/

//Ajout de l'article au localStorage lors du click sur le boutton ajouter au panier
// Enregistrer le pannier dans le localStorage

const addToBasket = (product) =>
  localStorage.setItem("basket", JSON.stringify(product));
let recupBasket = JSON.parse(localStorage.getItem("basket"));

//variable du btn "ajouter au panier"
let btnAdd = document.getElementById("addToCart");

//lors du clique sur le boutton on recupère les éléments suivant dans un objet
btnAdd.addEventListener("click", function () {
  let product = {
    id: productId,
    quantity: document.getElementById("quantity").value,
    color: document.getElementById("colors").value,
  };
  //on enregistre le produit dans le localStorage
  addToBasket(product);

  //Ce que je dois faire :
  //Si le produit est déjà dispo ++
  //sinon push et set

  if (recupBasket == null) {
    //Si le produit est déjà dispo, push.product et setItem
    recupBasket == [];
  } else {
    recupBasket.push(product);
    addToBasket(product);
    console.log("Ok c'est bon");
  }
});
