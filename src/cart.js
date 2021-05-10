
// class Cart {
//     constructor({item_count, total_price, id}) {
//         this.itemCount = 0;
//         this.totalPrice = 0;
//         this.id = id
//     }
// }


// function createNewCart(){
//     fetch("http://localhost:3000/carts"), {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify ({
//             item_count: 0,
//             total_price: 0.00
//         }),
//         .then(resp => resp.json())
//         .then(cart=> {console.log(cart)
//         })
//         }
//     }

class Cart {

    constructor(cart){
        this.itemCount = cart.item_count
        this.totalPrice = cart.total_price
        this.id = cart.id
        this.items = cart.items
        debugger
    }

}
 
//being called in index.js
function createNewCart() {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({cart: {item_count: 0, total_price: 0}})
    }
    fetch("http://localhost:3000/carts", options)
    .then(r => r.json())
    // .then(cart => {console.log(cart)})
    .then (cart => {
        let newCart = new Cart(cart)
    })
    //create cart class THEN cart button
    // .then(cart => createCartButton(cart))
}
 
function createCartButton(cart){
    const cartDiv = document.getElementById('cartContainer')
    //get icon?
    const cartIcon = document.createElement("BUTTON")
    cartIcon.setAttribute('id', 'cart-icon')
    cartIcon.innerText = "Cart"
    cartDiv.appendChild(cartIcon)

    cartIcon.addEventListener('click', function(e){
        fetchCart(cart)
    })
}

function fetchCart(cart){
    fetch("http://localhost:3000/carts/1")
    .then(resp => resp.json())
    .then(cart => renderCart(cart))
} 

function renderCart(cart){

    const itemsDiv = document.getElementById('itemsContainer')
    itemsDiv.innerHTML = ""
    const items = cart.items

    //cart with total items
    const itemCount = document.createElement('h2')
    itemCount.innerText = `Cart (${cart.item_count})`
    itemsDiv.appendChild(itemCount)

    const closeButton = document.createElement("BUTTON");
    closeButton.textContent = "x"
    itemsDiv.appendChild(closeButton)

        closeButton.addEventListener('click', function(e){
            e.preventDefault
            fetchItems()
        })   

    for (let item of items) {
        // div for each item for future styling maybe
        const eachItemDiv = document.createElement('div')
        eachItemDiv.id = item.id
        itemsDiv.appendChild(eachItemDiv)

       //item name 
        const itemName = document.createElement('h4')
        itemName.innerText = item.name
        eachItemDiv.appendChild(itemName)

        //item price
        const itemPrice = document.createElement('li')
        itemPrice.innerText = `$${item.price}`
        eachItemDiv.appendChild(itemPrice)

        //not in itemsallitems function
        const itemDescription = document.createElement('p')
        itemDescription.innerText = item.description
        eachItemDiv.appendChild(itemDescription)

        //not in itemsAllItems function
        const addItemButton = document.createElement("BUTTON");
        addItemButton.textContent = 'Add'
        eachItemDiv.appendChild(addItemButton)
        //add event listener for this functionality
    
        //not in itemsallitems function
        const removeItemButton = document.createElement("BUTTON");
        removeItemButton.textContent = 'Remove'
        eachItemDiv.appendChild(removeItemButton)
        removeItemButton.addEventListener('click', function (e) {
            removeItemFromCart(item, eachItemDiv)
        })
        //event listeners for this functionality

    }    

    const totalPrice = document.createElement('h3')
    totalPrice.innerText = `Total: $${cart.total_price}`
    itemsDiv.appendChild(totalPrice)

}

//move to item controller
function removeItemFromCart(item, eachItemDiv) {

fetch(`http://localhost:3000/items/${item.id}`, {
  method: 'PATCH', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ id: item.id, name: item.name, description: item.description, price: item.price, cart_id: 2}
    ),
})
.then(response => response.json())
// .then(response => console.log(response))
.then(response => {eachItemDiv.remove()}  )
.catch((error) => {
  console.error('Error:', error);
});
}

function updateCart(){

}

function addToCart() {
    console.log("we are adding to cart!")

}

