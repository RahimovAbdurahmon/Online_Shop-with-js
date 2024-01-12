let basket = JSON.parse(localStorage.getItem("dataShop")) || [];
let label = document.querySelector(".label");
let shoppingCartLaptop = document.querySelector(".shoping-cart-laptop");

let calculation = () => {
  let cartAmount = document.querySelector(".cartAmount");
  cartAmount.innerHTML = basket
    .map((elem) => elem.item)
    .reduce((a, b) => a + b, 0);
};
calculation();

let GetShopItems = () => {
  if (basket.length !== 0) {
    return (shoppingCartLaptop.innerHTML = basket
      .map((elem) => {
        let { item, id } = elem;
        let search = dataShop.find((elem) => elem.id === id) || [];
        return `
            <div class="cart-item-laptop">
            <img width="200" height="130" src=${search.img} alt="">
            <div class="actionItem">
            <div class="name-price-x">
            <p style="font-size:18px">${search.name}</p>
            <p style="background-color:#272c46; padding:3px 5px; color:white;border-radius:3px">$ ${
              search.price
            }</p>
            <h2 onclick=removeItem(${id}) style="cursor:pointer">&times</h2>
            </div>
            <div class="buttons">
                <i onclick=decrement(${id}) class="bi bi-dash-lg"></i>
                <div id="${id}" class="quantity">${item}</div>
                <i onclick="incremant(${id})" class="bi bi-plus-lg"></i>
            </div>
            <h3 style="margin-top:15px">$ ${item * search.price}</h3>
            </div>
            </div>
            `;
      })
      .join(""));
  } else {
    shoppingCartLaptop.innerHTML = "";
    label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="main.html">
        <button class="homeBtn">Back home</button>
        </a>
        `;
  }
};
GetShopItems();

let incremant = (id) => {
  let selecteItem = id;
  let search = basket.find((elem) => elem.id === selecteItem.id);
  if (search === undefined) {
    basket.push({
      id: selecteItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  update(selecteItem.id);
  localStorage.setItem("dataShop", JSON.stringify(basket));
  totalAmount()
  GetShopItems();
};
let decrement = (id) => {
  let selecteItem = id;
  let search = basket.find((elem) => elem.id === selecteItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selecteItem.id);
  basket = basket.filter((elem) => elem.item != 0);
  localStorage.setItem("dataShop", JSON.stringify(basket));
  totalAmount()
  setTimeout(() => GetShopItems(), 1000);
};
let update = (id) => {
  let search = basket.find((elem) => elem.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let removeItem = (id) => {
  let selecteItem = id;
  basket = basket.filter((elem) => elem.id !== selecteItem.id);
  calculation();
  GetShopItems();
  localStorage.setItem("dataShop", JSON.stringify(basket));
};

let clearCart = () => {
  basket = []
  GetShopItems()
  calculation()
  localStorage.setItem("dataShop", JSON.stringify(basket))
}

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((elem) => {
        let { id, item } = elem;
        let search = dataShop.find((elem) => elem.id === id);
        return item * search.price;
      })
      .reduce((a, b) => a + b, 0);
      label.innerHTML = `
      <h2>Total Bill : ${amount}</h2>
      <button class="checkout">Check out</button>
      <button onclick="clearCart()" class="ramoveAll">Clear Cart</button>
      `
  } else {
    return;
  }
};
console.log(totalAmount());
