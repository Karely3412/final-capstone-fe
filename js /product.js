let $Img = document.getElementById("img-wrapper");

let $Price = document.getElementById("price-wrapper");

let $Title = document.getElementById("product-title");

let $Descript = document.getElementById("descript-wrapper");

let oProductStorage = localStorage.getItem("selectedProduct");
oProductStorage = JSON.parse(oProductStorage);

$Title.innerHTML = oProductStorage.title;

$Price.innerHTML = oProductStorage.price;

$Descript.innerHTML = oProductStorage.description;

$Img.src = oProductStorage.image;
