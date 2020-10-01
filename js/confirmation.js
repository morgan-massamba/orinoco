let quantityIcon = document.querySelector('.cart-btn__items');
let section = document.querySelector('.confirmation-container');
let orderId = JSON.parse(localStorage.getItem('orderId'));
let contact = JSON.parse(localStorage.getItem('contact'));
let total = JSON.parse(localStorage.getItem('total'));

document.addEventListener('DOMContentLoaded', () => {
    setIconValue();
    displayConfirmation();
})

function displayConfirmation(){
        section.innerHTML = 
        `
        <div class="sentence">
            <p>Nous vous remercions de votre achat :)</p>         
        </div>
        <div class="sentence">
            <p>Votre commande n° <span class="order_id">${orderId}</span> sera expédiée dans les plus bref delais.</p>         
        </div>
        <div class="sentence">
            <p>Prénom: ${contact.firstName} <br> Nom : ${contact.lastName} <br> Adresse : ${contact.address}<br> Ville: ${contact.city}<br> Email : ${contact.email}</p>         
        </div>
        <div class="sentence">
            <p>Total: <span class="order_total">${total}</span>€</p>         
        </div>
        `
        localStorage.removeItem('orderId');
        localStorage.removeItem('contact');
        localStorage.removeItem('total');
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


