buyers = [];
const Magazine = {
    'BMW': {
        quantity: 20,
        features: ["Silnik benzynowy 999 cm³", "Skrzynia biegów manualna", "Price: 700k"],
        imagePath: "carPhotos/BMW.jpg"
    },
    'Merc': {
        quantity: 15,
        features: ["Silnik benzynowy 1200 cm³", "zasięg 500km", "Price: 600k"],
        imagePath: "carPhotos/merc.jpg"
    },
    'Audi': {
        quantity: 30,
        features: ["Price: 500k"],
        imagePath: "carPhotos/audica.jpg"
    },
    'Ken': {
        quantity: 1,
        features: ["price: 1M"],
        imagePath: "carPhotos/just ken.jpg"
    }
};
class Person{
    constructor(name) {
        this.name = name;
        this.productsBought = [];
        this.fullPrice = 0;
    }
    addNewProduct(product, price){
        this.fullPrice = this.fullPrice + price;
        this.productsBought.push(product);
    }
    displayInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Products Bought: ${this.productsBought}, Full Price: ${this.fullPrice}`);
    }
}
function saveBuyersToLocalStorage() {
    localStorage.setItem('buyers', JSON.stringify(buyers));
}

function loadBuyersFromLocalStorage() {
    const storedBuyers = localStorage.getItem('buyers');
    if (storedBuyers) {
        const buyersArray = JSON.parse(storedBuyers);
        for (const buyerData of buyersArray) {
            const buyer = new Person(buyerData.name);
            buyer.productsBought = buyerData.productsBought;
            buyer.fullPrice = buyerData.fullPrice;
            buyers.push(buyer);
        }
    }
}
function isBuyerInList(buyer) {
    for (const person of buyers) {
        if (person.name === buyer) {
            return person;
        }
    }
    return false;
}
function addBuyer(name, product, price){
    var potentialBuyer = isBuyerInList(name)
    if(potentialBuyer === false){
        var currBuyer = new Person(name);
        currBuyer.addNewProduct(product, price);
        buyers.push(currBuyer);
        console.log("added buyer")
    }else{
        potentialBuyer.addNewProduct(product, price);
        console.log("added product to buyer")
    }
    switch(product){
        case "BMW":
            Magazine.BMW.quantity--;
            break;
        case "Merc":
            Magazine.Merc.quantity--;
            break;
        case "Audi":
            Magazine.Audi.quantity--;
            break;
        case "Ken":
            Magazine.Ken.quantity--;
            break;
    }
    saveBuyersToLocalStorage();
}
function showClients(){
    for(client of buyers){
        console.log(client.name,' ', client.productsBought, ' ', client.fullPrice)
    }
}

function initializeProducts() {
    if (!localStorage.getItem('products')) {
        const productsArray = Object.entries(Magazine).map(([name, details]) => {
            return {
                name: name,
                quantity: details.quantity,
                features: details.features,
                imagePath: details.imagePath,
                className: name.replace(/\s+/g, '') // Remove any whitespace for the class name
            };
        });
        localStorage.setItem('products', JSON.stringify(productsArray));
    }
}


function displayProducts(){
    const container = document.getElementById('productsContainer');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const cardHtml = `
            <div class="card col-sm-12 col-md-5 ${product.className}">
                <img src="${product.imagePath}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2>${product.name}</h2>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <form id = "addBuyer${product.name}">
                        <label for="buyerName${product.name}">Name</label>
                        <input type="text" id="buyerName${product.name}" name="buyerName${product.name}"><br>
                        <button type="submit">Buy</button>
                    </form>
                </div>
            </div>
        `;
        productsContainer.innerHTML += cardHtml;
    });
}

document.addEventListener('DOMContentLoaded', function(){
    initializeProducts();
    displayProducts();
    loadBuyersFromLocalStorage();

    const addBuyerBMWForm = document.getElementById('addBuyerBMW');
    const addBuyerMercForm = document.getElementById('addBuyerMerc');
    const addBuyerAudiForm = document.getElementById('addBuyerAudi');
    const addBuyerKenForm = document.getElementById('addBuyerKen');
    const commandForms = document.getElementById('commandForms');

    if (addBuyerBMWForm) {
        addBuyerBMWForm.addEventListener('submit', function(event){
            event.preventDefault();
            const currBuyerInput = document.getElementById('buyerNameBMW');
            const buyerName = currBuyerInput.value.trim();
            if(buyerName != '' && Magazine.BMW.quantity > 0){
                addBuyer(buyerName, 'BMW', 700000);
                currBuyerInput.value = '';
            }else{
                console.log('invalid user');
            }
        })
    }
    if (addBuyerMercForm) {
        addBuyerMercForm.addEventListener('submit', function(event){
            event.preventDefault();
            const currInput = document.getElementById('buyerNameMerc');
            const buyerName = currInput.value.trim();
            if(buyerName != '' && Magazine.Merc.quantity>0){
                addBuyer(buyerName, 'Merc', 600000);
                currInput.value = '';
            }else{
                console.log('invalid user');
            }

        })
    }
    if (addBuyerAudiForm) {
        addBuyerAudiForm.addEventListener('submit', function(event){
            event.preventDefault();
            const currInput = document.getElementById('buyerNameAudi');
            const buyerName = currInput.value.trim();
            if(buyerName != '' && Magazine.Audi.quantity > 0){
                addBuyer(buyerName, 'Audi', 500000);
                currInput.value = '';
            }else{
                console.log('invalid user');
            }

        })
    if (addBuyerKenForm) {
        addBuyerKenForm.addEventListener('submit', function(event){
            event.preventDefault();
            const currInput = document.getElementById('buyerNameKen');
            const buyerName = currInput.value.trim();
            if(buyerName != '' && Magazine.Ken.quantity > 0){
                addBuyer(buyerName, 'Ken', 1000000);
                currInput.value = '';
            }else{
                console.log('invalid user');
            }

        })
    }
    if (commandForms) {
        commandForms.addEventListener('submit', function(event){

        });
    }
    else {
        console.error("Form or command input not found!");
    }
}})



