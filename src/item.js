
//static
function fetchItems(){
    fetch("http://localhost:3000/items")
    .then(r => {
        if (r.ok){
            return r.json()
        } else {
            throw new Error()
        }
    })
    // .then(r => r.json())
    // .then(items => {console.log(items)})
    .then(allItems)
}

//static
function allItems(items) {

    const itemsDiv = document.getElementById('itemsContainer')
    itemsDiv.innerHTML = ""
    
    for (let item of items) {
       
        //setting up individual div and appending to all items div
        const eachItemDiv = document.createElement('div')
        eachItemDiv.id = "each-item"
        itemsDiv.appendChild(eachItemDiv)
        
        //setting up item header and appending to individ item div
        const itemName = document.createElement('h4')
        itemName.innerText = item.name
        eachItemDiv.appendChild(itemName)

        //price
        const itemPrice = document.createElement('li')
        itemPrice.innerText = `$${item.price}`
        eachItemDiv.appendChild(itemPrice)

        //button
        const infoButton = document.createElement("BUTTON");
        infoButton.textContent = 'See more info'
        eachItemDiv.appendChild(infoButton)

            infoButton.addEventListener('click', function(e){      
            e.preventDefault
    //then this will head to single item function
            fetchSingleItem(item)
        })
    }
}

//class?
function fetchSingleItem(item) {
    fetch (`http://localhost:3000/items/${item.id}`)
    .then(resp => resp.json())
    .then(singleItem)
}

function singleItem (item){

    const itemsDiv = document.getElementById('itemsContainer')
    itemsDiv.innerHTML = ""
    
    const singleItemDiv = document.createElement('div')
    singleItemDiv.id = "single-item"
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





