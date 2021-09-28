let requestURL =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
let cardsGroup = document.getElementById("cards");
let category = document.getElementById("category");

request.onload = function () {
  if (request.status == 200) {
    const datos = (request.response);
    console.log(datos);
    createCards(datos);
  }
};

function createCards(datos) {
    
  datos[0].products.forEach((element) => {
  });
}
