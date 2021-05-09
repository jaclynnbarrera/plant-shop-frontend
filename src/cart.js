
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
    // .then(cart => createCartButton(cart))
    .then(cart => console.log(cart))
}
 
//being called in index.js
function createCartButton(){
    const cartDiv = document.getElementById('cartContainer')
    //get icon?
    const cartIcon = document.createElement("BUTTON")
    cartIcon.setAttribute('id', 'cart-icon')
    cartIcon.innerText = "Cart"
    cartDiv.appendChild(cartIcon)

    cartIcon.addEventListener('click', function(e){
        fetchCart()
    })
}

function fetchCart(){
    //change fetch url to individ cart that has been created
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
        itemsDiv.appendChild(eachItemDiv)

       //item name 
        const itemName = document.createElement('h4')
        itemName.innerText = item.name
        eachItemDiv.appendChild(itemName)

        //item price
        const itemPrice = document.createElement('li')
        itemPrice.innerText = `$${item.price}`
        eachItemDiv.appendChild(itemPrice)

        // allItems(cart.items)

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
        //event listeners for this functionality

    
    }    

    const totalPrice = document.createElement('h3')
    totalPrice.innerText = `Total: $${cart.total_price}`
    itemsDiv.appendChild(totalPrice)

}

function addToCart() {
    console.log("we are adding to cart!")

}

