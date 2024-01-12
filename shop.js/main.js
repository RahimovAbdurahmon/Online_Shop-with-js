let shop = document.querySelector("#shop");
let dialogAll = document.querySelector(".dialogAll")
let iconMainSetting = document.querySelector("#iconMainSetting")
let closeDialogAll = document.querySelector(".closeDialogAll")
let btnLight = document.querySelector(".btnLight")
let btnDark = document.querySelector(".btnDark")
let body = document.querySelector("body")

let basket = JSON.parse(localStorage.getItem("data")) || [];

function generateShop() {
  return (shop.innerHTML = shopItemsData
    .map((elem) => {
      let { id, name, price, img, desc } = elem;
      let search = basket.find((elem) => elem.id == id) || [];
      return `
    <div id=product-id-${id} class="item">
            <img width="220px" height="250px" src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick=decrement(${id}) class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity"> 
                        ${search.item === undefined ? 0 : search.item}
                        </div>
                        <i onclick="incremant(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
    })
    .join(""));
}
generateShop();

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
  // console.log(basket);
};

let update = (id) => {
  let search = basket.find((elem) => elem.id == id);
  document.getElementById(id).innerHTML = search.item;
  calculatin();
};

let calculatin = () => {
  let cartAmount = document.querySelector(".cartAmount");
  cartAmount.innerHTML = basket
  .map((elem) => elem.item)
  .reduce((a, b) => a + b, 0);
};
calculatin();

// ---------------------------------------------------------------
/// login
let form = document.querySelector(".form");
let myPhone = 980227622;
let myPassword = "2202";
let body2 = document.querySelector(".body2");
let box = document.querySelector(".box");
let sud = document.querySelector(".sud");
let show = document.querySelector("#show");
let url=  "http://localhost:3000/data"

form.onsubmit = (event) => {
  event.preventDefault();
  if (
    form["inpPhone"].value == myPhone &&
    form["inpPassword"].value == myPassword
  ) {
    form.style.display = "none";
    body2.style.display = "block"
  } else {
    sud.style.display = "block";
  }
};

form["inpPassword"].oninput = () => {
  if (form["inpPassword"].value.length > 0) {
    show.style.display = "block";
  }
};
show.onclick = () => {
  if (form["inpPassword"].type == "password") {
    form["inpPassword"].type = "text";
  } else {
    form["inpPassword"].type = "password";
  }
};


iconMainSetting.onclick = () => {
  dialogAll.showModal()
}
closeDialogAll.onclick = () => {
  dialogAll.close()
}


btnDark.onclick = () => {
  shop.style.backgroundColor = "black"
  shop.style.color = "white"
  dialogAll.close()
}
btnLight.onclick = () => {
  shop.style.backgroundColor = "white"
  shop.style.color = "black"
  dialogAll.close()
}