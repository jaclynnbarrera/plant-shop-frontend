let newCart

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
        cartIcon.setAttribute('class', 'cart-button')
        cartIcon.innerText = "Cart"
        cartDiv.appendChild(cartIcon)
        cartIcon.addEventListener("click", this.fetchCart.bind(this));
    }

    fetchCart(){
        debugger
        fetch(`http://localhost:3000/carts/${this.id}`)
        .then(resp => resp.json())
        .then(resp => {
            const itemsss = resp.items
            this.refreshCart(itemsss)
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

    refreshCart(items){
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
                    let cartId = items[0].cart_id
                    let itemId = item.id
                    this.removeItemFromCart(itemId)
                })
         }
    }

    removeItemFromCart(itemId){ 
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({cart_id: 1})
        }
        fetch(`http://localhost:3000/items/${itemId}`, options)
        .then(r => r.json())
        // .then(r => fetchCart() )

    }

    addItemToCart(){
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({cart_id: newCart.id})
        }
        fetch(`http://localhost:3000/items/${this.id}`, options)
        .then(r => r.json())
        .then(r => {console.log(r)})
        .then(r => {
            newCart.fetchCart()
        })
    }//

    static createNewCart() {
        return fetch("http://localhost:3000/carts/2")
        .then(r => r.json())
        .then(cart => {
            newCart = new Cart(cart)
            newCart.createCartButton()
        })
    }
}//endofcartclass