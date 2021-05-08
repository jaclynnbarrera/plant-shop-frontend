
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

// const closeButton = getElementById("itemsContainer")

// const cartButton = document.getElementById('add-to-cart')
    
// cartButton.addEventListener('click', function(e){
//         console.log("grabbed!! add to cart was clikced")
//     })

function createNewCart() {
    console.log("we are in create new cart!")

}

