
class Item {
    
    constructor(item){
        this.name = item.name
        this.description = item.description
        this.price = item.price
        this.cart_id = item.cart_id
        this.image_link = item.image_link
    }

     renderItem() {
        console.log("we are in renderItem")

        const itemsDiv = document.getElementById('itemsContainer')
     
        //setting up individual div and appending to all items div
        const eachItemDiv = document.createElement('div')
        eachItemDiv.id = "single-item"
        itemsDiv.appendChild(eachItemDiv)

        const itemName = document.createElement('h4')
        itemName.innerText = this.name
        eachItemDiv.appendChild(itemName)
    
        const itemPrice = document.createElement('li')
        itemPrice.innerText = `$${this.price}`
        eachItemDiv.appendChild(itemPrice)

        const itemImage = document.createElement('img')
        itemImage.src = this.image_link
        eachItemDiv.appendChild(itemImage)
    
        const infoButton = document.createElement("BUTTON");
        infoButton.textContent = 'See more info'
        eachItemDiv.appendChild(infoButton)
        // infoButton.addEventListener("click", item.fetchSingleItem.bind(item))
    
        // infoButton.addEventListener('click', function(e){      
        // e.preventDefault()

        // // //then this will head to single item function
        // //         item.fetchSingleItem.bind(item)})

    }

    fetchSingleItem(e) {
        e.preventDefault()
        "we are in fetch"
        // debugger
        fetch (`http://localhost:3000/items/${this.id}`)
        .then(resp => resp.json())
        .then(this.singleItem.bind(this))
    }


    singleItem (){

        const itemsDiv = document.getElementById('itemsContainer')
        
        const singleItemDiv = document.createElement('div')
        itemsDiv.appendChild(singleItemDiv)
    
        const itemName = document.createElement('h2')
        itemName.innerText = item.name
        singleItemDiv.appendChild(itemName)
    
        const itemDescription = document.createElement('li')
        itemDescription.innerText = item.description
        singleItemDiv.appendChild(itemDescription)
    
        const itemPrice = document.createElement('li')
        itemPrice.innerText = `$${item.price}`
        singleItemDiv.appendChild(itemPrice)
    
        const cartButton = document.createElement("BUTTON");
        cartButton.setAttribute('id', 'add-to-cart')
        cartButton.innerText = "Add to Cart"
        singleItemDiv.appendChild(cartButton)
    
        
        cartButton.addEventListener('click', function(e){
            e.preventDefault
            addToCart()
        })
    
        const closeButton = document.createElement("BUTTON");
        closeButton.textContent = "x"
        singleItemDiv.appendChild(closeButton)
    
            closeButton.addEventListener('click', function(e){
                e.preventDefault
                fetchItems()
            })   
    }


   
}//endof class

function fetchItems(){
    fetch("http://localhost:3000/items")
    .then (r => r.json())
    .then(items => {
        items.map(item => new Item(item).renderItem())
    })
}