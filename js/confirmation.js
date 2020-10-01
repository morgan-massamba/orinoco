let quantityIcon = document.querySelector('.cart-btn__items');
let orderSpan = document.querySelector('.order_id');
let totalSpan = document.querySelector('.order_total');

document.addEventListener('DOMContentLoaded', () => {
    setIconValue();
    displayConfirmation();
})

function displayConfirmation(){
    if (localStorage.getItem('orderId')) {
        let orderId = JSON.parse(localStorage.getItem('orderId'));
        orderSpan.innerText = orderId;
        localStorage.removeItem('orderId');
    }

    if (localStorage.getItem('total')) {
        let total = JSON.parse(localStorage.getItem('total'));
        totalSpan.innerText = total;
        localStorage.removeItem('total');
    }

}

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


