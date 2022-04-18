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

/******************************************************************************************/

//Fonction pour ajouter des articles au panier
let addToBasket = function (product) {
  //Variable pour recuperer le panier du localStorage
  let basket = JSON.parse(localStorage.getItem("basket"));
  //Si le panier est vide alors :
  if (basket == null) {
    //on créer un array (le panier)
    basket = [];
    console.log("Panier crée");
  }
  //On recupere un produit avec même id et couleur dans le localStorage
  let newProduct = basket.find(
    (p) => p.id === product.id && p.color === product.color
  );
  //On récupère l'index du produit pour faire la mise à jour du produit dû à l'ajout de la quantité
  let newProductIndex = basket.findIndex(
    (p) => p.id === product.id && p.color === product.color
  );
  if (newProduct) {
    newProduct.quantity += product.quantity;
    basket[newProductIndex].quantity = newProduct.quantity;
    localStorage.setItem("basket", JSON.stringify(basket));
    console.log("Nouvelle valeur du produit");
    console.log(newProduct);
  } else {
    //Ajout de l'objet produit dans l'array dans le localStorage
    basket.push(product);
    console.log("valeur du produit ");
    console.log(basket);
    //Enregistre dans le localStorage en le stringifiant car la valeur se doit d'être en string.
    localStorage.setItem("basket", JSON.stringify(basket));
  }
};

/*********************Lors du clique sur le bouton "ajouter au panier"*********************/
//Boutton ajouter au panier
const btnAddToBasket = document.getElementById("addToCart");

btnAddToBasket.addEventListener("click", function () {
  //l'objet contenant les informations du produit
  let product = {
    id: productId,
    quantity: Number(document.getElementById("quantity").value),
    color: document.getElementById("colors").value,
  };

  addToBasket(product);
});
