let idTeddy = window.location.search.substr(5);
let productTitle = document.querySelector('.product-item__title');
let productImg = document.querySelector('.product-item__img');
let productDescription = document.querySelector('.product-item__description');
let productPrice = document.querySelector('.product-item__price');


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
        this.afficherColoris(data);
    }
    afficherColoris(data){
        let coloris = data.colors;
        let teddySelect = document.querySelector('.teddy-coloris')
        coloris.forEach(coloris => {
            let option = document.createElement('option');
            console.log(coloris)
            option.value = coloris;
            option.text = coloris;
            teddySelect.appendChild(option);
        })
        
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const products = new Products();
    const ui = new UI();

    products.
    getProduct(idTeddy)
    .then(data =>{
        ui.displayProduct(data);
    })
})