let quantityIcon = document.querySelector('.cart-btn__items');
let panierContainer = document.getElementById('panier-container');
let infoSection = document.getElementById('information-section');


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

        infoSection.innerHTML = 
        `     
        <h3 class="information-title">Vos informations</h3>
      
        <div class="information-container">
            <form action="" method="" class="form-container">
                <div class="form-item">
                    <label for="prenom">Prénom:</label>
                    <input type="text" name="prenom" id="prenom" required>
                </div>
                <div class="form-item">
                    <label for="nom">Nom:</label>
                    <input type="text" name="nom" id="nom" required>
                </div>
                <div class="form-item">
                    <label for="address">Adresse: </label>
                    <input type="text" name="address" id="address" required>
                </div>
                <div class="form-item">
                    <label for="city">Ville: </label>
                    <input type="text" name="city" id="city" required>
                </div>
                <div class="form-item">
                    <label for="email">E-mail: </label>
                    <input type="email" name="email" id="email" required>
                </div>
                <div class="form-item">
                    <input class="form-submit-btn" type="submit" value="Passez la commande">
                </div>
            </form>
        </div>
        `
        
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
                    if (cart.length === 0) {
                        localStorage.removeItem('cart');
                    }
                    else{                        
                    localStorage.setItem('cart', JSON.stringify(cart));
                    }
                } 
                else {                
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
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
                if (cart.length === 0){
                    localStorage.removeItem('cart');
                }
                else{
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
                setIconValue();
                setCartValues();    
            })
        })

    }
    else{
        panierContainer.innerHTML = "<p class='sorrymessage'>Oups, votre panier est vide :(</p>"
        infoSection.innerHTML="";
    }

}


document.addEventListener('DOMContentLoaded', () => {
    setIconValue();
    setCartValues();
})
