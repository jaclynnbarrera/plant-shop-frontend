
// class Cart {
//     constructor({item_count, total_price, id}) {
//         this.itemCount = item_count;
//         this.totalPrice = total_price;
//         this.id = id
//     }

// }

function fetchCart(){
    fetch("http://localhost:3000/carts/1")
    .then(resp => resp.json())
    .then(cart)
}

function createNewCart(){
    console.log("creating a new cart")
    const cartDiv = document.getElementById('cartContainer')

    //get icon?
    const cartIcon = document.createElement("BUTTON");
    cartIcon.innerText = "Cart"
    cartDiv.appendChild(cartIcon)
    //create div
    //button etc
}

// const closeButton = getElementById("itemsContainer")

// const cartButton = document.getElementById('add-to-cart')
    
// cartButton.addEventListener('click', function(e){
//         console.log("grabbed!! add to cart was clikced")
//     })

function addToCart() {
    console.log("we are adding to cart!")


}

