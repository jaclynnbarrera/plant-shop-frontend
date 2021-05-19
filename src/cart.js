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
        const cartIcon = document.createElement('img')
        cartIcon.src = 'images/shopping-cart-black-shape.png'

        cartIcon.setAttribute('id', this.id)
        cartIcon.setAttribute('class', 'cart-button')

        cartDiv.appendChild(cartIcon)
        cartIcon.addEventListener("click", this.fetchCart.bind(this));
    }

    fetchCart(){
        return fetch(`http://localhost:3000/carts/${this.id}`)
        .then(resp => resp.json())
        .then(resp => this.renderCart(resp))
    }

    renderCart(){

        let totalPriceArr = []
    
        const itemsDiv = document.getElementById('itemsContainer')
        itemsDiv.innerHTML = ""

        const cart = document.createElement('div')
        cart.id = "cart-div"
        itemsDiv.appendChild(cart)

        const itemCount = document.createElement('h2')
        itemCount.innerText = `Cart (${this.items.length})`
        cart.appendChild(itemCount)

        const closeButton = document.createElement("BUTTON");
        closeButton.textContent = "x"
        cart.appendChild(closeButton)

        closeButton.addEventListener('click', function(e){
            e.preventDefault()
            itemsDiv.innerHTML = ""
            fetchItems()
        })

        for (let item of this.items) {

            const eachItemDiv = document.createElement('div')
            eachItemDiv.id = item.id
            cart.appendChild(eachItemDiv)
            
            const itemName = document.createElement('h4')
            itemName.innerText = item.name
            eachItemDiv.appendChild(itemName)

            const itemImage = document.createElement('img')
            itemImage.src = item.image_link
            eachItemDiv.appendChild(itemImage)
            
            const itemPrice = document.createElement('p')
            //grabbing each price to get sum
            totalPriceArr.push(item.price)
            itemPrice.innerText = `$${item.price}`
            eachItemDiv.appendChild(itemPrice)

            const removeItemButton = document.createElement("BUTTON");
            removeItemButton.textContent = "Remove"
            eachItemDiv.appendChild(removeItemButton)

                removeItemButton.addEventListener("click", this.removeItemFromCart.bind(item))
         }//endof loop

         const totalPrice = document.createElement('h2')
         totalPrice.innerText = `Total: $${totalPriceArr.reduce((a,b) => a + b, 0)}.00 `
         cart.appendChild(totalPrice)
    }//end of render cart

    addItemToCart(){
        //this is the item
        newCart.items.push(this)
        newCart.renderCart()

        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({cart_id: newCart.id})
        }
        return fetch(`http://localhost:3000/items/${this.id}`, options)
        .then(r => r.json())
        // .then(r => {console.log(r)})
        .then(r => {
            newCart.fetchCart()
        })
    }//

    removeItemFromCart(){
        let toRemove = newCart.items.find(item => item.id == this.id)
        newCart.items.pop(toRemove)
        newCart.renderCart()

        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({cart_id: 1})
        }
        return fetch(`http://localhost:3000/items/${this.id}`, options)
        .then(r => r.json())
        // .then(r => {console.log(r)})
        .then(r => {
            newCart.fetchCart()
        })
    }

    static createNewCart() {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({item_count: 0, total_price: 0})
        }
        return fetch("http://localhost:3000/carts", options)
        .then(r => r.json())
        .then(cart => {
            newCart = new Cart(cart)
            newCart.createCartButton()
        })
    }

}