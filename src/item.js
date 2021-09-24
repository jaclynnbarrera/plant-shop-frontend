let itemsArr = [];

class Item {
  constructor(item) {
    this.name = item.name;
    this.description = item.description;
    this.price = item.price;
    this.id = item.id;
    this.cart_id = item.cart_id;
    this.image_link = item.image_link;
    itemsArr.push(item);
  }

  renderItem() {
    const itemsDiv = document.getElementById("itemsContainer");
    // itemsDiv.innerHTML = ""

    //setting up individual div and appending to all items div
    const eachItemDiv = document.createElement("div");
    eachItemDiv.className = "single-item";
    itemsDiv.appendChild(eachItemDiv);

    const itemName = document.createElement("h4");
    itemName.innerText = this.name;
    eachItemDiv.appendChild(itemName);

    const itemPrice = document.createElement("p");
    itemPrice.innerText = `$${this.price}`;
    eachItemDiv.appendChild(itemPrice);

    const itemImage = document.createElement("img");
    itemImage.src = this.image_link;
    eachItemDiv.appendChild(itemImage);

    const infoButton = document.createElement("BUTTON");
    infoButton.className = "single-item-button";
    infoButton.textContent = "See more info";
    eachItemDiv.appendChild(infoButton);
    infoButton.addEventListener("click", this.renderSingleItem.bind(this));
  }

  renderSingleItem(e) {
    e.preventDefault();
    const itemsDiv = document.getElementById("itemsContainer");
    itemsDiv.innerHTML = "";

    const singleItemDiv = document.createElement("div");
    singleItemDiv.id = "single-item-individ";
    itemsDiv.appendChild(singleItemDiv);

    const itemName = document.createElement("h2");
    itemName.innerText = this.name;
    singleItemDiv.appendChild(itemName);

    const itemImage = document.createElement("img");
    itemImage.src = this.image_link;
    singleItemDiv.appendChild(itemImage);

    const plantCare = document.createElement("h3");
    plantCare.innerText = "How To Care For Your Plant:";
    singleItemDiv.appendChild(plantCare);

    const itemDescription = document.createElement("p");
    itemDescription.innerText = this.description;
    singleItemDiv.appendChild(itemDescription);

    const itemPrice = document.createElement("p");
    itemPrice.innerText = `$${this.price}`;
    singleItemDiv.appendChild(itemPrice);

    const cartButton = document.createElement("BUTTON");
    cartButton.setAttribute("id", "add-to-cart");
    cartButton.innerText = "Add to Cart";
    singleItemDiv.appendChild(cartButton);

    cartButton.addEventListener("click", () =>
      newCart.addItemToCart.call(this)
    );

    const closeButton = document.createElement("BUTTON");
    closeButton.textContent = "x";
    singleItemDiv.appendChild(closeButton);

    closeButton.addEventListener("click", function (e) {
      e.preventDefault();
      itemsDiv.innerHTML = "";
      fetchItems();
    });
  }
}

//set up API class?
function fetchItems() {
  fetch("https://sheltered-bayou-98847.herokuapp.com/items")
    .then((r) => r.json())
    .then((items) => {
      items.map((item) => new Item(item).renderItem());
    })
    .catch((err) => alert(err));
}

let url = "http://api.open-notify.org/astro";

fetch(url)
  .then((r) => r.json())
  .then((data) => console.log(data.people))
  .then((p) => console.log(p))
  .catch((e) => console.log(e));
