let idTeddy = window.location.search.substr(5);
let productTitle = document.querySelector('.product-item__title');
let productImg = document.querySelector('.product-item__img');
let productDescription = document.querySelector('.product-item__description');
let productPrice = document.querySelector('.product-item__price');
let bagBtn = document.querySelector('.product-item__btn');

//cart
let cart =[];


class Products{
    async getProduct(id){
    let result = await fetch(`http://localhost:3000/api/teddies/${id}`);
    let data = await result.json();
    return data;
    }
}

class UI{
    displayProduct(data){   
        productTitle.innerText= data.name;
        productImg.src= data.imageUrl;
        productDescription.innerText= data.description;
        productPrice.innerText= data.price +'$';
        bagBtn.dataset.id = data._id;
        this.afficherColoris(data);
    }
    afficherColoris(data){
        let coloris = data.colors;
        let teddySelect = document.querySelector('.teddy-coloris')
        coloris.forEach(coloris => {
            let option = document.createElement('option');
            option.value = coloris;
            option.text = coloris;
            teddySelect.appendChild(option);
        })
        
    }

    getBagButton(){
        bagBtn.addEventListener('click', function(e){
            e.preventDefault();
            let itemId =e.target.dataset.id;
            //get product from products
            let cartItem = Storage.getProduct(itemId);
            //add product to the cart
            cart.push(cartItem);
            console.log(cart)
            //save the cart
            Storage.saveCart(cart);
        })
    }
    
    //verifier si le cart est vide
    setupApp(){
        cart = Storage.getCart();
    }


}

//local storage
class Storage{
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find( product => product._id === id);
    }
    static saveCart(cart){
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart(){
        return localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const products = new Products();
    const ui = new UI();

    ui.setupApp();

    products.
    getProduct(idTeddy)
    .then(data =>{
        ui.displayProduct(data);
    })
    .then( () =>{
        ui.getBagButton();
    })
})