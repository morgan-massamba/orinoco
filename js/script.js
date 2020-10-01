let productsDOM = document.getElementById('products-container__inner');
let quantityIcon = document.querySelector('.cart-btn__items');

//getting the products
async function getProducts(){
        try{
            let result = await fetch('http://localhost:3000/api/teddies');
            let data = await result.json();
            return data;
        }
        catch(error){
            console.log(error);
        }  
    }

//display products
function displayProducts(data){
        let result ="";
            data.forEach(item => {
                result += `
                <!--item-->
            <div class="product-item">
            <h2 class="product-item__title">${item.name}</h2>
            <img class="product-item__img" src="${item.imageUrl}" alt="item">
            <p class="product-item__description">${item.description}</p>
            <p class="product-item__price">${(item.price/100)}€</p>
            <a href="./page_produit.html?&id=${item._id}"><button class="product-item__btn" data-id=${item._id}>Choisir le coloris</button></a>
            </div>
            <!--item end-->
            `;
            productsDOM.innerHTML = result;
        })
}

//set IconValue();
function setIconValue(){
    let tempQuantity = 0;

    if ( localStorage.getItem('cart')){
        let cart = JSON.parse(localStorage.getItem('cart'));

        cart.forEach(produit => {
            tempQuantity += produit.quantite;
            quantityIcon.innerHTML = tempQuantity;
        })
    }
    else{
        quantityIcon.innerHTML = tempQuantity;
    }

}

document.addEventListener('DOMContentLoaded', () => {
    setIconValue();

    getProducts()
    .then(products => {
        displayProducts(products);
    })
})