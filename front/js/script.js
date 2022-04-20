/*********************Recupération des produits depuis l'API*********************/
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  /********La fonction permet d'integrer les produits sur index.html ********/
  .then(function (products) {
    for (let product of products) {
      document.querySelector(".items").innerHTML += `
        <a href="./product.html?id=${product._id}" class="test">
          <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}"></img>
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
          </article>
        </a>`;
    }
  })
  .catch((err) => console.log(err));
