let requestURL =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
let cardGroup = document.getElementById("cards");
let category = document.getElementById("category");
let itemsNum = document.getElementById("items");
let carrito = document.getElementById("carrito");
let products = Array();
let contadorItems = 0;
let order = Array();


request.onload = function () {
  if (request.status == 200) {
    const datos = request.response;
    console.log(datos);
    processCategories(datos);
    category.textContent = "Burguers";
    createCards(products[0]);
    carrito.addEventListener("click", function() {
      category.textContent = "Order detail";

      let tableOrder = document.createElement("table");
      tableOrder.classList.add("table");
      tableOrder.classList.add("table-striped");
    

      let tBody = document.createElement("tbody");
      let headers = document.createElement("tr");

      let hd1 = document.createElement("th");
      hd1.textContent = "Item";
      headers.appendChild(hd1);

      let hd2 = document.createElement("th");
      hd2.textContent = "Qty.";
      headers.appendChild(hd2);
      
      
      let hd3 = document.createElement("th");
      hd3.textContent = "Description";
      headers.appendChild(hd3);
      
      
      let hd4 = document.createElement("th");
      hd4.textContent = "Unit price";
      headers.appendChild(hd4);
      
      
      let hd5 = document.createElement("th");
      hd5.textContent = "Amount";
      headers.appendChild(hd5);
      
      
      let hd6 = document.createElement("th");
      hd6.textContent = "Modify";
      headers.appendChild(hd6);
      
      tBody.appendChild(headers);

      let contador = 0;

      order.forEach((element) => {
        contador++;
        let row = document.createElement("tr");
        let itm = document.createElement("td");
        itm.textContent = contador;
        row.appendChild(itm);

        let qty = document.createElement("td");
        qty.textContent = 1;
        row.appendChild(qty);

        let desc = document.createElement("td");
        desc.textContent = element.name;
        row.appendChild(desc);

        let price = document.createElement("td");
        price.textContent = element.price;
        row.appendChild(price);

        let am = document.createElement("td");
        am.textContent = element.price;
        row.appendChild(am);

        tBody.appendChild(row);
      });
      
      tableOrder.appendChild(tBody);
      cardGroup.parentNode.replaceChild(tableOrder, cardGroup);
      cardGroup = tableOrder;

    });
  }
};

function processCategories(data) {
  let j = 0;
  data.forEach((element) => {
    products[j] = element.products;
    j++;
  });
  let nav = document.getElementById("categories");
  let cats = nav.getElementsByClassName("nav-item");
  for(let i = 0; i < cats.length; i++){
    cats[i].addEventListener("click", function() {
      category.textContent = cats[i].id;
      createCards(products[i]);
    });
  }
}

function createCards(data) {
  let newCardGroup = document.createElement("div");
  newCardGroup.classList.add("row");
  newCardGroup.classList.add("row-cols-2");
  newCardGroup.classList.add("row-cols-md-4");
  newCardGroup.classList.add("g-4");
  data.forEach((element) => {
    let col = document.createElement("div");
    col.classList.add("col");

    let card = document.createElement("div");
    card.classList.add("card");
    card.style.height = "500px";

    let img = document.createElement("img");
    img.src = element.image;
    img.classList.add("card-img-top");
    img.style.height = "200px";

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.textContent = element.name;
    cardTitle.classList.add("card-title");
    cardBody.appendChild(cardTitle);

    let cardText = document.createElement("p");
    cardText.textContent = element.description;
    cardText.classList.add("card-text");
    cardText.style.fontSize = "15px";
    cardBody.appendChild(cardText);

    let cardPrice = document.createElement("p");
    cardPrice.textContent = "$" + element.price;
    cardBody.appendChild(cardPrice);

    let btn = document.createElement("a");
    btn.classList.add("btn");
    btn.classList.add("btn-dark");
    btn.textContent = "Add to car";
    btn.addEventListener("click", function() {
      contadorItems++;
      itemsNum.textContent = contadorItems + " items";
      order.push(element);
    });
    cardBody.appendChild(btn);
    

    card.appendChild(img);
    card.appendChild(cardBody);

    col.appendChild(card);

    newCardGroup.appendChild(col);
  });
  cardGroup.parentNode.replaceChild(newCardGroup, cardGroup);
  cardGroup = newCardGroup;
}
