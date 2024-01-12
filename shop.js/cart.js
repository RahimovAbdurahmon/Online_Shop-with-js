let basket = JSON.parse(localStorage.getItem("data")) || [];
let label = document.querySelector("#label");
let shoppingCart = document.querySelector("#shopping-cart");

let calculatin = () => {
  let cartAmount = document.querySelector(".cartAmount");
  cartAmount.innerHTML = basket
    .map((elem) => elem.item)
    .reduce((a, b) => a + b, 0);
};
calculatin();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((elem) => {
        let { id, item } = elem;
        let search = shopItemsData.find((elem) => elem.id === id) || [];
        return `
            <div class="cart-item">
            <img width="110" height="130" src=${search.img} alt="" />
            <div class="details">
            <div class="title-price-x">
            <h4 class="title-price">
            <p>${search.name}</p>
            <p class="cart-item-price">$ ${search.price}</p>
            </h4>
            <h2 onclick=removeItem(${id}) style="cursor:pointer">&times<h2>
            </div>
            <div class="buttons">
                <i onclick=decrement(${id}) class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="incremant(${id})" class="bi bi-plus-lg"></i>
            </div>
            <h3>$ ${item * search.price}</h3>
            </div>
            </div>
            `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="homeBtn">Back to Home</button>
        </a>
        `;
  }
};

generateCartItems();

let incremant = (id) => {
  let selectedItem = id;
  let search = basket.find((elem) => elem.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  // console.log(basket);
  update(selectedItem.id);
  generateCartItems();
  totalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((elem) => elem.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return "";
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((elem) => elem.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
  totalAmount();
  setTimeout(() => generateCartItems(), 1000);
};

let update = (id) => {
  let search = basket.find((elem) => elem.id == id);
  document.getElementById(id).innerHTML = search.item;
  calculatin();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((elem) => elem.id !== selectedItem.id);
  generateCartItems();
  calculatin();
  totalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculatin();
  localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((elem) => {
        let { item, id } = elem;
        let search = shopItemsData.find((elem) => elem.id === id) || [];
        return item * search.price;
      })
      .reduce((a, b) => a + b, 0);
    label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="ramoveAll">Clear Cart</button>
        `;
  } else return;
};
totalAmount();
