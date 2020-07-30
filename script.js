let productsDOM = document.getElementById('products-container__inner');

let cart =[];

//getting the products
class Products{
    async getProducts(){
        try{
            let result = await fetch('http://localhost:3000/api/teddies');
            let data = await result.json();
            return data;
        }
        catch(error){
            console.log(error);
        }  
    }
}

//display products
class UI{
    displayProducts(data){
        let result ="";
            data.forEach(item => {
                result += `
                <!--item-->
            <div class="product-item">
            <h2 class="product-item__title">${item.name}</h2>
            <img class="product-item__img" src="${item.imageUrl}" alt="item">
            <p class="product-item__description">${item.description}</p>
            <p class="product-item__price">${item.price}$</p>
            <a href="./page_produit.html?&id=${item._id}"><button class="product-item__btn" data-id=${item._id}>Choisir le coloris</button></a>
            </div>
            <!--item end-->
            `;
            productsDOM.innerHTML = result;
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products();

    products.
    getProducts()
    .then(products => {
        ui.displayProducts(products);
    })
})