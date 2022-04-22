/*************************Recuperation de la chaine de requête (id)************************/
let searchParams = new URLSearchParams(window.location.search);
let productId = searchParams.get("id");

const getProductUrl = () => {
  //Si l'url contient id alors ouvre la page qui lui correspond
  if (searchParams.has("id")) {
    fetch(`http://localhost:3000/api/products/${productId}`);
    //sinon, renvoyer à l'accueil
  } else {
    window.location.pathname = "/front/html/index.html";
  }
};
getProductUrl();

/*********************Recupération du produit depuis l'API*********************/
const catchProducts = () => {
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
        let parent = document.getElementById("colors");
        parent.appendChild(newOpt).textContent = color;
        newOpt.value = color;
      }
    })

    .catch((err) => console.log(err));
};

catchProducts();
/************************************************************/
/*********************Gestion du panier*********************/

//Fonction pour ajouter des articles au panier
let addToBasket = (product) => {
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

/*********************Gérer le choix du client*********************/
let select = document.getElementById("colors");
let input = document.getElementById("quantity");

//Variables liés au message d'err couleur
let colorErr = document.createElement("p");
let settingsColor = document.querySelector(".item__content__settings__color");
settingsColor.appendChild(colorErr);

//Variables liés au message d'err quantité
let qtyErr = document.createElement("p");
let settingsQuantity = document.querySelector(
  ".item__content__settings__quantity"
);
settingsQuantity.appendChild(qtyErr);
//Boutton ajouter au panier
const btnAddToBasket = document.getElementById("addToCart");

//Fonction Verification couleur
let colorErrFunction = () => {
  select.addEventListener("input", function (e) {
    let value = e.target.value;
    if (value == 0) {
      select.style.border = " 3px solid red";
      colorErr.textContent = "Veuillez choisir une couleur";
      colorErr.style.color = "#850808";
      colorErr.style.marginLeft = "175px";
      colorErr.style.marginTop = "5px";
      colorErr.style.display = "block";
      console.log("je suis la fonction err color");
    } else {
      select.style.border = " transparent";
      colorErr.style.display = "none";
    }
  });
};

let qtyErrFunction = () => {
  //Verifcation quantité
  input.addEventListener("input", function (e) {
    let value = e.target.value;
    if (value <= 0 || value > 100) {
      qtyErr.textContent = "Veuillez choisir une quantité valide";
      qtyErr.style.color = "#850808";
      qtyErr.style.marginLeft = "175px";
      qtyErr.style.marginTop = "5px";
      input.style.border = " 3px solid red";
      qtyErr.style.display = "block";

      console.log("je suis la fonction err qty");
    } else {
      input.style.border = " transparent";
      qtyErr.style.display = "none";
    }
  });
};

const inputVerificator = () => {
  //Fonction Verification couleur
  colorErrFunction();
  //Fonction Verifcation quantité
  qtyErrFunction();
};

inputVerificator();
/*********************Lors du clique sur le bouton "ajouter au panier"*********************/

btnAddToBasket.addEventListener("click", function () {
  //Si choix de couleur et de produit invalide
  if (select.selectedIndex ==0 && input.value <= 0 || input.value > 100) {
    //Style du msg colorErr
    colorErr.textContent = "Veuillez choisir une couleur";
    colorErr.style.color = "#850808";
    colorErr.style.marginLeft = "175px";
    colorErr.style.marginTop = "5px";
    select.style.border = " 3px solid red";
    //Style du message QuantityErr
    qtyErr.textContent = "Veuillez choisir une quantité valide";
    qtyErr.style.color = "#850808";
    qtyErr.style.marginLeft = "175px";
    qtyErr.style.marginTop = "5px";
    input.style.border = " 3px solid red";

    console.log("Choisissez une couleur et un nombre valide");
    //Si choix du nombre invalide
  } else if (input.value <= 0 || input.value > 100) {
    qtyErrFunction();
    console.log("Veuillez choisir un nombre valide");

    //Si choix de couleur invalide
  } else if (select.selectedIndex == 0) {
    colorErrFunction;
    console.log("veuillez choisir une couleur");

    //Si tout est bon
  } else {
    //Crée l'objet contenant les informations du produit
    let product = {
      id: productId,
      quantity: Number(document.getElementById("quantity").value),
      color: document.getElementById("colors").value,
    };
    //Ajoute le produit au panier
    addToBasket(product);
    
  }
});
