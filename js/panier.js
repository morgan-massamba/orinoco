let quantityIcon = document.querySelector('.cart-btn__items');
let itemImage = document.querySelector('.panier-image img');
let itemName = document.querySelector('.panier-name');
let itemPrice = document.querySelector('.panier-price');
let itemQuantity = document.querySelector('.panier-quantity__inner');
let itemQuantityPlus = document.querySelector('.panier-quantity__icon.plus');
let itemQuantityMoins = document.querySelector('.panier-quantity__icon.moins');
let deleteIcon = document.querySelector('.delete-icon');
let itemTotal = document.querySelector('.panier-total span');
let panierContainer = document.getElementById('panier-container');


//Afficher les valeurs dans l'icône orange du panier;
function setIconValue(){
    let tempQuantity = 0;

    if ( localStorage.getItem('cart') ){
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

//Afficher nom, prix, quantité des items du localStorage en HTML
function setCartValues(){
    if(localStorage.getItem('cart')){

        let cart = JSON.parse(localStorage.getItem('cart'));

        let total = 0;
        let result = "";

        cart.forEach(item =>{
            total += (item.prix * item.quantite);

            result += `
            <!--Debut Item-->
            <div class="panier-item">
                <div class="panier-image">
                    <img src="${item.imageUrl}" alt="ours">
                </div>
                <p class="panier-name">${item.nom}</p>
                <p class="panier-price"><span>${(item.prix * item.quantite)}</span> €</p>
                <div class="panier-quantity">
                    <div class="panier-quantity__icon moins">
                        <i class="fas fa-minus"></i>
                    </div>
                    <p class="panier-quantity__inner">${item.quantite}</p>
                    <div class="panier-quantity__icon plus">
                        <i class="fas fa-plus"></i>
                    </div>
                </div>  
                <div class="delete-icon">
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>
            `
            panierContainer.innerHTML = result;

        })

        panierContainer.insertAdjacentHTML("beforeend", 
        `<div class="panier-item">
        <p class="panier-total">Total: <span>${total}</span> €</p>
        </div>
        `
        )

    }

}

document.addEventListener('DOMContentLoaded', () => {
    setIconValue();
    setCartValues();

})