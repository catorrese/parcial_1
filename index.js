let requestURL =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
let cardGroup = document.getElementById("cards");
let category = document.getElementById("category");
let products = Array;


request.onload = function () {
  if (request.status == 200) {
    const datos = request.response;
    console.log(datos);
    processCategories(datos);
    category.textContent = "Burguers";
    createCards(products[0]);
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
  newCardGroup.classList.add("card-group");
  data.forEach((element) => {
    let card = document.createElement("div");
    card.classList.add("card");

    let img = document.createElement("img");
    img.src = element.image;
    img.classList.add("card-img-top");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.textContent = element.name;
    cardTitle.classList.add("card-title");
    cardBody.appendChild(cardTitle);

    let cardText = document.createElement("p");
    cardText.textContent = element.description;
    cardText.classList.add("card-text");
    cardBody.appendChild(cardText);

    let cardPrice = document.createElement("h7");
    cardPrice.textContent = "$" + element.price;
    cardBody.appendChild(cardPrice);

    card.appendChild(img);
    card.appendChild(cardBody);

    newCardGroup.appendChild(card);
  });
  cardGroup.parentNode.replaceChild(newCardGroup, cardGroup);
  cardGroup = newCardGroup;
}
