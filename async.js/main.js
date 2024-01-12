let box = document.querySelector(".box");
let dialogEdit = document.querySelector(".dialogEdit");
let closeEdit = document.querySelector(".closeEdit");
let formEdit = document.querySelector(".formEdit");

let basket = JSON.parse(localStorage.getItem("dataShop")) || [];

function getShop() {
  return (box.innerHTML = dataShop
    .map((elem) => {
      let { id, name, img, price, desc } = elem;
      let search = basket.find((elem) => elem.id == id) || [];
      return `
    <div class="div">
    <img width="220" height="140" src=${img} alt="">
    <div class="actions">
    <h2 class="name">${name}</h2>
    <p class="desc">${desc}</p>
    <div class="flex">
    <p class="price">$ ${price}</p>
    <div class="buttons" style="font-size:18px;">
    <i onclick=decrement(${id}) class="bi bi-dash-lg"></i>
    <div id=${id} class="quantity">
    ${search.item == undefined ? 0 : search.item}
    </div>
    <i onclick="incremant(${id})" class="bi bi-plus-lg"></i>
    </div>
    </div>
    <div class="icons">
    <i class="fa-regular fa-pen-to-square" onclick="editItem(${elem.id})" id="iconEdit"></i>
    <i class="fa-solid fa-trash" onclick="deleteItem(${id})" id="iconDelete"></i>
    </div>
    </div>
    </div>
    `;
    })
    .join(""));
}
getShop();

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
  // console.log(basket);
  update(selecteItem.id);
  localStorage.setItem("dataShop", JSON.stringify(basket));
};

let decrement = (id) => {
  let selecteItem = id;
  let search = basket.find((elem) => elem.id == selecteItem.id);
  if (search === undefined) return "";
  else if (search.item == 0) return "";
  else {
    search.item -= 1;
  }
  // console.log(basket);
  update(selecteItem.id);
  basket = basket.filter((elem) => elem.item != 0);
  localStorage.setItem("dataShop", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((elem) => elem.id == id);
  let res = document.getElementById(id);
  res.innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartAmount = document.querySelector(".cartAmount");
  cartAmount.innerHTML = basket
    .map((elem) => elem.item)
    .reduce((a, b) => a + b, 0);
};
calculation();

let deleteItem = (id) => {
  let selecteItem = id;
  dataShop = dataShop.filter((elem) => elem.id != selecteItem.id);
  getShop();
};

let idx = null;
let editItem = (id) => {
  let user = dataShop.find((elem) => elem.id == id.id);
  dialogEdit.showModal();
  formEdit["inpEditImg"].value = user.img;
  formEdit["inpEditName"].value = user.name;
  formEdit["inpEditDesc"].value = user.desc;
  formEdit["inpEditPrice"].value = user.price;
  idx = id.id;
};

formEdit.onsubmit = (event) => {
  event.preventDefault()
  dataShop = dataShop.map((elem) => {
    if (elem.id == idx) {
      elem.img = formEdit["inpEditImg"].value
      elem.name = formEdit["inpEditName"].value
      elem.desc = formEdit["inpEditDesc"].value
      elem.price = formEdit["inpEditPrice"].value
    }
    return elem
  })
  getShop()
  dialogEdit.close()
}
