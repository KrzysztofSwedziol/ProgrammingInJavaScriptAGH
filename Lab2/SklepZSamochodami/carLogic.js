const buyers = [];
const addBuyerBMWForm = document.getElementById('addBuyerBMW');
const addBuyerMercForm = document.getElementById(("addBuyerMerc"));
const addBuyerAudiForm = document.getElementById(("addBuyerAudi"));
const addBuyerKenForm = document.getElementById(("addBuyerKen"));
const commandForms = document.getElementById("commandForms")
const Magazine = {
    'BMW' : [20, " Silnik benzynowy 999 cm³ ", "Skrzynia biegów manualna ", "Price : 700k" ],
    'Merc' : [15, " Silnik benzynowy 1200 cm³ ", "zasięg 500km ", "Price : 600k"],
    'Audi' : [30, " Price : 500k"],
    'Ken' : [1, "price : 1M"]
}
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
loadBuyersFromLocalStorage();
addBuyerBMWForm.addEventListener('submit', function(event){
    event.preventDefault();
    const currBuyerInput = document.getElementById('buyerNameBMW');
    const buyerName = currBuyerInput.value.trim();
    if(buyerName != '' && Magazine.BMW[0] > 0){
        addBuyer(buyerName, 'BMW', 700000);
        currBuyerInput.value = '';
    }else{
        console.log('invalid user');
    }
})
addBuyerMercForm.addEventListener('submit', function(event){
    event.preventDefault();
    const currInput = document.getElementById('buyerNameMerc');
    const buyerName = currInput.value.trim();
    if(buyerName != '' && Magazine.Merc[0]>0){
        addBuyer(buyerName, 'Merc', 600000);
        currInput.value = '';
    }else{
        console.log('invalid user');
    }

})
addBuyerAudiForm.addEventListener('submit', function(event){
    event.preventDefault();
    const currInput = document.getElementById('buyerNameAudi');
    const buyerName = currInput.value.trim();
    if(buyerName != '' && Magazine.Audi[0] > 0){
        addBuyer(buyerName, 'Audi', 500000);
        currInput.value = '';
    }else{
        console.log('invalid user');
    }

})
addBuyerKenForm.addEventListener('submit', function(event){
    event.preventDefault();
    const currInput = document.getElementById('buyerNameKen');
    const buyerName = currInput.value.trim();
    if(buyerName != '' && Magazine.Ken[0] > 0){
        addBuyer(buyerName, 'Ken', 1000000);
        currInput.value = '';
    }else{
        console.log('invalid user');
    }

})
commandForms.addEventListener('submit', function (event){
    event.preventDefault();
    var currCommand = document.getElementById("commandInput");
    var currCom = currCommand.value.trim();
    switch(currCom){
        case "magazineStatus":
            for(const key in Magazine){
                console.log(key, ' ', Magazine[key]);
            }
            break;
        case "clientList":
            for(const buyer of buyers){
                console.log(buyer.name, ' ', buyer.productsBought, ' ',buyer.fullPrice);
            }
            break;
        default:
            console.log("unknown command");
    }

})
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
            Magazine.BMW[0]--;
            break;
        case "Merc":
            Magazine.Merc[0]--;
            break;
        case "Audi":
            Magazine.Audi[0]--;
            break;
        case "Ken":
            Magazine.Ken[0]--;
            break;
    }
    saveBuyersToLocalStorage();
}
function showClients(){
    for(client of buyers){
        console.log(client.name,' ', client.productsBought, ' ', client.fullPrice)
    }
}
