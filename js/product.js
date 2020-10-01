//recuperer l'id de l'ourson sur la page en question 
let idTeddy = window.location.search.substr(5);

let productTitle = document.querySelector('.product-item__title');
let productImg = document.querySelector('.product-item__img');
let productDescription = document.querySelector('.product-item__description');
let productPrice = document.querySelector('.product-item__price');
let bagBtn = document.querySelector('.product-item__btn');
let quantityIcon = document.querySelector('.cart-btn__items');

//recuperer les data de l'ourson 
async function getOneProduct(id){
    let result = await fetch(`http://localhost:3000/api/teddies/${id}`);
    let data = await result.json();
    return data;
}

//afficher les data en HTML
function displayProduct(data){   
        productTitle.innerText= data.name;
        productImg.src= data.imageUrl;
        productDescription.innerText= data.description;
        productPrice.innerText= (data.price/100) +'$';
        bagBtn.dataset.id = data._id;
        afficherColoris(data);
        getBagButton(data);
    }

function afficherColoris(data){
        let coloris = data.colors;
        let teddySelect = document.querySelector('.teddy-coloris')
        coloris.forEach(coloris => {
            let option = document.createElement('option');
            option.value = coloris;
            option.text = coloris;
            teddySelect.appendChild(option);
        })
}
        
    
function getBagButton(data){
        bagBtn.addEventListener('click', function(e){
            e.preventDefault();

            //cart
            let cart=[];

            //on creer un objet avec les valeurs de l'ourson 
            let cartItem = {
                    _id : data._id,
                    quantite : 1,
                    nom: data.name,
                    prix: (data.price/100),
                    imageUrl : data.imageUrl,
                    couleurs : data.colors
            }

            let nouveauItem = true;

            if (localStorage.getItem('cart') === null) {
                cart.push(cartItem);
                localStorage.setItem('cart', JSON.stringify(cart));
            }

            else if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));

                //si l'_id de cartItem est le même que celui d'un produit du localStorage, on augmente juste la quantite
                cart.forEach(prod =>{
                    if (prod._id === cartItem._id){
                        prod.quantite++;    
                        nouveauItem = false;              
                    }
                })

                //si c'est un nouvel item alors on l'ajoute à l'array cart
                if (nouveauItem){
                    cart.push(cartItem);
                }

                localStorage.setItem('cart', JSON.stringify(cart));

            }

                //afficher les valeurs dans l'icône baskets
                setIconValue();
        })
}

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

    getOneProduct(idTeddy)
    .then(data =>{
        displayProduct(data);
    })
})