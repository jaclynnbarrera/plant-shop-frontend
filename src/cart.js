
class Cart {

    constructor(cart){
        this.itemCount = cart.item_count
        this.totalPrice = cart.total_price
        this.id = cart.id
        this.items = cart.items
    }

    createCartButton(){
        const cartDiv = document.getElementById('cartContainer')
        const cartIcon = document.createElement("BUTTON")
        cartIcon.setAttribute('id', this.id)
        cartIcon.innerText = "Cart"
        cartDiv.appendChild(cartIcon)
        cartIcon.addEventListener("click", this.fetchCart.bind(this));
    }

    fetchCart(){
        fetch(`http://localhost:3000/carts/${this.id}`)
        .then(resp => resp.json())
        .then(resp => {
            const itemsss = resp.items
            Cart.refreshCart(itemsss)
        })
    }

    static updateCart(cartId){
        console.log("we are in update cart!")
        fetch(`http://localhost:3000/carts/${cartId}`)
        .then(resp => resp.json())
        .then(resp => {
            let items = resp.items
            Cart.refreshCart(items)
        })
    }

    static refreshCart(items){

        const totalPrice = []

        const itemsDiv = document.getElementById('itemsContainer')
        itemsDiv.innerHTML = ""

        const cart = document.createElement('div')
        cart.id = "cart-div"
        itemsDiv.appendChild(cart)

        const itemCount = document.createElement('h2')
        itemCount.innerText = `Cart (${items.length})`
        cart.appendChild(itemCount)

        const closeButton = document.createElement("BUTTON");
        closeButton.textContent = "x"
        cart.appendChild(closeButton)

        closeButton.addEventListener('click', function(e){
            e.preventDefault()
            itemsDiv.innerHTML = ""
            fetchItems()
        })

        for (let item of items) {

            const eachItemDiv = document.createElement('div')
            eachItemDiv.id = item.id
            cart.appendChild(eachItemDiv)
            
            const itemName = document.createElement('h4')
            itemName.innerText = item.name
            eachItemDiv.appendChild(itemName)
            
            const itemPrice = document.createElement('li')
            totalPrice.push(item.price)
            itemPrice.innerText = `$${item.price}`
            eachItemDiv.appendChild(itemPrice)
            
            const itemDescription = document.createElement('p')
            itemDescription.innerText = item.description
            eachItemDiv.appendChild(itemDescription)

            const removeItemButton = document.createElement("BUTTON");
            removeItemButton.textContent = "Remove"
            eachItemDiv.appendChild(removeItemButton)

                removeItemButton.addEventListener("click", function(e){
                    e.preventDefault()
                    eachItemDiv.innerHTML = ""
                    console.log("done")
                })
         }//end offorloop

        // const totalPriceDisplay = document.createElement("h3");
        // totalPriceDisplay.innerHTML = `Total: $${totalPrice.reduce((a,b) => a + b, 0)}`
        // cart.appendChild(totalPriceDisplay)
        
    }//endofRefreshCart


}//endofcartclass

// being called in index.js
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
        console.log(cart)
        let newCart = new Cart(cart)
        newCart.createCartButton()
    })
}//end of createnewcart

function removeItemFromCart(item, eachItemDiv) {

fetch(`http://localhost:3000/items/${item.id}`, {
  method: 'PATCH', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ id: item.id, name: item.name, description: item.description, price: item.price, cart_id: 1}
    ),
})
.then(response => response.json())
// .then(response => console.log(response))
.then(response => {eachItemDiv.remove()}  )
.catch((error) => {
  console.error('Error:', error);
    });
}