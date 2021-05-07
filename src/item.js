
function fetchItems(){
    fetch("http://localhost:3000/items")
    .then(resp => resp.json())
    .then(allItems)
}

function allItems(items) {
    const itemsDiv = document.getElementById('itemsContainer')
    for (let item of items) {
       
        //setting up individual div and appending to all items div
        const eachItemDiv = document.createElement('div')
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
            console.log(item)
            //then this will head to single item function

            singleItem(item)
        })

    }
}


function singleItem (item){
    console.log("we are in single item!")
    //setting up containers
    let singleItemDiv = document.createElement('div')
    let itemName = document.createElement('h2')

    let itemDescription = item.itemDescription
    

    console.log(item.description)


}



