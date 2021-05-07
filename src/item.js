
function fetchItems(){
    fetch("http://localhost:3000/items")
    .then(resp => resp.json())
    .then(appendItems)
}

function appendItems(items) {
    const itemsDiv = document.getElementById('itemsContainer')
    for (let item of items) {
       
        //setting up individual div and appending to all items div
        const eachItemDiv = document.createElement('div')
        itemsDiv.appendChild(eachItemDiv)
        
        //setting up item header and appending to individ item div
        const itemHeader = document.createElement('h4')
        itemHeader.innerText = item.name
        eachItemDiv.appendChild(itemHeader)

        const itemPrice = document.createElement('li')
        itemPrice.innerText = `$${item.price}`
        eachItemDiv.appendChild(itemPrice)

        const infoButton = document.createElement("BUTTON");
        infoButton.textContent = 'See more info'
        eachItemDiv.appendChild(infoButton)

    }
}





