let quantityIcon = document.querySelector('.cart-btn__items');
let itemImage = document.querySelector('.panier-image img');
let itemName = document.querySelector('.panier-name');
let itemPrice = document.querySelector('.panier-price');
let itemQuantity = document.querySelector('.panier-quantity__inner');
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
                    <div class="panier-quantity__icon">
                        <i class="panier-quantity__icon--moins fas fa-minus" data-id="${item._id}"></i>
                    </div>
                    <p class="panier-quantity__inner">${item.quantite}</p>
                    <div class="panier-quantity__icon">
                        <i class="panier-quantity__icon--plus fas fa-plus" data-id="${item._id}"></i>
                    </div>
                </div>  
                <div class="delete-icon">
                    <i class="fas fa-trash-alt" data-id="${item._id}"></i>
                </div>
            </div>
            `
        })
        panierContainer.innerHTML = result;

        panierContainer.insertAdjacentHTML("beforeend", 
        `<div class="panier-item">
        <p class="panier-total">Total: <span>${total}</span> €</p>
        </div>
        `
        )
        
        //Augmenter la quantite quand on appuie sur le +
        const itemQuantityPlus = document.querySelectorAll('.panier-quantity__icon--plus');
        itemQuantityPlus.forEach(btn => {
            btn.addEventListener('click', e =>{
                //on prend l'id du bouton sur lequel on à cliqué
                let id = e.target.dataset.id;

                //on cherche l'item qui à le même id dans le localStorage
                itemToUpdate = cart.find( element => element._id === id);

                //et on augmente sa quantite
                itemToUpdate.quantite += 1;

                //ensuite on enregistre les nouvelles valeurs dans le localStorage
                localStorage.setItem('cart', JSON.stringify(cart));

                //mise a jour de l'icone panier
                setIconValue();
                //mise a jour des valeurs des items HTML
                setCartValues();        
            })
        })

         //Diminuner la quantite quand on appuie sur le -
        const itemQuantityMoins = document.querySelectorAll('.panier-quantity__icon--moins');
        itemQuantityMoins.forEach(btn => {
            btn.addEventListener('click', e =>{
                let id = e.target.dataset.id;
                let itemToUpdate = cart.find( element => element._id === id );
                itemToUpdate.quantite--;

                if (itemToUpdate.quantite <= 0) {
                cart = cart.filter(element => element._id !== id)
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                setIconValue();
                setCartValues();
            })
        })

        //Supprimer un item quand on appuie sur l'icône
        const deleteIcon = document.querySelectorAll('.delete-icon');
        deleteIcon.forEach(btn => {
            btn.addEventListener('click', e =>{
                let id = e.target.dataset.id;

                cart = cart.filter(element => element._id !== id)

                localStorage.setItem('cart', JSON.stringify(cart));
                setIconValue();
                setCartValues();    
            })
        })

    }
    


}


document.addEventListener('DOMContentLoaded', () => {
    setIconValue();
    setCartValues();
})
