let productsDOM = document.getElementById('products-container__inner');

fetch('http://localhost:3000/api/teddies')
    .then(response => response.json())
    .then(response => {
        let data = response;
        console.log(data)
        let result ="";
        data.forEach(item => {
            console.log(item.imageUrl)
            result += `
            <!--item-->
        <div class="product-item">
          <h2 class="product-item__title">${item.name}</h2>
          <img class="product-item__img" src="${item.imageUrl}" alt="item">
          <p class="product-item__description">${item.description}</p>
          <p class="product-item__price">${item.price}$</p>
          <button class="product-item__btn">Ajouter au panier!</button>
        </div>
        <!--item end-->
         `;
            productsDOM.innerHTML = result;
        })
        

    })
