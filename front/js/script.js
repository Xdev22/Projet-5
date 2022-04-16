/*********************Recupération des produits depuis l'API*********************/
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  /********La fonction permet d'integrer les produits sur index.html ********/
  .then(function (products) {
    for (let i = 0; i < products.length; i++) {
      document.querySelector(".items").innerHTML += `
        <a href="./product.html?id=${products[i]._id}" class="test">
          <article>
            <img src="${products[i].imageUrl}" alt="${products[i].altTxt}"></img>
            <h3 class="productName">${products[i].name}</h3>
            <p class="productDescription">${products[i].description}</p>
          </article>
        </a>`;
    }
  })
  .catch((err) => console.log(err));
